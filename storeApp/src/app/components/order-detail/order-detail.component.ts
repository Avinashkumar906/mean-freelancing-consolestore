import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/service/cart.service';
import { HttpService } from 'src/app/service/http.service';
import { DisposeBag } from '@ronas-it/dispose-bag/dist/src';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit,OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private httpService :HttpService
  ) { 
    this.disposeBag = new DisposeBag();
  }

  ngOnDestroy(): void {
    this.disposeBag.unsubscribe();
  }
  
  order:Cart;
  disposeBag:DisposeBag;
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
    this.disposeBag.add(
      this.httpService.getOrder(this.id).subscribe(
        (data:Cart)=>{
          data ? this.order = data : this.err = true
        },
        err=>this.err = err
      )
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
