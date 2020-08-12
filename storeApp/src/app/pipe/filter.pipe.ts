import { Pipe, PipeTransform } from '@angular/core';
import _ from 'lodash'
import { Product } from '../service/product.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: unknown, key?:string): unknown {
    if(key === 'all'){
      return value
    } else {
      return _.filter(value,(item:Product)=>item.category.toLowerCase() === key.toLowerCase());
    }
  }

}
