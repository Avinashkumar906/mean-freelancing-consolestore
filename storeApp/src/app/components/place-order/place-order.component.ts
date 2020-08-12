import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService, User } from 'src/app/service/user.service';
import { CartService, Cart } from 'src/app/service/cart.service';
import { HttpService } from 'src/app/service/http.service';
import _ from 'lodash'
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  constructor(
      private _formBuilder: FormBuilder,
      private userService:UserService,
      private cartService:CartService,
      private httpService:HttpService,
      private productService:ProductService,
    ) { 
      this.firstFormGroup = this._formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        address: ['', Validators.required]
      });
    }

  user:User;
  cart:Cart;
  placedOrder:any = null;
  isSubmitted:boolean = false;
  firstFormGroup: FormGroup;

  ngOnInit(): void {
    // initializing cart and user
    this.user = this.userService.getUser()
    this.cart = this.cartService.getCart()
    this.userService.userChanged.subscribe(
      data=>{
        this.user = data;
        this.firstFormGroup.patchValue(this.user)
      }
    )
    this.cartService.cartChanged.subscribe(
      data=>this.cart = _.cloneDeep(data)
    )
    // initializing Form
    this.firstFormGroup.patchValue(this.user)
  }

  getTotal(){
    let total = 0;
    this.cart.items.forEach((item)=>{
      total += (item.stock * item.price)
    })
    return total;
  }

  placeOrder(stepper){
    this.isSubmitted = true;
    stepper.next()

    this.cart.name =this.firstFormGroup.value.name;
    this.cart.email =this.firstFormGroup.value.email
    this.cart.address =this.firstFormGroup.value.address

    this.httpService.postOrder(this.cart).subscribe(
      data=>{
        this.placedOrder = data
        stepper.next()
        this.cartService.clearCart()
      }
    )
  }

  add(item){
    let dummy = _.cloneDeep(item)
    dummy.stock = 1;
    if(this.productService.removeStock(dummy)){
      this.cartService.addToCart(dummy)
    } else {
      alert('Not in stock!')
    }
  }

  remove(item){
    let dummy = _.cloneDeep(item)
    dummy.stock = 1;
    this.cartService.removeFromCart(dummy)
    this.productService.addStock(item)
  }

}
