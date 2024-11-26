import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '@services/dashboard.service';
import { NgForm } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  fechaInicio: any ;
  fechaFin: any;
  @ViewChild('form', { static: false }) form: NgForm | undefined;

  data:any;
  w_filter:boolean = false;

  public selectedGraph = 0;
  public layers = 0;
  public schedules = 0;
  public wfs = 0;

  private datos_e = 0;
  private datos_f = 0;
  private datos_n = 0;
  dataestado_val:any[] = [0,0,0];
  dataestado_val2:any[] = [10,20,15,4,5];
  dataestado_nom:any[] = ["Exitoso","Fallido","Notificaciones"];
  @ViewChild("chart") chart!: ChartComponent;
  @ViewChild('startDateInput') startDateInput: any; // Agregar referencia al input de fecha de inicio
  @ViewChild('endDateInput') endDateInput: any; // Agregar referencia al input de fecha de fin
  public chartOptions: any;
  constructor(private dashboardService:DashboardService) {

    this.chartOptions = {
      series: [
        {
          name: "Lecturas WFS",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "Acción sobre Programación",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "Acción sobre capas",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "Inserción",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "ETL",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    }

    this.getDataDashboard();
  }

  formatearFecha(fecha: Date): string {
    const year = fecha.getFullYear();
    const month = String(fecha.getMonth() + 1).padStart(2, '0'); // Los meses son base 0, por eso se le suma 1
    const day = String(fecha.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  obtenerFechas(){
    console.log('Fecha de inicio:', this.formatearFecha(this.fechaInicio));
    console.log('Fecha de fin:', this.formatearFecha(this.fechaFin));
    this.w_filter=true;
    this.change_chart2(0,this.formatearFecha(this.fechaInicio),this.formatearFecha(this.fechaFin))
  }

  clearfilter(){
    this.change_chart1(1)
    this.w_filter = false;
    this.fechaInicio = '';
    this.fechaFin = '';
  }

  getDataDashboard(){
 
      this.change_chart(1);
 
  }

  change_chart(option:number){
    if (this.w_filter===true) {
      this.change_chart2(option,this.formatearFecha(this.fechaInicio),this.formatearFecha(this.fechaFin))
    }else{
      this.change_chart1(option)
    }
  }

  change_chart2(option:number,start:string,end:string)  
  {
    var count_list:any = []
    var categories_list:any = []

    this.dashboardService.getDashboardDate(start,end).subscribe(rpt => {

      this.layers = rpt.totals.layers
      this.schedules = rpt.totals.schedules
      this.wfs = rpt.totals.wfs


      if(option==1)
      {
        this.selectedGraph = 1
        for(var i = 0; i<rpt.payload.length;i++)
        {
          if(rpt.payload[i].eventName == "Lectura WFS")
          {

            count_list.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
        }
        var serie = {
          name: "Lectura WFS",
          data: count_list
        }
        this.chartOptions.series = [serie]
        console.log(categories_list)
        this.chartOptions.xaxis = {type: "datetime",categories:categories_list}
      }

      if(option==2)
      {
        this.selectedGraph = 2
        for(var i = 0; i<rpt.payload.length;i++)
        {
          if(rpt.payload[i].eventName == "Acción sobre Programación")
          {

            count_list.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
        }
        var serie = {
          name: "Acción sobre Programación",
          data: count_list
        }
        this.chartOptions.series = [serie]
        console.log(categories_list)
        this.chartOptions.xaxis = {type: "datetime",categories:categories_list}
      }

      if(option==3)
      {
        this.selectedGraph = 3
        for(var i = 0; i<rpt.payload.length;i++)
        {
          if(rpt.payload[i].eventName == "Acción sobre capas")
          {

            count_list.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
        }
        var serie = {
          name: "Acción sobre capas",
          data: count_list
        }
        this.chartOptions.series = [serie]
        console.log(categories_list)
        this.chartOptions.xaxis = {type: "datetime",categories:categories_list}
      }

      if(option==4)
      {
        this.selectedGraph = 4
        for(var i = 0; i<rpt.payload.length;i++)
        {
          if(rpt.payload[i].eventName == "Inserción")
          {

            count_list.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
        }
        var serie = {
          name: "Inserción",
          data: count_list
        }
        this.chartOptions.series = [serie]
        console.log(categories_list)
        this.chartOptions.xaxis = {type: "datetime",categories:categories_list}
      }

      if(option==5)
      {
        this.selectedGraph = 5
        for(var i = 0; i<rpt.payload.length;i++)
        {
          if(rpt.payload[i].eventName == "ETL")
          {

            count_list.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
        }
        var serie = {
          name: "ETL",
          data: count_list
        }
        this.chartOptions.series = [serie]
        console.log(categories_list)
        this.chartOptions.xaxis = {type: "datetime",categories:categories_list}
      }

      if(option==0)
      {
        this.selectedGraph = 0
        var serie1:any;
        var serie2:any;
        var serie3:any;
        var serie4:any;
        var serie5:any;
        var list1 = []
        var list2 = []
        var list3 = []
        var list4 = []
        var list5 = []
        this.selectedGraph = 0
        for(var i = 0; i<rpt.payload.length;i++)
        {
          if(rpt.payload[i].eventName == "Lectura WFS")
          {

            list1.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
          if(rpt.payload[i].eventName == "Acción sobre Programación")
          {

            list2.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
          if(rpt.payload[i].eventName == "Acción sobre capas")
          {

            list3.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
          if(rpt.payload[i].eventName == "Inserción")
          {

            list4.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
          if(rpt.payload[i].eventName == "ETL")
          {

            list5.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
        }

        serie1 = {
          name: "Lectura WFS",
          data: list1
        }
        serie2 = {
          name: "Acción sobre Programación",
          data: list2
        }
        serie3 = {
          name: "Acción sobre capas",
          data: list3
        }
        serie4 = {
          name: "Inserción",
          data: list4
        }
        serie5 = {
          name: "ETL",
          data: list5
        }
        console.log(categories_list)
        this.chartOptions.series = [serie1,serie2,serie3,serie4,serie5]
        this.chartOptions.xaxis = {type: "datetime",categories:categories_list}
      }
      
    })
   
    
    
  }

  change_chart1(option:number)
  {
    var count_list:any = []
    var categories_list:any = []

    this.dashboardService.getDashboard().subscribe(rpt => {

      this.layers = rpt.totals.layers
      this.schedules = rpt.totals.schedules
      this.wfs = rpt.totals.wfs

      if(option==1)
      {
        this.selectedGraph = 1
        for(var i = 0; i<rpt.payload.length;i++)
        {
          if(rpt.payload[i].eventName == "Lectura WFS")
          {

            count_list.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
        }
        var serie = {
          name: "Lectura WFS",
          data: count_list
        }
        this.chartOptions.series = [serie]
        console.log(categories_list)
        this.chartOptions.xaxis = {type: "datetime",categories:categories_list}
      }

      if(option==2)
      {
        this.selectedGraph = 2
        for(var i = 0; i<rpt.payload.length;i++)
        {
          if(rpt.payload[i].eventName == "Acción sobre Programación")
          {

            count_list.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
        }
        var serie = {
          name: "Acción sobre Programación",
          data: count_list
        }
        this.chartOptions.series = [serie]
        console.log(categories_list)
        this.chartOptions.xaxis = {type: "datetime",categories:categories_list}
      }

      if(option==3)
      {
        this.selectedGraph = 3
        for(var i = 0; i<rpt.payload.length;i++)
        {
          if(rpt.payload[i].eventName == "Acción sobre capas")
          {

            count_list.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
        }
        var serie = {
          name: "Acción sobre capas",
          data: count_list
        }
        this.chartOptions.series = [serie]
        console.log(categories_list)
        this.chartOptions.xaxis = {type: "datetime",categories:categories_list}
      }

      if(option==4)
      {
        this.selectedGraph = 4
        for(var i = 0; i<rpt.payload.length;i++)
        {
          if(rpt.payload[i].eventName == "Inserción")
          {

            count_list.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
        }
        var serie = {
          name: "Inserción",
          data: count_list
        }
        this.chartOptions.series = [serie]
        console.log(categories_list)
        this.chartOptions.xaxis = {type: "datetime",categories:categories_list}
      }

      if(option==5)
      {
        this.selectedGraph = 5
        for(var i = 0; i<rpt.payload.length;i++)
        {
          if(rpt.payload[i].eventName == "ETL")
          {

            count_list.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
        }
        var serie = {
          name: "ETL",
          data: count_list
        }
        this.chartOptions.series = [serie]
        console.log(categories_list)
        this.chartOptions.xaxis = {type: "datetime",categories:categories_list}
      }

      if(option==0)
      {
        this.selectedGraph = 0
        var serie1:any;
        var serie2:any;
        var serie3:any;
        var serie4:any;
        var serie5:any;
        var list1 = []
        var list2 = []
        var list3 = []
        var list4 = []
        var list5 = []
        this.selectedGraph = 0
        for(var i = 0; i<rpt.payload.length;i++)
        {
          if(rpt.payload[i].eventName == "Lectura WFS")
          {

            list1.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
          if(rpt.payload[i].eventName == "Acción sobre Programación")
          {

            list2.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
          if(rpt.payload[i].eventName == "Acción sobre capas")
          {

            list3.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
          if(rpt.payload[i].eventName == "Inserción")
          {

            list4.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
          if(rpt.payload[i].eventName == "ETL")
          {

            list5.push(rpt.payload[i].count)
            categories_list.push(rpt.payload[i].date)
          }
        }

        serie1 = {
          name: "Lectura WFS",
          data: list1
        }
        serie2 = {
          name: "Acción sobre Programación",
          data: list2
        }
        serie3 = {
          name: "Acción sobre capas",
          data: list3
        }
        serie4 = {
          name: "Inserción",
          data: list4
        }
        serie5 = {
          name: "ETL",
          data: list5
        }
        console.log(categories_list)
        this.chartOptions.series = [serie1,serie2,serie3,serie4,serie5]
        this.chartOptions.xaxis = {type: "datetime",categories:categories_list}
      }
      
    })
   

    
    
  }

  ngOnInit(): void {}
}
