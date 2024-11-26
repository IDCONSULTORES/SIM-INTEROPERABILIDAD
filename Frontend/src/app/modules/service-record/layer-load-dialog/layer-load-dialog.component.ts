import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WfsService } from '@services/wfs.service';
import { ToastService } from '@services/toast.service';
import { AuthenticationService } from '@services/authentication.service';
import { AvailabilityDialogComponent } from '../availability-dialog/availability-dialog.component';
import { ComparisonService } from '@services/comparison.service';
import { UserService } from '@services/user.service';
export interface ServiceData {
  isEditMode: boolean;
  wfs:any;
}
@Component({
  selector: 'app-layer-load-dialog',
  templateUrl: './layer-load-dialog.component.html',
  styleUrls: ['./layer-load-dialog.component.scss']
})
export class LayerLoadDialogComponent implements OnInit {
  userId = ""
  typeDB = ""
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LayerLoadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceData,
    private router: Router,
    private wfsService:WfsService,
    private toastService:ToastService,
    private authService:AuthenticationService,
    private dialog: MatDialog,
    private comparisonService:ComparisonService,
    private userService:UserService) { 

    }

  ngOnInit(): void {
    console.log(this.data)
  }
  load()
  {
    this.authService.verify({token: this.authService.currentUserValue.access_token}).subscribe((rpt:any) => {
      this.userId = rpt.payload.id;
      this.userService.getUser(this.userId).subscribe((rpt2:any) => {
        console.log(rpt2)
        this.typeDB = rpt2.payload.user[0].dataBases[0]['typeServer']
        console.log(this.typeDB)
        var body = {
          idWfs: this.data.wfs.id,
          typeDb: this.typeDB
        }
        console.log(body)
        this.wfsService.insertWFS(body).subscribe({
          next: (rpt3) => {
            this.toastService.showInfoToast('Se cargó la capa exitosamente')
          },
          error:() => {
            this.toastService.showErrorToast('Algo salió mal')
          }
        })
      })
    })

  }

}
