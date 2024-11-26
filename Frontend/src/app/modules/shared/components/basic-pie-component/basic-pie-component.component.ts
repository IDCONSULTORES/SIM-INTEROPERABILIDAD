import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApexDataLabels, ApexLegend, ChartComponent } from 'ng-apexcharts';
import { LogsService } from '@services/logs.service';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';

@Component({
  selector: 'app-basic-pie-component',
  templateUrl: './basic-pie-component.component.html',
  styleUrls: ['./basic-pie-component.component.scss'],
})
export class BasicPieComponentComponent implements OnInit {
  @ViewChild('chart') chartViewChild!: ChartComponent;
  @Input()
  series: ApexNonAxisChartSeries=[0,0,0];
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  @Input()
  colors: string[] = ['#71B5B2', '#C3604E', '#CEDA51'];
  @Input()
  dataLabels: ApexDataLabels = {
    enabled: false,
  };

  private datos_e = 0;
  private datos_f = 0;
  private datos_n = 0;
  dataestado_val:number[] = [0,0,0];

  constructor(private LogsService:LogsService) {

    this.LogsService.getLogs().subscribe(rpt=>{
      console.log(rpt)
      for (let j = 0; j < rpt.payload.logs.length; j++) {
        console.log(rpt.payload.logs[j].state);
        
        if(rpt.payload.logs[j].state == 'Exitoso'){
          this.datos_e += 1;
        }
        else if (rpt.payload.logs[j].state == 'Fallido'){
          this.datos_f += 1;
        }
        else{
          this.datos_n += 1;
        }
      }
      this.dataestado_val[0]=this.datos_e;
      this.dataestado_val[1]=this.datos_f;
      this.dataestado_val[2]=this.datos_n;

      console.log(this.dataestado_val);
      

      this.series = [this.datos_e,this.datos_f,this.datos_n];

    });

   
    
    this.series = [25,30,15];
    this.chart = {
      type: 'pie',
    };
    this.legend = {
      position: 'bottom',
    };
    this.labels = ['Exitoso', 'Fallido', 'Notifcaciones'];
    this.responsive = [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ];
  }


  ngOnInit(): void {}


}
