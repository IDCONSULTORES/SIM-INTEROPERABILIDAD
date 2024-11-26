import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ToastService } from '@services/toast.service';
@Component({
  selector: 'app-availability-dialog',
  templateUrl: './availability-dialog.component.html',
  styleUrls: ['./availability-dialog.component.scss']
})
export class AvailabilityDialogComponent implements OnInit {
  public dataTable: any[] = [];
  public data_to_send:any[] = [];
  day = ""
  start_hour = ""
  start_minute = "00"
  end_hour = ""
  end_minute= "00"
  public displayedColumns = [
    'dia',
    'inicio',
    'fin'
  ];
  hours: string[] = Array.from({ length: 24 }, (_, i) => this.padNumber(i));
  minutes: string[] = Array.from({ length: 1 }, (_, i) => this.padNumber(i));
  constructor(    public dialogRef: MatDialogRef<AvailabilityDialogComponent>,
    private toastService:ToastService,
    @Inject(MAT_DIALOG_DATA) public data: any,) { 
    this.dataTable = [this.getNewObject()];
  }
  public mock = ["de 1 a 3","de 2 a 5"]

  circles = [
    { text: 'Dom', active: false },
    { text: 'Lun', active: false },
    { text: 'Mar', active: false },
    { text: 'Mié', active: false },
    { text: 'Jue', active: false },
    { text: 'Vie', active: false },
    { text: 'Sáb', active: false },

  ];
  toggleCircleColor(index: number) {
    this.circles[index].active = !this.circles[index].active;
  }
  ngOnInit(): void {
  }

  private padNumber(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }

  getNewObject() {
    return {
      day: '',
      start_hour: '',
      start_minute: '00',
      end_hour: '',
      end_minute: '00',
      state:'Activo',
      institution:'Sernanp'
    };
  }

  addNewElementToList() {
    var elemento = this.getNewObject()
    this.dataTable = [...this.dataTable, elemento];
  }

  post()
  {
    console.log(this.dataTable)
    for(var i = 0; i<this.dataTable.length;i++)
    {
      var body = {
        dayOfWeek:this.dataTable[i]['day'],
        timeStart:this.dataTable[i]['start_hour']+':'+'00',
        timeEnd:this.dataTable[i]['end_hour']+':'+'00',
        state:'Activo',
      }
      this.data_to_send.push(body);
    }
    this.dialogRef.close(this.data_to_send)
  }

  validhour(event : any, h1:any){
    const value = event.target.value;
    //let m1 = document.getElementById('hora1') as HTMLSelectElement;
    //console.log( h1 + ' - - '+value );
    

    if ( value <= h1 ) {
      event.target.value = h1+1;
      console.log(event.target.value);
      this.toastService.showInfoToast("Las horas de fin no pueden menores o iguales a las del inicio")
    }


  }
}
