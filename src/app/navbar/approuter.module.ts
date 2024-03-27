import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from '../products/products.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'product-details/:id', component: ProductDetailsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouterComponent {}
