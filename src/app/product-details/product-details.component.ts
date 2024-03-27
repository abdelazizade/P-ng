import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiServices } from '../products/http.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  id: number;
  componentSubscriptions = new Subscription();
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiServices: ApiServices
  ) {}

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.paramMap.get('id');

    this.activatedRoute.params.subscribe({
      next: () => {
        this.apiServices.getProductById(productId).subscribe({
          next: (data) => {
            this.product = data;
          },
        });
      },
    });
  }
}
