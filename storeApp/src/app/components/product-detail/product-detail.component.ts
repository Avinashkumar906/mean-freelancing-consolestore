import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductService } from 'src/app/service/product.service';
import { environment } from 'src/environments/environment';
import { HttpService } from 'src/app/service/http.service';
import { CartService } from 'src/app/service/cart.service';
import _ from 'lodash'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private productService:ProductService,
    private cartService:CartService,
    private httpService:HttpService
  ) { }

  product:Product;
  env = environment;
  id:string;

  ngOnInit(): void {
    this.route.params.subscribe(
      params=>{
        this.id = params['id']
        this.getProduct()
      }
    )
  }
  getProduct(){
    this.product = this.productService.getProduct(this.id)
    // this.httpService.getProduct(this.id).subscribe(
    //    (data:Product)=>this.product = data
    // )
  }
  addToCart(){
    let dummy = _.cloneDeep(this.product)
    dummy.stock = 1;
    if(this.productService.removeStock(dummy)){
      this.cartService.addToCart(dummy)
    } else {
      alert('Not in stock!')
    }
  }
  buyNow(){
    this.addToCart()
    this.router.navigate(['/placeorder'])
  }
}
