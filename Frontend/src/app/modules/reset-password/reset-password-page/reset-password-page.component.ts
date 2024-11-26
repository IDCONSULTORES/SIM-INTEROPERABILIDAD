import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';
import { UserService } from '@services/user.service';
import { ToastService } from '@services/toast.service';

@Component({
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss'],
})
export class ResetPasswordPageComponent implements OnInit {
  public formLogin: FormGroup;
  public showError = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private userService:UserService,
    private toastService:ToastService
  ) {
    const authValue = this.authService.currentUserValue;
    if (authValue) {
      this.router.navigate(['/registro-de-servicios']);
    }
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      //password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    
    this.userService.resetPassword(this.formLogin.value).subscribe({
      next:(rpt) => {this.toastService.showInfoToast("Información actualizada correctamente")},
      error:() => {this.toastService.showErrorToast("Algo salió mal")}
    })
  }
  go_access() {
    this.router.navigate(['registro-de-servicios']);
  }
  resetPassword() {
    if (this.formLogin.invalid) {
      this.showError = true;
      return;
    }
    this.authService.login(this.formLogin.value).subscribe({
      next: (response) => {
        this.router.navigate(['registro-de-servicios']);
      },
      error: () => {
        this.showError = true;
        console.log('Invalid credentials');
      },
    });
  }
}
