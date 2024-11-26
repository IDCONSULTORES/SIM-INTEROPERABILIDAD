import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from '@services/toast.service';
@Component({
  selector: 'app-modal-delete-permissions',
  templateUrl: './modal-delete-permissions.component.html',
  styleUrls: ['./modal-delete-permissions.component.scss'],
})
export class ModalDeletePermissionsComponent implements OnInit {
  deletePermissionForm: FormGroup;
  passwordType = 'password';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private toastService:ToastService,
    public dialogRef: MatDialogRef<ModalDeletePermissionsComponent>
  ) {
    this.deletePermissionForm = this.formBuilder.group({
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  tooglePasswordInput() {
    if (this.passwordType === 'text') this.passwordType = 'password';
    else this.passwordType = 'text';
  }

  saveForm() {
    
    if (this.deletePermissionForm.valid) {
      const formData = this.deletePermissionForm.value;
      console.log('FORM DATA', formData)
      if (formData.password == 'securePassword'){
        this.dialogRef.close(this.data)
      }else{
        this.toastService.showErrorToast('Contraseña incorrecta. Escriba la contraseña de administrador')
      }
      
    };
  }
}
