import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CreateServiceComponent } from '../create-service/create-service.component';
import { MessageModalComponent } from '@modules/shared/components/message-modal/message-modal.component';
import { WfsService } from '@services/wfs.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ScheduleAttributesComponent } from '../schedule-attributes/schedule-attributes.component';
import { LayerLoadDialogComponent } from '../layer-load-dialog/layer-load-dialog.component';
import { AuthenticationService } from '@services/authentication.service';
import { UserService } from '@services/user.service';
@Component({
  templateUrl: './service-record.component.html',
  styleUrls: ['./service-record.component.scss'],
})
export class ServiceRecordComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public userId = ""
  public institution = ""
  public displayedColumns = [
    'id',
    'name',
    'pseudoName',
    'tipo',
    'service',
    'referencia',
    'createBy',
    'createAt',
    'modifyBy',
    'modifyAt',
    'availability',
    'duration',
    'isAvailable',
    'percent',
    'nextStep',
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
    private _liveAnnouncer: LiveAnnouncer, private authService:AuthenticationService,
    private userService:UserService) {
    
      this.listTable()
      this.authService.verify({token: this.authService.currentUserValue.access_token}).subscribe((rpt:any) => {
        this.userId = rpt.payload.id;
        this.userService.getUser(this.userId).subscribe((rpt2:any) => {
          this.institution = rpt2.payload.user[0].institution.name;
        })
      })
   
  }

  ngOnInit(): void {}
    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
      // This example uses English messages. If your application supports
      // multiple language, you would internationalize these strings.
      // Furthermore, you can customize the message to add additional
      // details about the values being sorted.
      if (sortState.direction) {
        this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      } else {
        this._liveAnnouncer.announce('Sorting cleared');
      }
    }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  createService() {
    const createModal = this.dialog.open(CreateServiceComponent, {
      width: '750px',
      panelClass: ['dialog-no-padding', 'general-modal'],
      data: {
        isEditMode: false,
        
      },
    });
    createModal.afterClosed().subscribe((rpt) => {
      if (rpt) this.showSuccess();
      this.listTable();
    });
  }

  editService(element:any) {
    const editModal = this.dialog.open(CreateServiceComponent, {
      width: '750px',
      panelClass: ['dialog-no-padding', 'general-modal'],
      data: {
        isEditMode: true,
        wfs:element
      },
    });
    editModal.afterClosed().subscribe((rpt) => {
      if (rpt) this.showSuccess();
      this.listTable();
    });
  }

  layerLoadDialog(element:any) {
    const dialog = this.dialog.open(LayerLoadDialogComponent, {
      width: '450px',
      height: '390px',
      panelClass: ['dialog-no-padding', 'general-modal'],
      data: {
        wfs:element
      },
    });
    dialog.afterClosed().subscribe((rpt) => {
      if (rpt) this.showSuccess();
    });
  }

  listTable(){
    this.dataSource = new MatTableDataSource([])
    this.authService.verify({token: this.authService.currentUserValue.access_token}).subscribe((rpt1:any) => {
      this.userId = rpt1.payload.id;
        this.wfsService.getWFSbyInstitution(this.userId).subscribe(rpt3 => {
          this.dataSource = new MatTableDataSource(rpt3.payload.wfs);
          console.log(this.dataSource)
          this.dataSource.sort = this.sort;
          
        })
  

    })
  }

  deleteService(element:any) {
    let dialog = this.dialog.open(MessageModalComponent, {
      width: '600px',
      panelClass: ['dialog-no-padding', 'general-modal'],
      data: {
        title: 'Eliminar Servicio',
        subtitle: '¿Estás seguro que deseas eliminar el registro con id:'+element.id+'?',
        primaryButtonText: 'Eliminar',
        hasCloseButton: true,
        imagePath: '/assets/imagenes/delete.svg',
        imageAlt: 'Ícono Eliminar',
        id: element.id
      },
    });
    dialog.afterClosed().subscribe((res)=>{
      console.log("listar la tabla");      
      this.listTable();
    });

  }

  showSuccess() {
    this.dialog.open(MessageModalComponent, {
      width: '600px',
      panelClass: ['dialog-no-padding', 'general-modal'],
      data: {
        title: 'Actualización Exitosa',
        subtitle: 'Registro ingresado correctamente',
        primaryButtonText: 'Aceptar',
        hasCloseButton: true,
        imagePath: '/assets/imagenes/check.svg',
        imageAlt: 'Éxito',
      },
    });
  }

  scheduleAttributes(element:any) {
    this.dialog.open(ScheduleAttributesComponent, {
      width: '780px',
      panelClass: ['dialog-no-padding', 'general-modal'],
      data: element.id
    });
  }

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
}
