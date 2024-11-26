import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastService } from '@services/toast.service';
import { LayerService } from '@services/layer.service';

@Component({
  selector: 'app-schedule-attributes',
  templateUrl: './schedule-attributes.component.html',
  styleUrls: ['./schedule-attributes.component.scss'],
})
export class ScheduleAttributesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns = ['campo', 'accion', 'clave_primaria'];
  public dataTest:any =  [];

  public dataSource: any = new MatTableDataSource([]);
  constructor(public dialog: MatDialogRef<ScheduleAttributesComponent>, 
    private toastService:ToastService, 
    private layerService:LayerService, 
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    console.log(this.data)
    const datat = [];
    this.get_data();
    
  }

  get_data(){
    this.layerService.getLayers(this.data).subscribe(rpt => {
      console.log(rpt)
      console.log('----------');
      console.log(rpt.payload.layer[0].attributes );
      let valor_s = rpt.payload.layer[0].activeField;
      const partes = rpt.payload.layer[0].attributes.match(/'([^']+)'/g)

      for (let h = 0; h < partes.length; h+=2) {
        let val = 0;
        let part1 = partes[h].replace(/^'(.*)'$/, '$1').toUpperCase();
        let part2 = partes[h+1].replace(/^'(.*)'$/, '$1').toUpperCase();

        if ( valor_s == part1 ) {
          val = 1;
        }else{
          val = 0;
        }
        let body = {
          id :part1,
          clave_primaria :part2,
          state: val
        }
        this.dataTest.push(body)
      }
      this.dataSource = new MatTableDataSource(this.dataTest);
      
    })
  }
  
  ngOnInit(): void {}

  patch_layers(){

    let sele = document.getElementById('sele') as HTMLSelectElement;
    let id = this.data;

    let body = {
      field: sele.value
    }
    /*
    console.log(id );
    console.log(body);
    */  
    this.layerService.putLayers2(body, id).subscribe({
      next: (rpt) => {
        this.toastService.showInfoToast("Capa actualizada correctamente")
        console.log(rpt);
        this.dialog.close();
      },
      error: () => {
        this.toastService.showErrorToast("Algo salió mal")
      },
    })

  }



}
