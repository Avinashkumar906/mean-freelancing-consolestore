import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SideNavContentComponent } from './components/side-nav-content/side-nav-content.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

import { HttpService } from './service/http.service';
import { CartService } from './service/cart.service';
import { UserService } from './service/user.service';
import { ProductService } from './service/product.service';

import { FilterPipe } from './pipe/filter.pipe';
import { PaginationPipe } from './pipe/pagination.pipe';
import { SearchPipe } from './pipe/search.pipe';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavContentComponent,
    MainContentComponent,
    RegistrationComponent,
    ProductDetailComponent,
    PlaceOrderComponent,
    AdminPanelComponent,
    OrderDetailComponent,
    FilterPipe,
    PaginationPipe,
    SearchPipe,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [HttpService,UserService,ProductService,CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
