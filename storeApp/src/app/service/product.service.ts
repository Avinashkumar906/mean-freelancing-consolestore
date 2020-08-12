import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import _ from 'lodash'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  products:Array<Product>;
  productsChanged = new Subject<Array<Product>>()
  categoryChanged = new Subject<string>()

  getProduct(_id){
    let index = _.findIndex(this.products,{'_id':_id})
    return this.products[index]
  }

  removeStock(product:Product){
    let index = _.findIndex(this.products,{'_id':product._id})
    if(this.products[index].stock > 0){
      this.products[index].stock = this.products[index].stock-product.stock;
      this.productsChanged.next(this.products)
      return true
    } else {
      return false;
    }
  }

  addStock(product:Product){
    let index = _.findIndex(this.products,{'_id':product._id})
    ++this.products[index].stock;
    this.productsChanged.next(this.products)
  }
  
  getProducts(){
    return this.products
  }
  putProducts(data:Array<Product>){
    this.products = data;
    this.productsChanged.next(this.products)
  }
  removeProduct(product:Product){
   let index = _.findIndex(this.products,{'_id':product._id})
   this.products.splice(index,1)
   this.productsChanged.next(this.products)
  }
  patchedProduct(product:Product){
    let index = _.findIndex(this.products,{'_id':product._id})
    this.products[index] = product;
    this.productsChanged.next(this.products)
  }
  putProduct(product){
    this.products.push(product)
    this.productsChanged.next(this.products)
  }
}

// Product interface
export interface Product{
  _id: string,
  title: string,
  price: number,
  stock: number,
  brand: string,
  category: string,
  feature: string,
  description: string,
  soldBy: string,
  url: string,
}