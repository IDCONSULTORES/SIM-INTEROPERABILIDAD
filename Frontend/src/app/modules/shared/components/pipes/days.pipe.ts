import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'days'
})
export class DaysPipe implements PipeTransform {
  transform(value: any): string {
    if (value == 'Monday') return 'Lunes';
    if (value == 'Tuesday') return 'Martes';
    if (value == 'Wednesday') return 'Miércoles';
    if (value == 'Thursday') return 'Jueves';
    if (value == 'Friday') return 'Viernes';
    if (value == 'Saturday') return 'Sábado';
    if (value =='Sunday') return 'Domingo';
    return '';
  }

}
