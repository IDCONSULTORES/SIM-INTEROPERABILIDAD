import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessageModalComponent } from '@modules/shared/components/message-modal/message-modal.component';
import { WfsService } from '@services/wfs.service';
import { ServiceDemandComponent } from '@modules/service-demand/service-demand.component';
import { DemandService } from '@services/demand.service';
import { SimilarityService } from '@services/similarity.service';
@Component({
  selector: 'app-second-table',
  templateUrl: './second-table.component.html',
  styleUrls: ['./second-table.component.scss']
})
export class SecondTableComponent implements OnInit {

  @Input() type!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(ServiceDemandComponent) father!: ServiceDemandComponent;
  tab = false;
  @Output() newItemEvent = new EventEmitter<boolean>();
  public dataTable:any = [];
  public displayedColumns = [
    'nameLayer',
    'geomType',
    'executeDate',
    'quantity',
    'news',
    'exists',
    'deleted',
    'coincidence',
  ];
  private dataTest = {
    name: 'ANP de Administración Nacional',
    tipo: 'Poligono',
    fecha_ejecucion: '23/06/2023',
    cantidad_registros: '15',
    nuevos: '25',
    existentes: '1000',
    eliminados: '0',
    coincidencia: '-',
  };

  public dataSource: any = new MatTableDataSource([]);
  constructor(private dialog: MatDialog, private wfsService:WfsService, 
    private demandService:DemandService, private similarityService:SimilarityService
) {

    
    
  }

  ngOnInit(): void {
    this.similarityService.getSimilarity().subscribe((rpt:any) => {
      console.log(rpt)
      this.dataSource = new MatTableDataSource(rpt.payload.similarities)
    })

  }

  createService() {
    let dialog = this.dialog.open(MessageModalComponent, {
      width: '500px',
      panelClass: ['dialog-no-padding', 'general-modal'],
      data: {
        title: 'CORRECTO',
        subtitle:
          'El proceso de verificación arrojó una similitud mas del 80%, desea continuar',
        primaryButtonText: 'SI',
        secondaryButtonText: 'NO',
      },
    });
    dialog.afterClosed().subscribe((res:any)=>{
        this.tab = res;
        this.newItemEvent.emit(this.tab);
    });
  }

  deleteService() {
    this.dialog.open(MessageModalComponent, {
      width: '500px',
      panelClass: ['dialog-no-padding', 'general-modal'],
      data: {
        title: 'Eliminar registro WFS',
        subtitle:
          '¿Estás seguro que deseas eliminar el registro WFS con id:40?',
        primaryButtonText: 'Eliminar',
        hasCloseButton: true,
        imagePath: '/assets/imagenes/delete.svg',
        imageAlt: 'Ícono Eliminar',
      },
    });
  }


}
