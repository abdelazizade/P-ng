import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavigateComponent } from './navigate/navigate.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ProductsComponent } from './products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRouterComponent } from './navbar/approuter.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './pagination/pagination.component';
import { ShortenPipePipe } from './pipes/pipe.pipe';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDividerModule } from '@angular/material/divider';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigateComponent,
    DashboardComponent,
    ProductsComponent,
    NavbarComponent,
    PaginationComponent,
    ShortenPipePipe,
    HeaderComponent,
    FooterComponent,
    HeroSectionComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRouterComponent,
    MatPaginatorModule,
    NgxPaginationModule,
    MatDividerModule,
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
