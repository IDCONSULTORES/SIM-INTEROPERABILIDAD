import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessageModalComponent } from '@modules/shared/components/message-modal/message-modal.component';
import { WfsService } from '@services/wfs.service';
import { ServiceDemandComponent } from '@modules/service-demand/service-demand.component';
import { DemandService } from '@services/demand.service';
import { ScheduleService } from '@services/schedule.service';
import { EditScheduleComponent } from '../edit-schedule/edit-schedule.component';
@Component({
  selector: 'app-demant-table',
  templateUrl: './demant-table.component.html',
  styleUrls: ['./demant-table.component.scss'],
})
export class DemantTableComponent implements OnInit {
  @Input() type!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(ServiceDemandComponent) father!: ServiceDemandComponent;
  tab = false;
  tab1 = 0;
  public loadingData = false;
  @Output() newItemEvent = new EventEmitter<boolean>();
  public dataTable:any = [];
  public displayedColumns = [
    'layerName',
    'geometry',
    'ogcService',
    'reference',
    'frequency',
    'createBy',
    'startDate',
    'endDate',
    'synchroType',
    'percent',
    'accion',
  ];
  private dataTest = {
    projectNameTreatment: 'test',
    documentType: 'test',
    documentTypeName: 'test',
    issuanceDate: '12/12/23',
  };

  public dataSource: any = new MatTableDataSource([]);
  constructor(private dialog: MatDialog, private wfsService:WfsService, 
    private demandService:DemandService, private scheduleService:ScheduleService
) {

    
    
  }

  ngOnInit(): void {

    console.log(this.type)
    this.getData();
  }

  applyFilter2(event: Event ) {
    const filterValue = (event.target as HTMLInputElement).value;

    console.log('datos : ');
    
    
        this.dataSource.filter = filterValue.trim().toLowerCase();
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
    }

  getData()
  {
    this.dataSource = new MatTableDataSource([])
    this.dataTable = [];
    this.scheduleService.getSchedule().subscribe(rpt => {
      console.log(this.type)
      console.log(rpt)
      for(var i = 0;i<rpt.payload.schedules.length;i++)
      {
       if(rpt.payload.schedules[i].entityName==this.type)
       {
        this.dataTable.push(rpt.payload.schedules[i]);
       }
       
      }
      this.dataSource = new MatTableDataSource(this.dataTable);
      this.dataSource.sort = this.sort;
      console.log(this.dataSource)
    })
  }
  createService(element:any) {
    let dialog = this.dialog.open(MessageModalComponent, {
      width: '500px',
      panelClass: ['dialog-no-padding', 'general-modal'],
      data: {
        title: 'CORRECTO',
        subtitle:
          'El proceso de verificación arrojó una similitud mas del '+element.wfspercent+'%, desea continuar',
        primaryButtonText: 'SI',
        secondaryButtonText: 'NO',
        data: element
      },
    });
    dialog.afterClosed().subscribe((res:any)=>{
        this.tab = res;
        if(this.tab)
        {
          this.tab = res;
        }
        else
        {
          this.tab = false
        }
        this.newItemEvent.emit(this.tab);
    });
  }

  deleteService(id:string) {
    let dialog = this.dialog.open(MessageModalComponent, {
      width: '500px',
      panelClass: ['dialog-no-padding', 'general-modal'],
      data: {
        title: 'Eliminar programación WFS',
        subtitle:
          '¿Estás seguro que deseas eliminar la programación seleccionada?',
        primaryButtonText: 'Eliminar',
        hasCloseButton: true,
        imagePath: '/assets/imagenes/delete.svg',
        imageAlt: 'Ícono Eliminar',
        id: id
      },
    });
    dialog.afterClosed().subscribe((res:any)=>{
      if(res==true)
      {
        this.getData();
      }
      
    });
  }

  editSchedule($event:any)
  {
    let dialog = this.dialog.open(EditScheduleComponent, {
      width: '750px',
      panelClass: ['dialog-no-padding', 'general-modal'],
      data: $event
    });
    dialog.afterClosed().subscribe((res:any)=>{
      if(res==true)
      {
        this.getData();
      }
      
    });
  }

}
