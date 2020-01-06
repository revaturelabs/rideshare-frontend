import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})
export class TableFilterPipe implements PipeTransform {

  transform(list: any[], value: string) {
  

    return value ? list.filter(driver => driver.driver === false) : list;
  }

}