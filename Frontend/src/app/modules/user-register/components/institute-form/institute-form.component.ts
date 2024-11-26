import { Component, OnInit } from '@angular/core';
import { ToastService } from '@services/toast.service';
import { UserService } from '@services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Observable, audit, forkJoin } from 'rxjs';
import { FileService } from '@services/file.service';
@Component({
  selector: 'app-institute-form',
  templateUrl: './institute-form.component.html',
  styleUrls: ['./institute-form.component.scss'],
})
export class InstituteFormComponent implements OnInit {
  uploadPhoto = false;
  public userForm: FormGroup;
  public mainFileAsBlob: any = null;
  showPassword: boolean = false;
  showPassword2: boolean = false;
  constructor(private toastService:ToastService, private userService:UserService,private formBuilder: FormBuilder,
    private fileService:FileService) {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      name: ['', [Validators.required]],
      region: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      lastNames: '-',
      password: ['', [Validators.required, , this.validarContrasena]],
      confirmPassword: ['', [Validators.required, , this.validarContrasena]],
      identificationNumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
      identificationType: ['', [Validators.required]],
      institutionType: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {}
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  togglePasswordVisibility2() {
    this.showPassword2 = !this.showPassword2;
  }
  onSubmit()
  {
    if(this.userForm.valid)
    {
        console.log(this.mainFileAsBlob)
        var data = {...this.userForm.value, type:"institution" }
        console.log(data)

        const mainFileObservable = this.parseMainFile();
        const observables = [mainFileObservable];
        if(this.mainFileAsBlob)
        {
          forkJoin(observables).subscribe((results: any[]) => {
            if (this.mainFileAsBlob) {
              const photoId = results[0].id;
              data = { ...data, photoId };
            }
            this.userService.postUser(data).subscribe({
              next: (rpt) => {
                this.toastService.showInfoToast("Usuario registrado exitosamente")
              },
              error: () => {
                this.toastService.showErrorToast("Algo salió mal")
              },
            })

          });
        }
        else{
          this.userService.postUser(data).subscribe({
            next: (rpt) => {
              this.toastService.showInfoToast("Usuario registrado exitosamente")
            },
            error: () => {
              this.toastService.showErrorToast("Algo salió mal")
            },
          })
        }
    }
    else
    {
      this.toastService.showWarningToast("Complete todo los campos")
    }
    
    

  }

  showUploadPhoto() {
    this.uploadPhoto = !this.uploadPhoto;
    console.log(this.uploadPhoto)
  }
  parseMainFile() {
    if (this.mainFileAsBlob) {
      const mainForm = new FormData();
      const { file, name } = this.mainFileAsBlob;
      mainForm.append('name', name);
      mainForm.append('file', file);
      return this.fileService.postFile(mainForm);
    }
    return null;
  }
  catchPhoto(photo:any)
  {
    
    console.log(photo)
    this.mainFileAsBlob = photo;    
    this.uploadPhoto = false;
    
  }

  validarContrasena(control: AbstractControl) {
    const contrasena = control.value;
    const pattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/;
    
    if (pattern.test(contrasena) && contrasena.length >= 8) {
      return null; // La contraseña es válida
    } else {
      return { invalidPassword: true }; // La contraseña es inválida
    }
  }
}