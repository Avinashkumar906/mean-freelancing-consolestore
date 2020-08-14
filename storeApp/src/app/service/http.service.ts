import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http';
import { User } from './user.service';
import { Cart } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http : HttpClient,
  ) { }
  // User related API calls
  getUsers(){
    return this.http.get(`${environment.api}/users`,)
  }
  toggleRole(user:User){
    return this.http.get(`${environment.api}/togglerole?_id=${user._id}`)
  }
  deleteUser(user:User){
    return this.http.delete(`${environment.api}/user?_id=${user._id}`)
  }
  // Order related api calls
  getOrders(){
    return this.http.get(`${environment.api}/orders`,)
  }
  deleteOrder(order:Cart){
    return this.http.delete(`${environment.api}/order?_id=${order._id}`)
  }
  getOrder(_id){
    return this.http.get(`${environment.api}/order?_id=${_id}`,)
  }
  // User registration api calls
  signUp(data){
    return this.http.post(`${environment.api}/signup`,data)
  }
  signIn(data){
    return this.http.post(`${environment.api}/signin`,data)
  }
  // Product related api calls
  addProduct(data){
    return this.http.post(`${environment.api}/product`,data)
  }
  updateProduct(data,id){
    return this.http.patch(`${environment.api}/product?_id=${id}`,data)
  }
  deleteProduct(data){
    return this.http.delete(`${environment.api}/product?_id=${data._id}`)
  }
  getProducts(){
    return this.http.get(`${environment.api}/products`)
  }
  getProduct(_id){
    return this.http.get(`${environment.api}/product?_id=${_id}`)
  }
  // Order place api call
  postOrder(data){
    return this.http.post(`${environment.api}/order`,data)
  }
}
