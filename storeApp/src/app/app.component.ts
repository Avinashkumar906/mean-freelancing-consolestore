import { Component, OnDestroy, OnInit} from '@angular/core';
import { User, UserService } from './service/user.service';
import { HttpService } from './service/http.service';
import { Product, ProductService } from './service/product.service';
import { CartService } from './service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy,OnInit{

  user:User = this.userService.getUser();
  isDataLoaded:boolean;
  error:any;
  
  constructor(
      private userService:UserService,
      private cartService:CartService,
      private productService:ProductService,
      private httpService :HttpService
    ){
  }

  ngOnInit(): void {
    this.userService.userChanged.subscribe(
      user=>this.user = user
    )
    this.httpService.getProducts().subscribe(
      (data:Array<Product>)=>{
        this.productService.putProducts(data),
        this.adjustStock();
        this.isDataLoaded = true;
      },
      err=>this.error = err
    )
  }

  adjustStock(){
    let cart = this.cartService.getCart()
    cart.items.forEach((item:Product)=>{
      this.productService.removeStock(item)
    })
  }

  ngOnDestroy(): void {
 
  }

  getCount(){
    if(this.cartService.getCount()>0)
      return this.cartService.getCount()
  }

  logout(){
    this.userService.removeUser()
  }
}
