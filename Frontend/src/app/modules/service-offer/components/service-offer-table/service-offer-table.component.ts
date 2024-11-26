import { Component, OnInit, ViewChild, Input, Output, EventEmitter, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ScheduleTaskComponent } from '../schedule-task/schedule-task.component';
import { ScheduleAttributesComponent } from '../schedule-attributes/schedule-attributes.component';
import { AvailabilityTableComponent } from '../availability-table/availability-table.component';
import { MessageModalComponent } from '@modules/shared/components/message-modal/message-modal.component';
import { WfsService } from '@services/wfs.service';
import { ConvertService } from '@services/convert.service';
import { ToastService } from '@services/toast.service';
import { LayerLoadDialogComponent } from '../layer-load-dialog/layer-load-dialog.component';
import { environment } from '@environments/environment';
import { AuthenticationService } from '@services/authentication.service';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-service-offer-table',
  templateUrl: './service-offer-table.component.html',
  styleUrls: ['./service-offer-table.component.scss'],
})

export class ServiceOfferTableComponent implements OnInit {
  public enviromentURL = environment.etl;
  public url = this.enviromentURL+'/wfs/files/'
  public url2 = this.enviromentURL+'/wms/'
  @Output()
  selectedObject = new EventEmitter();
  @Input() type!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(AvailabilityTableComponent, { static: false }) availabilityComponent!: AvailabilityTableComponent;
  tab = 0;
  public loadingData = false;
  public dataTable:any = [];
  public data_per_row:any;
  public displayedColumns = [
    'capa',
    'tipo',
    'servicio',
    'proyeccion',
    'usuario_creado',
    'fecha_creado',
    'usuario_modificado',
    'fecha_modificado',
    'disponibilidad',
    'accion',
  ];

  public dataSource: any = new MatTableDataSource([]);
  days:any = {
    'Monday':'Lunes',
    'Tuesday':'Martes', 
    'Wednesday': 'Miercoles', 
    'Thursday': 'Jueves', 
    'Friday': 'Viernes',
    'Saturday': 'Sabado',
    'Sunday': 'Domingo',
    '':''
  }
  constructor(private dialog: MatDialog, private wfsService:WfsService, 
    private convertService:ConvertService,
    public toastService:ToastService, private authService:AuthenticationService,
    private http: HttpClient,) {

  }

  post(){
    this.availabilityComponent.post();
  }
  layerLoadDialog(element:any) {
    const dialog = this.dialog.open(LayerLoadDialogComponent, {
      width: '470px',
      height: '440px',
      panelClass: ['dialog-no-padding', 'general-modal'],
      data: {
        wfs:element
      },
    });
    dialog.afterClosed().subscribe((rpt) => {

    });
  }
  ngOnInit(): void {
    console.log(this.type)
    this.wfsService.getWFS().subscribe(rpt => {
      console.log(rpt)
      for(var i = 0;i<rpt.payload.wfs.length;i++)
      {
       if(rpt.payload.wfs[i].source==this.type && rpt.payload.wfs[i].isAvailable == "Disponible" )
       {
        this.dataTable.push(rpt.payload.wfs[i]);
       }       
      }
      this.dataSource = new MatTableDataSource(this.dataTable);
      this.dataSource.sort = this.sort;
      console.log(this.dataSource)
    })

  }

  applyFilter2(event: Event ) {
    const filterValue = (event.target as HTMLInputElement).value;

    console.log('datos : ');
    
    
        this.dataSource.filter = filterValue.trim().toLowerCase();
        
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
        
    }

  scheduleTask($event:any) {
    this.dialog.open(ScheduleTaskComponent, {
      width: '750px',
      panelClass: ['dialog-no-padding', 'general-modal'],
      data: $event
    });
  }

  scheduleAttributes() {
    this.dialog.open(ScheduleAttributesComponent, {
      width: '750px',
      panelClass: ['dialog-no-padding', 'general-modal'],
    });
  }



  download(element:any)
  { 
    console.log(this.url)
    this.loadingData = true;
    var body = {
      "url":element.url,
      "name_file":element.name,
      "email":element.createBy
    }
    if(element.service=="WFS")
    {
      this.convertService.postConversion(body).subscribe({
        next: (rpt1) => {
            
        },
        complete: () => {
          this.http.get(this.url+element.name, { responseType: 'blob' }).subscribe({
            next: (data: Blob) => {
              this.loadingData=false
  
              saveAs(data, element.name+'.zip'); // Use the 'file-saver' library to save the file
              this.toastService.showInfoToast("Se descargó correctamente")
            },
            error: (error) => {
              this.loadingData=false
              this.toastService.showErrorToast("Algo salió mal")
            },
          });
        },
        error:() => {
          this.loadingData = false;
          this.toastService.showErrorToast("Algo salió mal")
        }
       
      }
        
       
      )
    }
    else
    {
      this.http.get(this.url2+element.id, { responseType: 'blob' }).subscribe({
        next: (data: Blob) => {
          this.loadingData=false

          saveAs(data, element.name+'.zip'); // Use the 'file-saver' library to save the file
          this.toastService.showInfoToast("Se descargó correctamente")
        },
        error: (error) => {
          this.loadingData=false
          this.toastService.showErrorToast("Algo salió mal")
        },
      });
    }

  }
}
