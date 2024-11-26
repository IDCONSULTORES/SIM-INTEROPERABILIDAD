import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '@services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formLogin: FormGroup;
  public showError = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) {
    const authValue = this.authService.currentUserValue;
    if (authValue) {
      this.router.navigate(['/registro-de-servicios']);
    }
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}
  onSubmit() {}
  go_access() {
    this.router.navigate(['registro-de-servicios']);
  }
  login() {
    console.log(this.formLogin.value);
    if (this.formLogin.invalid) {
      this.showError = true;
      return;
    }
    this.authService.login(this.formLogin.value).subscribe({
      next: (response) => {
        console.log(response);

        this.router.navigate(['registro-de-servicios']);
      },
      error: () => {
        this.showError = true;
        console.log('Invalid credentials');
      },
    });
  }
}
