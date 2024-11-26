import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'frequency'
})
export class FrequencyPipe implements PipeTransform {

  transform(value: any): string {
    if (value === 'daily') return 'Diaria';
    if (value === 'weekly') return 'Semanal';
    if (value === 'biweekly') return 'Quincenal';
    if (value === 'monthly') return 'Mensual';
    if (value === 'annual') return 'Anual';
    return '';
  }

}
