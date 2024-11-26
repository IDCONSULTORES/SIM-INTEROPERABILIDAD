import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '@services/authentication.service';
import { UserService } from '@services/user.service';
import { ToastService } from '@services/toast.service';
@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
})
export class ChangePasswordModalComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService:AuthenticationService,
    private userService:UserService,
    private toastService:ToastService
  ) {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      accessToken: this.authService.currentUserValue.access_token
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const formValue = this.changePasswordForm.value;
      this.userService.changePassword(formValue).subscribe({
        next: (rpt) => {
          this.toastService.showInfoToast("Contraseña cambiada correctamente")
        },
        error: () => {
          this.toastService.showErrorToast("Algo salió mal")
        },
      })
    }
    else
    {
      this.toastService.showWarningToast("Completar los datos")
    }
  }

  get actualPassword() {
    return this.changePasswordForm.get('actualPassword');
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }
}
