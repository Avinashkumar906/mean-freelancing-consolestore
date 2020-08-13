import { Component, OnInit , OnDestroy} from '@angular/core';
import { ProductService, Product } from 'src/app/service/product.service';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/app/service/cart.service';
import { Router } from '@angular/router';
import _ from 'lodash'
import { DisposeBag } from '@ronas-it/dispose-bag/dist/src';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit,OnDestroy {

  constructor(
    private productService:ProductService,
    private cartService:CartService,
    private router:Router
  ) { 
    this.disposeBag = new DisposeBag()
  }
  ngOnDestroy(): void {
    this.disposeBag.unsubscribe()
  }

  env = environment;
  products:Array<Product> = _.cloneDeep(this.productService.getProducts()); 
  category:string = 'all';
  disposeBag:DisposeBag;
  
  ngOnInit(): void {
    this.disposeBag.add(
      this.productService.productsChanged.subscribe(
        data=>this.products = _.cloneDeep(data),
      )
    )
    this.disposeBag.add(
      this.productService.categoryChanged.subscribe(
        data=>this.category = _.cloneDeep(data)
      )
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
  
  menuTitle = new Object(
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
      all:'All Products'
    }
  )
}

