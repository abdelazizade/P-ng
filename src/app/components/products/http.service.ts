import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducts } from './products';

@Injectable({
  providedIn: 'root',
})
export class ApiServices {
  domainAPI = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get<IProducts[]>(this.domainAPI + '/products');
  }

  getProductById(productId) {
    return this.httpClient.get<IProducts[]>(
      this.domainAPI + '/products/' + productId
    );
  }
}
