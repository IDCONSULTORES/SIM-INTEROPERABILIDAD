import { Component, OnInit, ViewChild, AfterViewInit,OnChanges, SimpleChanges } from '@angular/core';
import { WfsService } from '@services/wfs.service';
import { DemantTableComponent } from './components/demant-table/demant-table.component';
import { DemandService } from '@services/demand.service';
import { ScheduleService } from '@services/schedule.service';
import { BehaviorSubject } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-service-demand',
  templateUrl: './service-demand.component.html',
  styleUrls: ['./service-demand.component.scss']
})
export class ServiceDemandComponent implements OnInit  {
  //tabla
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns = [
    'layerName',
    'ogcService',
    'entityName',
    'reference',
    'createBy',
    'startDate',
  ];
  public dataSource: any = new MatTableDataSource([]);

  public MIDAGRI:any = [];
  public institutions = new Set();
  miVariable$ = new BehaviorSubject<boolean>(this.demandService.tab);
  tab:boolean;
  constructor(private wfsService:WfsService,private scheduleService:ScheduleService ,private demandService: DemandService) { 
    this.tab = false;
    this.scheduleService.getSchedule().subscribe(rpt => {
      console.log(rpt)
      let data:any = []
      for(var i = 0;i<rpt.payload.schedules.length;i++)
      {
        this.institutions.add(rpt.payload.schedules[i]['entityName']) 
        data.push(rpt.payload.schedules[i]);
      }
      console.log(this.institutions)
      this.dataSource = new MatTableDataSource(data);
    })




  }

  apply(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    let v_tabla = document.getElementById('v_tabla');
    console.log('datos : ' + filterValue);

    if (filterValue.length >= 3) {
      console.log(filterValue.length + '  :: ' + filterValue );
      v_tabla!.style.display = '';
    }else{
      v_tabla!.style.display = 'none';
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();
        
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }


  ngOnInit() {
    this.miVariable$.subscribe((nuevoValor) => {
      // Realiza acciones cuando miVariable cambia
      console.log('miVariable cambió:', nuevoValor);
      
    });
    
  }
  show(event:boolean)
  {
    console.log(event)
    this.tab = event;
  }

  cambiarValor() {
    this.miVariable$.next(this.demandService.tab);
  }





}
