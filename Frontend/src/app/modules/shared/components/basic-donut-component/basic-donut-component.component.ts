import { Component, Input, OnInit } from '@angular/core';
import { ApexDataLabels, ApexLegend, ChartComponent } from 'ng-apexcharts';
import { DashboardService } from '@services/dashboard.service';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';

@Component({
  selector: 'app-basic-donut-component',
  templateUrl: './basic-donut-component.component.html',
  styleUrls: ['./basic-donut-component.component.scss'],
})
export class BasicDonutComponentComponent implements OnInit {

  series: ApexNonAxisChartSeries;
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

  public data_list_v:any=[]
  public data_list_l:any=[]
  constructor(private dashboardService:DashboardService) {

    
    this.dashboardService.getDashboard().subscribe(rpt => {
      rpt.services.map((elem:any)=>{
        this.data_list_v.push(elem.count);
        this.data_list_l.push(elem.institution);
      });

      console.log(this.data_list_v);
      console.log(this.data_list_l);

      this.series = this.data_list_v;
      this.labels = this.data_list_l;  
    });


    this.series = [44, 55, 13, 43, 22];
    this.chart = {
      type: 'donut',
    };
    //this.labels = ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'];
    this.legend = {
      position: 'bottom',
    };
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
