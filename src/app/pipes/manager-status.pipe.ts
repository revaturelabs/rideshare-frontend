import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'managerStatus'
})
export class ManagerStatusPipe implements PipeTransform {

  transform(value: boolean): string {
    if (value == true){
      return "Manager";
    }
    return "Associate";
  }

}
