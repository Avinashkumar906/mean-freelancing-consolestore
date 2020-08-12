import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { HttpClient } from '@angular/common/http';
import { User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http : HttpClient,
  ) { }

  getUsers(){
    return this.http.get(`${environment.api}/users`,)
  }
  getOrders(){
    return this.http.get(`${environment.api}/orders`,)
  }
  toggleRole(user:User){
    return this.http.get(`${environment.api}/togglerole?_id=${user._id}`)
  }
  deleteUser(user:User){
    return this.http.delete(`${environment.api}/user?_id=${user._id}`)
  }

  signUp(data){
    return this.http.post(`${environment.api}/signup`,data)
  }
  
  signIn(data){
    return this.http.post(`${environment.api}/signin`,data)
  }

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
  getOrder(_id){
    return this.http.get(`${environment.api}/order?_id=${_id}`,)
  }
  postOrder(data){
    return this.http.post(`${environment.api}/order`,data)
  }
}
