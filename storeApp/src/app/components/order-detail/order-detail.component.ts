import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/service/cart.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private httpService :HttpService
    ) { }
  
  order:Cart;
  id:string;
  err:any;

  ngOnInit(): void {
    this.route.params.subscribe(
      params=>{
        this.id = params['id']
        this.getOrder()
      }
    )
  }
  getOrder(){
    this.httpService.getOrder(this.id).subscribe(
      (data:Cart)=>this.order = data,
      err=>this.err = err
    )
  }
  getTotal(){
    let sum = 0;
    for (let index = 0; index < this.order.items.length; index++) {
      sum += (this.order.items[index].stock * this.order.items[index].price);
    }
    return sum;
  }
}
