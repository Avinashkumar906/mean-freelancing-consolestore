import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from 'src/app/service/product.service';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';
import _ from 'lodash'

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  constructor(
    private productService:ProductService,
    private cartService:CartService,
    private router:Router
  ) { }

  env = environment;
  products:Array<Product> = []; 
  category:string = 'all';
  
  ngOnInit(): void {
    this.products = this.productService.getProducts()
    this.productService.productsChanged.subscribe(
      data=>this.products = _.cloneDeep(data),
    )
    this.productService.categoryChanged.subscribe(
      data=>this.category = _.cloneDeep(data)
    )
  }

  addToCart(item:Product){
    let dummy = _.cloneDeep(item)
    dummy.stock = 1;
    if(this.productService.removeStock(dummy)){
      this.cartService.addToCart(dummy)
    } else {
      alert('Not in stock!')
    }
  }
  
  obj = new Object(
    {
      ps4acs:'Play Station',
      xboxacs:'Xbox',
      monitor:'Monitors',
      gaming:'Gaming Desktop',
      laptop:'Laptops',
      serverws:'Server Workstations',
      keyboard:'Keyboard',
      mouse:'Mouse',
      speaker:'Speakers',
      printer:'Printers',
      game:'Games',
    }
  )
}

