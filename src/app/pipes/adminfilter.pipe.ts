import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminfilter'
})
export class AdminfilterPipe implements PipeTransform {

  transform(items: any[], searchText: Object): any {
    if (!items || !searchText) {
           return items;
       }
     return items.filter(item => item.userName.indexOf(searchText) !== -1);
  }

}
