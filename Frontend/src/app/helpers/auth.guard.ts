import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) {
      this.authenticationService.logout();
      this.router.navigate(['/']);
    }
    return true;
  }
}
