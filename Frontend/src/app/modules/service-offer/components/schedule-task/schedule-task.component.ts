import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastService } from '@services/toast.service';
import { ScheduleService } from '@services/schedule.service';
import { ComparisonService } from '@services/comparison.service';
import { AuthenticationService } from '@services/authentication.service';
import { UserService } from '@services/user.service';
import { WfsService } from '@services/wfs.service';
@Component({
  selector: 'app-schedule-task',
  templateUrl: './schedule-task.component.html',
  styleUrls: ['./schedule-task.component.scss'],
})
export class ScheduleTaskComponent implements OnInit {
  taskForm: FormGroup;
  userId = ""
  typeDB = ""
  loadingData = false
  days:any = []
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ScheduleTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastService:ToastService,
    private scheduleService:ScheduleService,
    private comparisionService:ComparisonService,
    private authService: AuthenticationService,
    private userService: UserService,
    private wfsService:WfsService,
  ) {
    console.log(this.data);
    this.taskForm = this.formBuilder.group({
      synchroType:['', [Validators.required]],
      frequency: ['', [Validators.required]],
      email: [this.data.createBy, [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      idWfs: [this.data.id, [Validators.required]],
      percent: [0, [Validators.required]],
      entityName: [this.data.source, [Validators.required]],
      day:['', [Validators.required]]
    });
    this.taskForm.controls['startDate'].valueChanges.subscribe(() => {
      this.validarFechas();
    });

    this.taskForm.controls['endDate'].valueChanges.subscribe(() => {
      this.validarFechas();
    });
  }

  ngOnInit(): void {
    this.days = this.data.availability;
    console.log(this.days)
   }

  onSubmit() {
    var sincronizador = document.getElementById("sincronizador") as HTMLSelectElement;
    console.log(this.taskForm)
    if(this.taskForm.valid)
    {
      if(sincronizador.value == "Programada")
    {
      if(this.taskForm.valid)
      {
        this.loadingData = true
        this.scheduleService.postSchedule(this.taskForm.value).subscribe({
          next: (rpt) => {
            this.toastService.showInfoToast("Programación registrada exitosamente")
            this.dialogRef.close();
          },
          error: () => {
            this.toastService.showErrorToast("Algo salió mal")
          },
        })
      }
      else
      {
        this.toastService.showWarningToast("Complete todos los datos")
      }
    }

    if(sincronizador.value == "Inmediata")
    {
      this.loadingData = true
      this.authService.verify({token: this.authService.currentUserValue.access_token}).subscribe((rpt:any) => {
        
        this.userId = rpt.payload.id;
        this.userService.getUser(this.userId).subscribe((rpt2:any) => {
          console.log(rpt2)
          this.typeDB = rpt2.payload.user[0].dataBases[0]['typeServer']
          console.log(this.typeDB)
          var body = {
            url: this.data.url,
            percent: this.taskForm.value['percent'],
            email:this.taskForm.value['email'],
            typeP:'prog',
            typeDB:this.typeDB
          }
          
          if (this.taskForm.value['percent'] != 110){
            this.comparisionService.postCompare(body).subscribe({
              next: (rpt3) => {
                console.log('rpt3', rpt3)
                if(rpt3.hasOwnProperty('drop')){
                  console.log('DATA WFS', rpt3.data)
                  this.wfsService.insertWFS(rpt3.data).subscribe({
                    next: (rpt4) => {
                      this.loadingData = false
                      this.toastService.showInfoToast('Se cargó la capa exitosamente')
                    },
                    error:() => {
                      this.loadingData = false
                      this.toastService.showErrorToast('Algo salió mal')
                    }
                  })
                }
                else{
                  this.loadingData = false
                  this.toastService.showInfoToast("Registro actualizado exitosamente")
                }
              },
              error: () => {
                this.loadingData = false
                this.toastService.showErrorToast("Algo salió mal")
              },
            })
          }
        })
      })
 
    }

    
    }
    else
    {
      this.toastService.showWarningToast("Complete todos los datos")
    }
    

    


    
  }

  formatDate(val: string): string {
    if (val != null) {
      const parts = val.split('T')[0];
      const newPart = parts.split('-');
      return `${newPart[2]}/${newPart[1]}/${newPart[0]}`;
    } else {
      return '';
    }
  }
  changeSelector()
  {
    var sincronizador = document.getElementById("sincronizador") as HTMLSelectElement;
    var frecuencia = document.getElementById("frecuencia") as HTMLSelectElement;
    var fin = document.getElementById("fin") as HTMLInputElement;
    var dia = document.getElementById("dia") as HTMLInputElement;
    var hoy = new Date()
    if(sincronizador.value=="Inmediata")
    {
      frecuencia.disabled = true;
      fin.disabled = true;
      dia.disabled = true;
      fin.value = hoy.toISOString().split('T')[0];
      dia.value = "Monday"
      frecuencia.value = "daily"
      this.taskForm.controls['endDate'].setValue(fin.value)
      this.taskForm.controls['day'].setValue(dia.value)
      this.taskForm.controls['frequency'].setValue(frecuencia.value)
    }
    else
    {
      frecuencia.disabled = false;
      fin.disabled = false;
      dia.disabled = false;
    }
  }

  validarFechas() {
    const fechaInicio = this.taskForm.controls['startDate'].value;
    const fechaFin = this.taskForm.controls['endDate'].value;

    if (fechaInicio > fechaFin) {
      this.taskForm.controls['startDate'].setErrors({ 'fechaInvalida': true });
    } else {
      this.taskForm.controls['startDate'].setErrors(null);
    }
  }
}
