import { Component, OnInit , ViewChild,Output, EventEmitter,} from '@angular/core';
import { WfsService } from '@services/wfs.service';
import { ServiceOfferTableComponent } from './components/service-offer-table/service-offer-table.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-service-offer',
  templateUrl: './service-offer.component.html',
  styleUrls: ['./service-offer.component.scss'],
})
export class ServiceOfferComponent implements OnInit {
  @Output()
  selectedObject = new EventEmitter();
  @ViewChild('datatable', { static: true }) datatable!: ServiceOfferTableComponent;
/// tabla
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  public displayedColumns = [
    'name',
    'service',
    'source',
    'referencia',
    'createBy',
    'createAt',
  ];
  public dataSource: any = new MatTableDataSource([]);

  public v_tabla:boolean = false;
  public MIDAGRI:any = [];
  public institutions = new Set();
  public t_data:any = []
  constructor(private wfsService:WfsService) { 
    this.wfsService.getWFS().subscribe(rpt => {
      console.log(rpt)

      let data:any = []
      for(var i = 0;i<rpt.payload.wfs.length;i++)
      {
        this.institutions.add(rpt.payload.wfs[i]['source']) 
        data.push(rpt.payload.wfs[i]);
      }
      console.log(this.institutions)
      console.log(data);
      
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

  ngOnInit(): void {
  }
}
