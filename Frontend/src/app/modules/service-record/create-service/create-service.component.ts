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
import { InstitutionDialogComponent } from '../institution-dialog/institution-dialog.component';
export interface ServiceData {
  isEditMode: boolean;
  wfs:any;
}

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss'],
})
export class CreateServiceComponent implements OnInit {
  serviceForm: FormGroup;
  isEditMode: boolean;
  userId = ""
  typeDB = ""
  institution = ""
  response = false
  fuente = ""
  list_of_availabilities:any = []
  public loadingData = false;
  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CreateServiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceData,
    private router: Router,
    private wfsService:WfsService,
    private toastService:ToastService,
    private authService:AuthenticationService,
    private dialog: MatDialog,
    private comparisonService:ComparisonService,
    private userService:UserService
  ) {

    this.isEditMode = !!data?.isEditMode;
    this.serviceForm = this.formBuilder.group({
      url: ['', [Validators.required]],
      availabilities: [],
      periodicity: ['Diaria',[Validators.required]],
      email: ['', [Validators.required]],
      name: ['', [Validators.required]],
      service: ['', [Validators.required]],
      institution: ['', [Validators.required]]
    });

    this.authService.verify({token: this.authService.currentUserValue.access_token}).subscribe((rpt:any) => {
      this.userId = rpt.payload.id;
      this.serviceForm.patchValue({email: rpt.payload.email})
      this.userService.getUser(this.userId).subscribe((rpt2:any) => {
        this.institution = rpt2.payload.user[0].institution.name;
        this.serviceForm.patchValue({'institution':this.institution})
      })
    })
  }

  ngOnInit(): void {

    console.log(this.data)
    if(this.data.isEditMode == true)
    {
      this.serviceForm.patchValue({'name':this.data.wfs.name})
      this.serviceForm.patchValue({'url':this.data.wfs.url})
      this.serviceForm.patchValue({'service':this.data.wfs.service})
      this.serviceForm.patchValue({'institution':this.data.wfs.source})
      var periodicidad = document.getElementById('periodicidad') as HTMLInputElement;
      periodicidad.value = this.data.wfs.periodicity
      var periodicidad = document.getElementById('periodicidad') as HTMLInputElement;
      periodicidad.value = this.data.wfs.periodicity
      var sistema_referencia = document.getElementById('sistema_referencia') as HTMLInputElement;
      sistema_referencia.value = this.data.wfs.referencia
      var version = document.getElementById('version') as HTMLSelectElement;
      version.value = this.data.wfs.version
    }

  }
  obtenerFuenteDesdeURL(url: string) {
    var fuente = ""
    if (fuente === '') {
      try {
        const matches = url.match(/\.(.*?).gob|.gov/);
        if (matches) {
          fuente = matches[1].toUpperCase();
          return fuente;
        }
      } catch (error) {
        try {
          const matches = url.match(/\.(.*?).gov/);
          if (matches) {
            fuente = matches[1].toUpperCase();
            return fuente;
          }
        } catch (error) {
          try {
            const matches = url.match(/\/\/(.*?)\/geo/i);
            if (matches) {
              fuente = matches[1];
              return fuente;
            }
          } catch (error) {
            fuente = '';
            return fuente;
          }
        }
      }
    }
    return fuente;
  }

  onSubmit() {
    if(this.data.isEditMode==false)
    {
      this.serviceForm.patchValue({'availabilities':this.list_of_availabilities})
      console.log(this.serviceForm.value)
      
      
      if(this.serviceForm.valid)
      {
        var institucion = document.getElementById('institucion') as HTMLInputElement
        this.authService.verify({token: this.authService.currentUserValue.access_token}).subscribe((rpt:any) => {
          this.userId = rpt.payload.id;
          var url = this.serviceForm.controls['url'].value
          this.userService.getUser(this.userId).subscribe((rpt2:any) => {
            this.institution = rpt2.payload.user[0].institution.name;
            console.log(this.institution)
            this.fuente = this.obtenerFuenteDesdeURL(url)
            console.log(this.fuente)
            if(this.institution == institucion.value && this.fuente==this.institution)
            {
              this.loadingData = true
              this.wfsService.postWFS(this.serviceForm.value).subscribe({
                next: (rpt) => {
                  this.loadingData = false
                  this.toastService.showInfoToast("WFS registrado exitosamente")
                },
                error: () => {
                  this.loadingData = false
                  this.toastService.showErrorToast("Algo salió mal")
                },
              })
            }else
            {
              this.institutionDialog();

            }
          })
        })

      }
      else
      {
        this.toastService.showWarningToast("Completar todos los datos")
      }
      
    }
    else
    {
      console.log(this.userId)
      var percentage = 0;
      if(this.data['wfs']['percent']==null)
      {
        percentage = 0
      }
      else
      {
        percentage = this.data['wfs']['percent']
      }
      this.authService.verify({token: this.authService.currentUserValue.access_token}).subscribe((rpt:any) => {
        this.loadingData = true
        this.userId = rpt.payload.id;
        this.userService.getUser(this.userId).subscribe((rpt2:any) => {
          console.log(rpt2)
          this.typeDB = rpt2.payload.user[0].dataBases[0]['typeServer']
          console.log(this.typeDB)
          var body = {
            url: this.serviceForm.value['url'],
            percent: percentage,
            email:this.serviceForm.value['email'],
            typeP:'register',
            typeDB:this.typeDB
          }
          
          this.comparisonService.postCompare(body).subscribe({
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

  showAvailability() {
    this.dialogRef.close();
    this.router.navigate(['/disponibilidad']);
  }
  institutionDialog() {
    const dialog = this.dialog.open(InstitutionDialogComponent, {
      width: '450px',
      height: '420px',
      panelClass: ['dialog-no-padding', 'general-modal'],

    });
    dialog.afterClosed().subscribe((rpt) => {
      this.response=rpt
      console.log(this.response)
      console.log(this.response)
      if(this.response==true)
      {
        this.loadingData = true
        this.wfsService.postWFS(this.serviceForm.value).subscribe({
          next: (rpt) => {
            this.loadingData = false
            this.toastService.showInfoToast("WFS registrado exitosamente")
          },
          error: () => {
            this.loadingData = false
            this.toastService.showErrorToast("Algo salió mal")
          },
        })
      }
      else
      {

      }
    });
  }
  openAvailability()
  {
    let dialog = this.dialog.open(AvailabilityDialogComponent, {
      width: '620px',
      height: '600px',
      panelClass: ['dialog-no-padding', 'general-modal'],
      data: {

      },
    });
    dialog.afterClosed().subscribe((rpt) => {
      if(rpt)
      {
        this.list_of_availabilities = rpt

        console.log(this.list_of_availabilities);
        
      }
    });
  }
}
