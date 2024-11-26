import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastService } from '@services/toast.service';
import { ScheduleService } from '@services/schedule.service';
import { ComparisonService } from '@services/comparison.service';
import { AuthenticationService } from '@services/authentication.service';
import { UserService } from '@services/user.service';
@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.scss']
})
export class EditScheduleComponent implements OnInit {

  taskForm: FormGroup;
  userId = ""
  typeDB = ""
  loadingData = false
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditScheduleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastService:ToastService,
    private scheduleService:ScheduleService,
    private comparisionService:ComparisonService,
    private authService: AuthenticationService,
    private userService: UserService
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
      day: ['', [Validators.required]],
    });

  }
  tranformToString(date: string) {
    return new Date(date).toISOString().substring(0, 10);
  }
  ngOnInit(): void { 
    this.taskForm.patchValue({'synchroType':this.data.synchroType})
    this.taskForm.patchValue({'frequency':this.data.frequency})
    this.taskForm.patchValue({'email':this.data.createBy})
    this.taskForm.patchValue({'startDate':this.tranformToString(this.data.startDate)})
    this.taskForm.patchValue({'endDate':this.tranformToString(this.data.endDate)})
    this.taskForm.patchValue({'idWfs':this.data.idWfs})
    this.taskForm.patchValue({'percent':this.data.percent})
    this.taskForm.patchValue({'entityName':this.data.entityName})
    this.taskForm.patchValue({'day':this.data.day})
  }

  onSubmit() {
    var sincronizador = document.getElementById("sincronizador") as HTMLSelectElement;
    console.log(this.taskForm.value)
    if(sincronizador.value == "Programada")
    {
      if(this.taskForm.valid)
      {
        this.scheduleService.patchSchedule(this.data.ID,this.taskForm.value).subscribe({
          next: (rpt) => {
            this.toastService.showInfoToast("Programación registrada exitosamente")
            this.dialogRef.close(true);
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
              typeP:'register',
              typeDB:this.typeDB
            }
            
            this.comparisionService.postCompare(body).subscribe({
              next: (rpt3) => {
                this.loadingData = false
                this.toastService.showInfoToast("Registro actualizado exitosamente")
              },
              error: () => {
                this.loadingData = false
                this.toastService.showErrorToast("Algo salió mal")
              },
            })
          })
        })
      

    }

    

    


    
  }
  changeSelector()
  {
    var sincronizador = document.getElementById("sincronizador") as HTMLSelectElement;
    var frecuencia = document.getElementById("frecuencia") as HTMLSelectElement;
    var fin = document.getElementById("fin") as HTMLInputElement;
    var dia = document.getElementById("dia") as HTMLInputElement;
    if(sincronizador.value=="Inmediata")
    {
      frecuencia.disabled = true;
      fin.disabled = true;
      dia.disabled = true;
    }
    else
    {
      frecuencia.disabled = false;
      fin.disabled = false;
      dia.disabled = false;
    }
  }

}
