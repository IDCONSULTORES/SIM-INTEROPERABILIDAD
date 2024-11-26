import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@services/settings.service';
import { UserService } from '@services/user.service';
import { AuthenticationService } from '@services/authentication.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastService } from '@services/toast.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  isEditMode = false;
  settingForm: FormGroup;
  plataforma = ""
  destino = ""
  puerto = ""
  usuario = ""
  contraseña = ""
  bd = ""
  showPassword: boolean = false;
  showPassword2: boolean = false;
  constructor(private userService: UserService, private toastService:ToastService, private settingService:SettingsService,
     private formBuilder: FormBuilder, private authService:AuthenticationService) {

        
    this.settingForm = this.formBuilder.group({
      name_server: [0, [Validators.required]],
      psswd_server: ['', [Validators.required, this.validarContrasena]],
      server_type: ['',[Validators.required]],
      user_db: ['', [Validators.required]],
      port: ['', [Validators.required]],
      database_name: ['', [Validators.required]],
      idUser: ['', [Validators.required]],
    });

    this.authService.verify({token: this.authService.currentUserValue.access_token}).subscribe((rpt:any) => {
      localStorage.setItem("id", rpt.payload.id)
      var id_user = localStorage.getItem("id") || "";
      console.log(id_user)
      this.settingForm.patchValue({'idUser':id_user})
      this.userService.getUser(id_user).subscribe(rpt=>{
        console.log(rpt.payload.user[0]['dataBases'])

        const databasesWithLastRegis1 = rpt.payload.user[0]['dataBases'].filter((db: { [x: string]: number; }) => db['last_regis'] === 1);
        console.log('DB', databasesWithLastRegis1)
        this.plataforma = databasesWithLastRegis1[0]['databaseName']
        this.destino = databasesWithLastRegis1[0]['domain']
        this.puerto = databasesWithLastRegis1[0]['port']
        this.usuario = databasesWithLastRegis1[0]['userDB']
        this.contraseña = databasesWithLastRegis1[0]['password']
        this.bd = databasesWithLastRegis1[0]['typeServer']
      })
    })


  }

  onSubmit()
  {
    if(this.settingForm.valid)
    {
      this.settingService.postSettings(this.settingForm.value).subscribe({
        next: (rpt) => {
          this.toastService.showInfoToast("Configuración guardada exitosamente")
        },
        error: () => {
          this.toastService.showErrorToast("Algo salió mal")
        },
      })
    }
    else
    {
      this.toastService.showWarningToast("Ingresar datos correctamente")
    }

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
  ngOnInit(): void {}
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  togglePasswordVisibility2() {
    this.showPassword2 = !this.showPassword2;
  }
}
