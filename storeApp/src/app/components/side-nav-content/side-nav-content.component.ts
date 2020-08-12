import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.scss']
})
export class SideNavContentComponent implements OnInit {

  constructor(
    private router:Router,
    private prductService:ProductService,
  ) { }
  value:string;
  panelOpenState = false;

  ngOnInit(): void {
  }

  searchOrder(){
    this.router.navigate(['/order',this.value])
  }

  async changeCategory(value:string){
    await this.router.navigate(['/']).then(
      (data)=>{
        setTimeout(()=>this.prductService.categoryChanged.next(value),0)
      }
    )
  }
}
