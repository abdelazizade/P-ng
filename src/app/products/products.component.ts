import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  Subscription,
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  reduce,
  scan,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { ApiServices } from './http.service';
import { IProducts } from './products';
import { FormControl } from '@angular/forms';
import { log } from 'console';
import { PaginationService } from '../services/pagination.service';
import { MatPaginator } from '@angular/material/paginator';
import { After } from 'v8';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Pipe({name: 'safehtml'})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, AfterViewInit{ 
  pageSize: number = 4;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  currentPage: number = 1;
  displayedData: any[] = [];

  products: IProducts[] = [];
original:any;
  loading = false;
  errorMessage = '';
  searchControl = new FormControl('');
  subscriptions = new Subscription();

  constructor(
    private apiServices: ApiServices,
    private paginationService: PaginationService
  ) {this.getAllProducts()}

  // onPageChange(pageNumber: number) {
  //   this.currentPage = pageNumber;
  //   this.updateDisplayedData();
  // }

  updateDisplayedData() {
    
  }

  ngAfterViewInit(): void {
    // this.onPageChange(1);
    this.getAllProducts();
  }

  sort(event: any) {
    // this.products = this.original
    switch (event.target.value) {
      case 'Low': {
        this.products = this.products.sort(
          (low, high) => low.price - high.price
        );
        this.displayedData = this.products.slice(0,this.paginator.pageSize)
        // this.onPageChange(1);
        break;
      }

      case 'High': {
        this.products = this.products.sort(
          (low, high) => high.price - low.price
        );
        
        this.displayedData = this.products.slice(0,this.paginator.pageSize)
        // this.onPageChange(1);
        break;
      }

      default: {
        this.displayedData = this.products.sort(
          (low, high) => low.price - high.price
        );
        break;
      }
    }
    return this.products;
  }


  ///////////////////////////////////////////////////////////////////////
  
  
  
  ngOnInit(): void {
    this.getAllProducts();  
  }

  getAllProducts(): void{
  // this.products = this.products.sort((low, high) => low.price - high.price);
    // this.updateDisplayedData();
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((product) => {
      if (product.trim() === '') {
        return this.apiServices.getProducts();
      } else {
        return this.filterProductsByTitle(product);
      }
    }),
        catchError(() => {
          return throwError(new Error('this product is not found'));
        })
      )
      .subscribe({
        next: (filteredProducts) => {
          this.products = filteredProducts
          this.displayedData=this.products

          // console.log(this.displayedData);
          
          // this.updateDisplayedData();
          // console.log(filteredProducts);
        },
      });
      // this.onPageChange(1)

    this.subscriptions.add(
      this.apiServices.getProducts().subscribe({
        next: (products) => {
          this.products = products;
          // this.displayedData=this.products
          this.displayedData=this.products.slice(0,this.paginator.pageSize)
    //      console.log(this.paginator.pageSize);
          this.original = products;
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      })
    );
}




filterBy(event) {
this.products = this.original
  this.products = this.products.filter(p => p.categoryId === event.target.value);
this.displayedData = this.products.slice(0,this.paginator.pageSize)
  console.log(this.products);
}
  filterProductsByTitle(searchProduct: string) {
    const filteredProducts = this.products.filter((product) =>
      product.title.toLowerCase().includes(searchProduct.toLowerCase())
    );
    return of(filteredProducts);
  }
  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedData = this.products.slice(startIndex, endIndex);
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}