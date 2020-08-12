import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';


const routes: Routes = [
  {path:'',component:MainContentComponent},
  {path:'user',component:RegistrationComponent},
  {path:'product/:id',component:ProductDetailComponent},
  {path:'placeorder',component:PlaceOrderComponent},
  {path:'order/:id',component:OrderDetailComponent},
  {path:'adminpanel',component:AdminPanelComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
