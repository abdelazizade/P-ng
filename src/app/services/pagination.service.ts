import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  constructor(private http: HttpClient) {}

  // getProducts(pageNumber: number, pageSize: number): Observable<any[]> {
  //   const url = `https://api.example.com/products?page=${pageNumber}&pageSize=${pageSize}`;
  //   return this.http.get<any[]>(url);
  // }

  getPageItems(items: any[], pageNumber: number, pageSize: number): any[] {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return items.slice(startIndex, endIndex);
  }
}
