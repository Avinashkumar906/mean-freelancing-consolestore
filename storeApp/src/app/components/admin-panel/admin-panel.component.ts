import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { UserService, User } from 'src/app/service/user.service';
import _ from 'lodash'
import { DisposeBag } from 'node_modules/@ronas-it/dispose-bag'
import { ProductService, Product } from 'src/app/service/product.service';
import { environment } from 'src/environments/environment';
import { Cart, CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit, OnDestroy{

  constructor(
      private formBuilder: FormBuilder,
      private httpService:HttpService,
      private productService:ProductService,
      private userService:UserService,
      private cartService:CartService,
    ) { 
      // initilizing add product form
    this.product = this.formBuilder.group({
      title:this.formBuilder.control('',[Validators.required, Validators.minLength(4)]),
      price:this.formBuilder.control('',[Validators.required]),
      stock:this.formBuilder.control(''),
      url:this.formBuilder.control(''),
      brand:this.formBuilder.control(''),
      category:this.formBuilder.control(''),
      feature:this.formBuilder.control(''),
      description:this.formBuilder.control(''),
      soldBy:this.formBuilder.control(''),
    })
    // initializing dispose bag
    this.disposeBag = new DisposeBag()
  }
  ngOnDestroy(): void {
    this.disposeBag.unsubscribe()
  }

  disposeBag:DisposeBag;

  env = environment
  id:string;
  image:string;
  product: FormGroup;
  file:any = null;
  alert:string = ' ';

  
  userList:Array<User> = [];
  orderList:Array<Cart> = [];
  user:User = this.userService.getUser()
  productList:Array<Product> = this.productService.getProducts();

  ngOnInit(): void {
    this.disposeBag.add(
      this.productService.productsChanged.subscribe(
        data=> this.productList = _.cloneDeep(data)
      )
    )
    this.disposeBag.add(
      this.userService.userChanged.subscribe(
        (data:User) => this.user = data
      )
    )
    this.fetchUsers()
    this.fetchOrders()
  }

  // User tab functions below
  fetchUsers(){
    this.disposeBag.add(
      this.httpService.getUsers().subscribe(
        data=>this.userList = _.cloneDeep(_.filter(data,(user:User)=>user.email !== environment.admin))
      )
    )
  }
  deleteUser(user:User){
    this.disposeBag.add(
      this.httpService.deleteUser(user).subscribe(
        data=>this.fetchUsers()
      )
    )
  }
  toggleRole(user:User){
    this.disposeBag.add(
      this.httpService.toggleRole(user).subscribe(
        data=>this.fetchUsers()
      )
    )
  }

  // Order tab related functions
  fetchOrders(){
    this.disposeBag.add(
      this.httpService.getOrders().subscribe(
        data=>this.orderList = _.cloneDeep(data)
      )
    )
  }
  deleteOrder(order:Cart){
    this.disposeBag.add(
      this.httpService.deleteOrder(order).subscribe(
        data=>this.fetchOrders()
      )
    )
  }
  getCount(items){
    let sum = 0;
    for (let index = 0; index < items.length; index++) {
      sum += items[index].stock;
    }
    return sum;
  }

  // Product tab related function
  fileHandler(event){
    this.file = event.files[0]
  }
  deleteProduct(product){
    this.disposeBag.add(
      this.httpService.deleteProduct(product).subscribe(
        (data:Product)=>{
          this.cartService.clearCart()
          this.productService.removeProduct(data)
        }
      )
    )
  }
  updateProduct(product:Product){
    this.id = product._id;
    this.image = product.url;
    this.product.patchValue(product)
  }
  resetForm(){
    this.id = undefined;
    this.image = undefined;
    this.product.markAsPristine()
    this.product.markAsUntouched()
    this.product.reset();
    this.file = null;
    this.alert = 'Form Reset!'
  }
  
  submit(){
    this.alert = null;
    if(this.id){
      this.submitUpdate()
    }else if(this.file){
      let formData = new FormData()
      formData.append('file',this.file,this.file.name)
      formData.append('body',JSON.stringify(this.product.value))
      this.disposeBag.add(
        this.httpService.addProduct(formData).subscribe(
          (data)=>{
            this.alert = "uploaded succesfully!" 
            this.cartService.clearCart()
            this.productService.putProduct(data)
            this.product.markAsPristine()
            this.product.markAsUntouched()
            this.product.reset();
            this.file = null;
          },
          err=>this.alert = "error at server try after some time"
        )
      )
    } else {
      alert('Please fill all detail and Select a file!')
    }
  }

  submitUpdate(){
    this.disposeBag.add(
      this.httpService.updateProduct(this.product.value,this.id).subscribe(
        (data:Product)=>{
          this.alert = "updated succesfully!"
          this.id = undefined;
          this.image = undefined;
          this.product.markAsPristine()
          this.product.markAsUntouched()
          this.product.reset()
          this.cartService.clearCart()
          this.productService.patchedProduct(data)
        },
        err=>this.alert = "error at server try after some time"
      )
    )
  }

}
