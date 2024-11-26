import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, Renderer2, ElementRef, ViewChild, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AvailabilityService } from '@services/availability.service';
import { ToastService } from '@services/toast.service';
import { UserService } from '@services/user.service';
import { AuthenticationService } from '@services/authentication.service';
import { WfsService } from '@services/wfs.service';
export interface Element {
  time: string;
  days: {
    sunday: {
      text: string;
      clicked: number;
    };
    monday: {
      text: string;
      clicked: number;
    };
    tuesday: {
      text: string;
      clicked: number;
    };
    wednesday: {
      text: string;
      clicked: number;
    };
    thursday: {
      text: string;
      clicked: number;
    };
    friday: {
      text: string;
      clicked: number;
    };
    saturday: {
      text: string;
      clicked: number;
    };
  };
}

@Component({
  selector: 'app-availability-table',
  templateUrl: './availability-table.component.html',
  styleUrls: ['./availability-table.component.scss']
})
export class AvailabilityTableComponent implements OnInit {
  @Input() type!: any;
  public availabilities:any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public displayedColumns = [
    'time',
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

    


  dataSource: Element[] = [
    {
      time: '00:00',
      days: {
        sunday: { text: 'Ocupado', clicked: 0 },
        monday: { text: 'Ocupado', clicked: 0 },
        tuesday: { text: 'Ocupado', clicked: 0 },
        wednesday: { text: 'Ocupado', clicked: 0 },
        thursday: { text: 'Ocupado', clicked: 0 },
        friday: { text: 'Ocupado', clicked: 0 },
        saturday: { text: 'Ocupado', clicked: 0 },
      },
    },
    {
      time: '01:00',
      days: {
        sunday: { text: 'Ocupado', clicked: 0 },
        monday: { text: 'Ocupado', clicked: 0 },
        tuesday: { text: 'Ocupado', clicked: 0 },
        wednesday: { text: 'Ocupado', clicked: 0 },
        thursday: { text: 'Ocupado', clicked: 0 },
        friday: { text: 'Ocupado', clicked: 0 },
        saturday: { text: 'Ocupado', clicked: 0 },
      },
    },
    {
      time: '02:00',
      days: {
        sunday: { text: 'Ocupado', clicked: 0 },
        monday: { text: 'Ocupado', clicked: 0 },
        tuesday: { text: 'Ocupado', clicked: 0 },
        wednesday: { text: 'Ocupado', clicked: 0 },
        thursday: { text: 'Ocupado', clicked: 0 },
        friday: { text: 'Ocupado', clicked: 0 },
        saturday: { text: 'Ocupado', clicked: 0 },
      },
    },
    {
      time: '03:00',
      days: {
        sunday: { text: 'Ocupado', clicked: 0 },
        monday: { text: 'Ocupado', clicked: 0 },
        tuesday: { text: 'Ocupado', clicked: 0 },
        wednesday: { text: 'Ocupado', clicked: 0 },
        thursday: { text: 'Ocupado', clicked: 0 },
        friday: { text: 'Ocupado', clicked: 0 },
        saturday: { text: 'Ocupado', clicked: 0 },
      },
    },
    // Agrega más objetos Element según sea necesario
  ];


  public horas:any=[]; 
  public minus:any=[];
  public segu:any =[];


  constructor(private dialog: MatDialog, private router: Router,private renderer: Renderer2, 
    private availabilityService:AvailabilityService, private toastService:ToastService,
    private userService:UserService, private authService:AuthenticationService, private wfsService:WfsService) {


    var institution = localStorage.getItem('inst_id')||""
    console.log(institution)

    for(var i = 4;i<24;i++)
    {
      if(i<10)
      {
        var element =  {
          time: `0${i.toString()}:00`,
          days: {
            sunday: { text: 'Ocupado', clicked: 0 },
            monday: { text: 'Ocupado', clicked: 0 },
            tuesday: { text: 'Ocupado', clicked: 0 },
            wednesday: { text: 'Ocupado', clicked: 0 },
            thursday: { text: 'Ocupado', clicked: 0 },
            friday: { text: 'Ocupado', clicked: 0 },
            saturday: { text: 'Ocupado', clicked: 0 },
          },
        }
        this.dataSource.push(element)
      }
      else
      {
        var element =  {
          time: `${i}:00`,
          days: {
            sunday: { text: 'Ocupado', clicked: 0 },
            monday: { text: 'Ocupado', clicked: 0 },
            tuesday: { text: 'Ocupado', clicked: 0 },
            wednesday: { text: 'Ocupado', clicked: 0 },
            thursday: { text: 'Ocupado', clicked: 0 },
            friday: { text: 'Ocupado', clicked: 0 },
            saturday: { text: 'Ocupado', clicked: 0 },
          },
        }
        this.dataSource.push(element)
      }

    }
    
  }

  ngOnInit(): void {
    console.log(this.type)
    this.get(this.type)
  }

  save(dia:string,tiempo:string,estado:string,institucion:string)
  {
    this.authService.verify({token: this.authService.currentUserValue.access_token}).subscribe((rpt:any) => {
      localStorage.setItem('user_id',rpt.payload.id);
      var id = localStorage.getItem('user_id')||""
      this.userService.getUser(id).subscribe((rpt)=>{
        console.log(rpt)
        localStorage.setItem('inst_id',rpt.payload.user[0].institution['name']);
        var inst_id = localStorage.getItem('inst_id');
        var body = {
          dayOfWeek: dia,
          timeDay: tiempo,
          state: estado,
          institution: inst_id
        }
        console.log(body)
        this.availabilities.push(body)
      })
    })

  }



  post()
  {
    console.log(this.availabilities)
    this.availabilityService.postAvailability(this.availabilities[0]).subscribe({
      next: (rpt) => {
        this.toastService.showInfoToast("Horario registrado exitosamente")
      },
      error: () => {
        this.toastService.showErrorToast("Algo salió mal")
      },
    })
  }

  get(institution:string)
  {

    this.availabilityService.getAvailabilityByInstitution({token: this.authService.currentUserValue.access_token} , institution).subscribe((rpt:any) => {
      console.log(rpt)
      console.log(this.dataSource);
      let key:any = '';

      for ( key in rpt.payload.timeInAvailabilities) {
        const value = rpt.payload.timeInAvailabilities[key];
        /*
        this.horas:any=[0,0,0,0,0,0,0]; 
        minus:any=[0,0,0,0,0,0,0];
        segu:*/ 
        
        this.horas.push(rpt.payload.timeInAvailabilities[key].hours)
        this.minus.push(rpt.payload.timeInAvailabilities[key].minutes)
        this.segu.push(rpt.payload.timeInAvailabilities[key].seconds)
      }

      //this.horas[2]=6;
      //this.minus[2]=2;

      console.log(this.horas);
      console.log(this.minus);
      console.log(this.segu);

   
      rpt.payload.availabilities.map((elem:any)=>{
        const start = elem.timeStart.split(':');
        const h_start = parseInt(start[0], 10);
        const end = elem.timeEnd.split(':');
        const h_end = parseInt(end[0], 10);
        console.log( elem.dayOfWeek.toLowerCase() +'  --- ' +h_start + ' :: ' +h_end);

        for (let j = h_start; j <= h_end; j++) {
          if (  elem.dayOfWeek.toLowerCase() == 'monday' ) {
            this.dataSource[j].days['monday'].clicked = 1;
            this.dataSource[j].days['monday'].text = 'Disponible';


          /*
            if (this.segu[0]!==null ) {
              if(this.segu[0]===0){
                console.log('datos');               
              }else{
                console.log('entre segundos : ' + this.segu[0]);
                this.dataSource[j].days['monday'].clicked = 2;
                this.dataSource[j].days['monday'].text = 'Disponible';
                this.segu[0] = 0;
                console.log('entre : '+ this.segu[0]);  
              }
            }else if (this.minus[0]!==null ){
              if (this.minus[0]===0) {
              }else{
                console.log('entre minutos');
                this.dataSource[j].days['monday'].clicked = 3;
                this.dataSource[j].days['monday'].text = 'Disponible';
                this.minus[0] = 0;
              }
            }else if (this.horas[0]!==null ){
              if (this.horas[0]===0) {
              }else{
                console.log('entre horas');
                this.horas[0] = this.horas[0] - 1;
                this.dataSource[j].days['monday'].clicked = 4;
                this.dataSource[j].days['monday'].text = 'Ocupado';
              }
            }
            */

            //horas
            if (this.horas[0]!==null && this.horas[0]!==0){

                console.log('entre horas :' + this.horas[0]);
                this.horas[0] = this.horas[0] - 1;
                this.dataSource[j].days['monday'].clicked = 4;
                this.dataSource[j].days['monday'].text = 'Ocupado';
              
              
            //minutos  
            }else if (this.minus[0]!==null && this.minus[0]!==0 ){
              
                console.log('entre minutos');
                this.dataSource[j].days['monday'].clicked = 3;
                this.dataSource[j].days['monday'].text = 'Disponible';
                this.minus[0] = 0;
              

            //segundos
            }else if (this.segu[0]!==null &&  this.segu[0]!==0) {

                console.log('entre segundos : ' + this.segu[0]);
                if (this.dataSource[j].days['monday'].clicked === 3 ){
                  this.dataSource[j].days['monday'].clicked = 3;
                }else{
                  this.dataSource[j].days['monday'].clicked = 2;
                }
                this.dataSource[j].days['monday'].text = 'Disponible';
                this.segu[0] = 0;
                console.log('entre : '+ this.segu[0]);  
            }


          }else  if (  elem.dayOfWeek.toLowerCase() == 'tuesday' ) {
            this.dataSource[j].days['tuesday'].clicked = 1;
            this.dataSource[j].days['tuesday'].text = 'Disponible';


            //horas
            if (this.horas[1]!==null && this.horas[1]!==0){

              console.log('entre horas :' + this.horas[1]);
              this.horas[1] = this.horas[1] - 1;
              this.dataSource[j].days['tuesday'].clicked = 4;
              this.dataSource[j].days['tuesday'].text = 'Ocupado';
            
            
          //minutos  
          }else if (this.minus[1]!==null && this.minus[1]!==0 ){
            
              console.log('entre minutos');
              this.dataSource[j].days['tuesday'].clicked = 3;
              this.dataSource[j].days['tuesday'].text = 'Disponible';
              this.minus[1] = 0;
            

          //segundos
          }else if (this.segu[1]!==null &&  this.segu[1]!==0) {

              console.log('entre segundos : ' + this.segu[1]);
              if (this.dataSource[j].days['tuesday'].clicked === 3 ){
                this.dataSource[j].days['tuesday'].clicked = 3;
              }else{
                this.dataSource[j].days['tuesday'].clicked = 2;
              }
              this.dataSource[j].days['tuesday'].text = 'Disponible';
              this.segu[1] = 0;
              console.log('entre : '+ this.segu[1]);  
          }


          }else  if (  elem.dayOfWeek.toLowerCase() == 'wednesday' ) {
            this.dataSource[j].days['wednesday'].clicked = 1;
            this.dataSource[j].days['wednesday'].text = 'Disponible';

            //horas
            if (this.horas[2]!==null && this.horas[2]!==0){

                console.log('entre horas :' + this.horas[2]);
                this.horas[2] = this.horas[2] - 1;
                this.dataSource[j].days['wednesday'].clicked = 4;
                this.dataSource[j].days['wednesday'].text = 'Ocupado';
              
              
            //minutos  
            }else if (this.minus[2]!==null && this.minus[2]!==0 ){
              
                console.log('entre minutos');
                this.dataSource[j].days['wednesday'].clicked = 3;
                this.dataSource[j].days['wednesday'].text = 'Disponible';
                this.minus[2] = 0;
              

            //segundos
            }else if (this.segu[2]!==null &&  this.segu[2]!==0) {

                console.log('entre segundos : ' + this.segu[2]);
                if (this.dataSource[j].days['wednesday'].clicked === 3 ){
                  this.dataSource[j].days['wednesday'].clicked = 3;
                }else{
                  this.dataSource[j].days['wednesday'].clicked = 2;
                }
                this.dataSource[j].days['wednesday'].text = 'Disponible';
                this.segu[2] = 0;
                console.log('entre : '+ this.segu[2]);  

            }


          }else  if (  elem.dayOfWeek.toLowerCase() == 'thursday' ) {
            this.dataSource[j].days['thursday'].clicked = 1;
            this.dataSource[j].days['thursday'].text = 'Disponible';

            //horas
            if (this.horas[3]!==null && this.horas[3]!==0){

              console.log('entre horas :' + this.horas[3]);
              this.horas[3] = this.horas[3] - 1;
              this.dataSource[j].days['thursday'].clicked = 4;
              this.dataSource[j].days['thursday'].text = 'Ocupado';
            
            
            //minutos  
            }else if (this.minus[3]!==null && this.minus[3]!==0 ){
              
                console.log('entre minutos');
                this.dataSource[j].days['thursday'].clicked = 3;
                this.dataSource[j].days['thursday'].text = 'Disponible';
                this.minus[3] = 0;
              

            //segundos
            }else if (this.segu[3]!==null &&  this.segu[3]!==0) {

                console.log('entre segundos : ' + this.segu[3]);
                if (this.dataSource[j].days['thursday'].clicked === 3 ){
                  this.dataSource[j].days['thursday'].clicked = 3;
                }else{
                  this.dataSource[j].days['thursday'].clicked = 2;
                }
                this.dataSource[j].days['thursday'].text = 'Disponible';
                this.segu[3] = 0;
                console.log('entre : '+ this.segu[3]);  

          }




          }else  if (  elem.dayOfWeek.toLowerCase() == 'friday' ) {
            this.dataSource[j].days['friday'].clicked = 1;
            this.dataSource[j].days['friday'].text = 'Disponible';


           //horas
           if (this.horas[4]!==null && this.horas[4]!==0){

            console.log('entre horas :' + this.horas[4]);
            this.horas[4] = this.horas[4] - 1;
            this.dataSource[j].days['friday'].clicked = 4;
            this.dataSource[j].days['friday'].text = 'Ocupado';
          
          
            //minutos  
            }else if (this.minus[4]!==null && this.minus[4]!==0 ){
              
                console.log('entre minutos');
                this.dataSource[j].days['friday'].clicked = 3;
                this.dataSource[j].days['friday'].text = 'Disponible';
                this.minus[4] = 0;
              

            //segundos
            }else if (this.segu[4]!==null &&  this.segu[4]!==0) {

                console.log('entre segundos : ' + this.segu[4]);
                if (this.dataSource[j].days['friday'].clicked === 3 ){
                  this.dataSource[j].days['friday'].clicked = 3;
                }else{
                  this.dataSource[j].days['friday'].clicked = 2;
                }
                this.dataSource[j].days['friday'].text = 'Disponible';
                this.segu[4] = 0;
                console.log('entre : '+ this.segu[4]);  

        }


          }else  if (  elem.dayOfWeek.toLowerCase() == 'saturday' ) {
            this.dataSource[j].days['saturday'].clicked = 1;
            this.dataSource[j].days['saturday'].text = 'Disponible';



            //horas
            if (this.horas[5]!==null && this.horas[5]!==0){

              console.log('entre horas :' + this.horas[5]);
              this.horas[5] = this.horas[5] - 1;
              this.dataSource[j].days['saturday'].clicked = 4;
              this.dataSource[j].days['saturday'].text = 'Ocupado';
            
              
            //minutos  
            }else if (this.minus[5]!==null && this.minus[5]!==0 ){
              
                console.log('entre minutos');
                this.dataSource[j].days['saturday'].clicked = 3;
                this.dataSource[j].days['saturday'].text = 'Disponible';
                this.minus[5] = 0;
              

            //segundos
            }else if (this.segu[5]!==null &&  this.segu[5]!==0) {

                console.log('entre segundos : ' + this.segu[5]);
                if (this.dataSource[j].days['saturday'].clicked === 3 ){
                  this.dataSource[j].days['saturday'].clicked = 3;
                }else{
                  this.dataSource[j].days['saturday'].clicked = 2;
                }
                this.dataSource[j].days['saturday'].text = 'Disponible';
                this.segu[5] = 0;
                console.log('entre : '+ this.segu[5]);  

            }





          }else  if (  elem.dayOfWeek.toLowerCase() == 'sunday' ) {
            this.dataSource[j].days['sunday'].clicked = 1;
            this.dataSource[j].days['sunday'].text = 'Disponible';

            //horas
            if (this.horas[6]!==null && this.horas[6]!==0){

              console.log('entre horas :' + this.horas[6]);
              this.horas[6] = this.horas[6] - 1;
              this.dataSource[j].days['sunday'].clicked = 4;
              this.dataSource[j].days['sunday'].text = 'Ocupado';
            
            
            //minutos  
            }else if (this.minus[6]!==null && this.minus[6]!==0 ){
              
                console.log('entre minutos');
                this.dataSource[j].days['sunday'].clicked = 3;
                this.dataSource[j].days['sunday'].text = 'Disponible';
                this.minus[6] = 0;
              

            //segundos
            }else if (this.segu[6]!==null &&  this.segu[6]!==0) {

                console.log('entre segundos : ' + this.segu[6]);
                if (this.dataSource[j].days['sunday'].clicked === 3 ){
                  this.dataSource[j].days['sunday'].clicked = 3;
                }else{
                  this.dataSource[j].days['sunday'].clicked = 2;
                }
                this.dataSource[j].days['sunday'].text = 'Disponible';
                this.segu[6] = 0;
                console.log('entre : '+ this.segu[6]);  

          }

          }    
        }
        console.log(this.dataSource);
      });

     /*
        for(var i = 0;i<this.dataSource.length;i++)
        {
          for(var j = 0;j<rpt.payload.availabilities.length;j++)
          {
            if(this.dataSource[i]['time'] === rpt.payload.availabilities[j]['time'] && rpt.payload.availabilities[j]['dayOfWeek']=="monday")
            {
              this.dataSource[i].days.monday.text = rpt.payload.availabilities[j]['state'];
              if(rpt.payload.availabilities[j]['state']=="Ocupado")
              {
                this.dataSource[i].days.monday.clicked = 1;
              }
              if(rpt.payload.availabilities[j]['state']=="Bloqueado")
              {
                this.dataSource[i].days.monday.clicked = 2;
              }
              if(rpt.payload.availabilities[j]['state']=="Disponible")
              {
                this.dataSource[i].days.monday.clicked = 3;
              }
            }
            if(this.dataSource[i]['time'] === rpt.payload.availabilities[j]['time'] && rpt.payload.availabilities[j]['dayOfWeek']=="tuesday")
            {
              this.dataSource[i].days.tuesday.text = rpt.payload.availabilities[j]['state'];
              if(rpt.payload.availabilities[j]['state']=="Ocupado")
              {
                this.dataSource[i].days.tuesday.clicked = 1;
              }
              if(rpt.payload.availabilities[j]['state']=="Bloqueado")
              {
                this.dataSource[i].days.tuesday.clicked = 2;
              }
              if(rpt.payload.availabilities[j]['state']=="Disponible")
              {
                this.dataSource[i].days.tuesday.clicked = 3;
              }
            }

            if(this.dataSource[i]['time'] === rpt.payload.availabilities[j]['time'] && rpt.payload.availabilities[j]['dayOfWeek']=="wednesday")
            {
              this.dataSource[i].days.wednesday.text = rpt.payload.availabilities[j]['state'];
              if(rpt.payload.availabilities[j]['state']=="Ocupado")
              {
                this.dataSource[i].days.wednesday.clicked = 1;
              }
              if(rpt.payload.availabilities[j]['state']=="Bloqueado")
              {
                this.dataSource[i].days.wednesday.clicked = 2;
              }
              if(rpt.payload.availabilities[j]['state']=="Disponible")
              {
                this.dataSource[i].days.wednesday.clicked = 3;
              }
            }

            
            if(this.dataSource[i]['time'] === rpt.payload.availabilities[j]['time'] && rpt.payload.availabilities[j]['dayOfWeek']=="thursday")
            {
              this.dataSource[i].days.thursday.text = rpt.payload.availabilities[j]['state'];
              if(rpt.payload.availabilities[j]['state']=="Ocupado")
              {
                this.dataSource[i].days.thursday.clicked = 1;
              }
              if(rpt.payload.availabilities[j]['state']=="Bloqueado")
              {
                this.dataSource[i].days.thursday.clicked = 2;
              }
              if(rpt.payload.availabilities[j]['state']=="Disponible")
              {
                this.dataSource[i].days.thursday.clicked = 3;
              }
            }

            if(this.dataSource[i]['time'] === rpt.payload.availabilities[j]['time'] && rpt.payload.availabilities[j]['dayOfWeek']=="friday")
            {
              this.dataSource[i].days.friday.text = rpt.payload.availabilities[j]['state'];
              if(rpt.payload.availabilities[j]['state']=="Ocupado")
              {
                this.dataSource[i].days.friday.clicked = 1;
              }
              if(rpt.payload.availabilities[j]['state']=="Bloqueado")
              {
                this.dataSource[i].days.friday.clicked = 2;
              }
              if(rpt.payload.availabilities[j]['state']=="Disponible")
              {
                this.dataSource[i].days.friday.clicked = 3;
              }
            }

            if(this.dataSource[i]['time'] === rpt.payload.availabilities[j]['time'] && rpt.payload.availabilities[j]['dayOfWeek']=="saturday")
            {
              this.dataSource[i].days.saturday.text = rpt.payload.availabilities[j]['state'];
              if(rpt.payload.availabilities[j]['state']=="Ocupado")
              {
                this.dataSource[i].days.saturday.clicked = 1;
              }
              if(rpt.payload.availabilities[j]['state']=="Bloqueado")
              {
                this.dataSource[i].days.saturday.clicked = 2;
              }
              if(rpt.payload.availabilities[j]['state']=="Disponible")
              {
                this.dataSource[i].days.saturday.clicked = 3;
              }
            }

            if(this.dataSource[i]['time'] === rpt.payload.availabilities[j]['time'] && rpt.payload.availabilities[j]['dayOfWeek']=="sunday")
            {
              this.dataSource[i].days.sunday.text = rpt.payload.availabilities[j]['state'];
              if(rpt.payload.availabilities[j]['state']=="Ocupado")
              {
                this.dataSource[i].days.sunday.clicked = 1;
              }
              if(rpt.payload.availabilities[j]['state']=="Bloqueado")
              {
                this.dataSource[i].days.sunday.clicked = 2;
              }
              if(rpt.payload.availabilities[j]['state']=="Disponible")
              {
                this.dataSource[i].days.sunday.clicked = 3;
              }
            }

          }
        }
      */
    })
    
  }

  goBackToModal() {
    this.router.navigate(['registro-de-servicios']);
  }

  handleClick(element: any, dayOfWeek: string) {
    element.days[dayOfWeek].clicked = (element.days[dayOfWeek].clicked % 3) + 1;
    var estado = "";
    if(element.days[dayOfWeek].clicked === 1)
    {
      element.days[dayOfWeek].text = "Ocupado - SERNANP"
      estado = "Ocupado";
    }
    if(element.days[dayOfWeek].clicked === 2)
    {
      element.days[dayOfWeek].text = "Bloqueado"
      estado = "Bloqueado";
    }
    if(element.days[dayOfWeek].clicked === 3)
    {
      element.days[dayOfWeek].text = "Disponible"
      estado = "Disponible";
    }
    this.save(dayOfWeek,element.time,estado,"SERNANP")
  }

}
