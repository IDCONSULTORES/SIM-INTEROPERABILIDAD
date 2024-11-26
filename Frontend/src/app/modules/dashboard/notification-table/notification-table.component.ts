import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LogsService } from '@services/logs.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-notification-table',
  templateUrl: './notification-table.component.html',
  styleUrls: ['./notification-table.component.scss'],
})
export class NotificationTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns = [
    'descripcion',
    'fecha',
    'creado_por',
    'duracion',
    'estado',
  ];
  private dataTest = {
    projectNameTreatment: 'test',
    documentType: 'test',
    documentTypeName: 'test',
    issuanceDate: '12/12/23',
  };

  selectedNot = 0;
  private datos_e = 0;
  private datos_f = 0;
  private datos_n = 0;
  dataestado_val = [0,0,0];
  dataestado_nom = ["Exitoso","Fallido","Notificaciones"];
  public dataSource: any = new MatTableDataSource([]);
  constructor(private dialog: MatDialog, private LogsService:LogsService,) {

    this.LogsService.getLogs().subscribe(rpt=>{
      console.log(rpt)
      this.dataSource = new MatTableDataSource(rpt.payload.logs);
      //this.dataSource.sort = this.sort;
      
      for (let j = 0; j < rpt.length; j++) {
        if(rpt[j].state == 'Exitoso'){
          this.datos_e += 1;
        }
        else if (rpt[j].state == 'Fallido'){
          this.datos_f += 1;
        }
        else{
          this.datos_n += 1;
        }
      }
      this.dataestado_val[0]=this.datos_e;
      this.dataestado_val[1]=this.datos_f;
      this.dataestado_val[2]=this.datos_n;

    })
    
    //this.dataSource = new MatTableDataSource(data);
  }
  exportToExcel(): void {
    const exportData = this.dataSource.filteredData.map((item:any) => {
      return {
        'Descripción': item.description,
        'Día': item.eventDate,
        'Creado por': item.createBy,
        'Duración': item.duration,
        'Estado': item.state
        // Agrega las columnas adicionales según sea necesario
      };
    });
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, `logs.xlsx`);
  }
  applyFilter(event: string) {
    const filterValue = event.toString();

    if(filterValue==''){
      this.selectedNot=0;
    }
    else if(filterValue=='Notificaciones'){
      this.selectedNot=1;
    }
    else if(filterValue=='Exitoso'){
      this.selectedNot=2;
    }
    else if(filterValue=='Fallido'){
      this.selectedNot=3;
    }

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {}

}
