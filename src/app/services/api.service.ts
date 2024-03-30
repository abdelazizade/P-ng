import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  products: any;
  constructor(private http: HttpClient) {}

  allProducts() {
    this.http.get('http://localhost:3000/products').subscribe({
      next: (data) => {
        this.products = data;
        // console.log(data);
      },
    });
  }

  getAllProducts() {
    return this.http.get('http://localhost:3000/products');
  }
  getProduct() {
    return this.products;
  }
  saveCart() {
    localStorage.setItem('cart_items', JSON.stringify(this.products));
  }
  addToCart(addedProduct: any) {
    this.products.push(addedProduct);
    this.saveCart();
  }
  loadCart() {
    return (this.products =
      JSON.parse(localStorage.getItem('cart_items') as any) || []);
  }
  productInCart(product: any) {
    return this.products.findIndex((i: any) => i.id === product.id) > -1;
  }
  removeProduct(product: any) {
    const index = this.products.findIndex((i: any) => i.id === product.id);

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveCart();
    }
  }
  clearProducts() {
    localStorage.clear();
  }
}
