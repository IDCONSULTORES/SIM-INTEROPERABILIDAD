import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { WfsService } from '@services/wfs.service';
import { ToastService } from '@services/toast.service';
import { DemandService } from '@services/demand.service';
import { ScheduleService } from '@services/schedule.service';
import { ComparisonService } from '@services/comparison.service';
import { AuthenticationService } from '@services/authentication.service';
import { UserService } from '@services/user.service';
export interface DataGeneralModal {
  imagePath: string;
  imageAlt: string;
  title: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  hasCloseButton: boolean;
  id:string;
  data:any;
}

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.scss'],
})
export class MessageModalComponent implements OnInit {
  userId = ""
  typeDB = ""
  loadingData = false
  constructor(
    public dialogRef: MatDialogRef<MessageModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataGeneralModal,
    private wfsService:WfsService, private toastService:ToastService,
    private demandService:DemandService,
    private scheduleService:ScheduleService,
    private compareService:ComparisonService,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {console.log(this.data)}

  closeModalWithButton(data:any) {
    this.dialogRef.close(data);
  }

  compare()
  {
    this.authService.verify({token: this.authService.currentUserValue.access_token}).subscribe((rpt:any) => {
        
      this.userId = rpt.payload.id;
      this.userService.getUser(this.userId).subscribe((rpt2:any) => {
        console.log(rpt2)
        this.typeDB = rpt2.payload.user[0].dataBases[0]['typeServer']
        console.log(this.typeDB)
        var body = {
          url: this.data.data.url,
          percent: this.data.data.percent,
          email:this.data.data.createBy,
          typeP:'register',
          typeDB:this.typeDB
        }
        
        this.compareService.postCompare(body).subscribe({
          next: (rpt3) => {
            this.loadingData = false
            this.toastService.showInfoToast("Comparativa realizada exitosamente")
          },
          error: () => {
            this.loadingData = false
            this.toastService.showErrorToast("Algo salió mal")
          },
        })
      })
    })
  }
  deleteService()
  {
    this.wfsService.deleteWFS(this.data.id).subscribe({
      next: (rpt) => {
        this.toastService.showInfoToast("Se eliminó el registro correctamente")
      },
      error: () => {
        this.toastService.showErrorToast("Algo salió mal")
      },
    })
  }
  deleteSchedule()
  {
    this.scheduleService.deleteSchedule(this.data.id).subscribe({
      next: (rpt) => {
        this.toastService.showInfoToast("Se eliminó la programación correctamente")
      },
      error: () => {
        this.toastService.showErrorToast("Algo salió mal")
      },
    })
  }
  actions()
  {
    if(this.data.title == "Eliminar Servicio")
    {
      this.deleteService()
      this.closeModalWithButton('Eliminado');
    }
    if(this.data.title == "CORRECTO")
    {
      this.closeModalWithButton(true);
      this.demandService.tab = true;
      this.compare()
    }
    if(this.data.title == "Eliminar programación WFS")
    {
      this.deleteSchedule();
      this.dialogRef.close(true);
    }
  }
  secondaryAction()
  {
    if(this.data.title == "CORRECTO")
    {
      this.closeModalWithButton(false);
      this.demandService.tab = false;
    }
    else
    {
      this.closeModalWithButton(false);
    }
  }
}
