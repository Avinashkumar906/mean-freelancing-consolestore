import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/service/http.service';
import { UserService, User } from 'src/app/service/user.service';
import _ from 'lodash'
import { ProductService, Product } from 'src/app/service/product.service';
import { environment } from 'src/environments/environment';
import { Cart, CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor(
      private formBuilder: FormBuilder,
      private httpService:HttpService,
      private productService:ProductService,
      private userService:UserService,
      private cartService:CartService,
    ) { 
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
  }

  product: FormGroup;
  env = environment
  id:string;
  image:string;
  productList:Array<Product> = [];
  userList:Array<User> = [];
  orderList:Array<Cart> = [];
  alert:string;
  file:any = null;
  user:User = this.userService.getUser()

  ngOnInit(): void {
    this.productList = this.productService.getProducts()
    this.productService.productsChanged.subscribe(
      data=> this.productList = _.cloneDeep(data)
    )
    this.userService.userChanged.subscribe(
      (data:User) => this.user = data
    )
    this.fetchUsers()
    this.fetchOrders()
  }

  fetchUsers(){
    this.httpService.getUsers().subscribe(
      data=>this.userList = _.cloneDeep(_.filter(data,(user:User)=>user.email !== environment.admin))
    )
  }
  deleteUser(user:User){
    this.httpService.deleteUser(user).subscribe(
      data=>this.fetchUsers()
    )
  }
  toggleRole(user:User){
    this.httpService.toggleRole(user).subscribe(
      data=>this.fetchUsers()
    )
  }

  fetchOrders(){
    this.httpService.getOrders().subscribe(
      data=>this.orderList = _.cloneDeep(data)
    )
  }
  getCount(items){
    let sum = 0;
    for (let index = 0; index < items.length; index++) {
      sum += items[index].stock;
    }
    return sum;
  }

  fileHandler(event){
    this.file = event.files[0]
  }
  deleteProduct(product){
    this.httpService.deleteProduct(product).subscribe(
      (data:Product)=>{
        this.cartService.clearCart()
        this.productService.removeProduct(data)
      }
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
    // this.product.reset();
  }
  
  submit(){
    if(this.id){
      this.submitUpdate()
    }else if(this.file){
      let formData = new FormData()
      formData.append('file',this.file,this.file.name)
      formData.append('body',JSON.stringify(this.product.value))
      this.httpService.addProduct(formData).subscribe(
        (data)=>{
          this.alert = "uploaded succesfully!" 
          this.cartService.clearCart()
          this.productService.putProduct(data)
        },
        err=>this.alert = "error at server try after some time"
      )
    }
  }

  submitUpdate(){
    this.httpService.updateProduct(this.product.value,this.id).subscribe(
      (data:Product)=>{
        this.alert = "updated succesfully!"
        this.resetForm()
        this.cartService.clearCart()
        this.productService.patchedProduct(data)
      }
    )
  }

}
