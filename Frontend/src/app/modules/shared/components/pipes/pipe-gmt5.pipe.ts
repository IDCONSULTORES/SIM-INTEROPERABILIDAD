import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'pipeGMT5'
})
export class PipeGMT5Pipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // Convert to GMT+5 timezone
    const gmtDate = new Date(value);
    gmtDate.setHours(gmtDate.getHours() + 5);
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(gmtDate, args);
  }
}
