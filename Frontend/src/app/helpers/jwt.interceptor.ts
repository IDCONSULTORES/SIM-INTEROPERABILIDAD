import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const { url = '' } = request;
    if (!url.includes('/api/users/verify') || !url.includes('/refresh')) {
      const currentUser = this.authenticationService.currentUserValue;
      const auth_token = localStorage.getItem('auth_token');
      if (currentUser?.access_token || auth_token) {
        const token = auth_token ? `Bearer ${auth_token}` : `Bearer ${currentUser.access_token}`;
        if (request.method === 'POST' && url.includes('/api/files')) {
          request = request.clone({
            setHeaders: { Authorization: token },
          });
        } else {
          request = request.clone({
            setHeaders: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          });
        }
      }
    }
    return next.handle(request);
  }
}
