import { Injectable } from '@angular/core';
import { Product } from './product.service';
import _ from 'lodash'
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart:Cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : new Cart();
  cartChanged = new Subject<Cart>()

  constructor() { }

  getCart(){
    return this.cart;
  }

  addToCart(product:Product){
    let inCart = _.findIndex(this.cart.items,{'_id':product._id})
    if(inCart<0){
      this.cart.items.push(product);
    } else {
      (this.cart.items[inCart]).stock++
    }
    localStorage.setItem('cart',JSON.stringify(this.cart))
    this.cartChanged.next(this.cart)
  }
  removeFromCart(product:Product){
    let inCart = _.findIndex(this.cart.items,{'_id':product._id})
    if(this.cart.items[inCart].stock > 1){
      --this.cart.items[inCart].stock
    } else {
      this.cart.items.splice(inCart,1)
    }
    localStorage.setItem('cart',JSON.stringify(this.cart))
    this.cartChanged.next(this.cart)
  }
  clearCart(){
    this.cart = new Cart()
    localStorage.removeItem('cart')
    this.cartChanged.next(this.cart)
  }

  getCount(){
    let count = 0;
    if(this.cart){
      this.cart.items.forEach(async (item:Product)=>{
        count += item.stock;
      })
    }
    return count;
  }

}

// Class for cart model
export class Cart{
  _id:string;
  name:string;
  email:string;
  address:string;
  items:Array<Product> = [];
}

// Interface for cart model
export interface Cart{
  _id:string,
  name:string,
  email:string,
  address:string,
  items:Array<Product>;
}
