import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthenticationService } from '@services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.log('error 401! Token should be refreshed');
          return this.authenticationService.refreshToken().pipe(
            switchMap((token) => {
              // Update the original request with the new token
              //const token = localStorage.getItem('access_token');
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`,
                },
                body: {
                  ...request.body,
                  token,
                },
              });
              // Retry the request with the new token
              return next.handle(newRequest);
            }),
            catchError(() => {
              // If refreshing the token fails, log the user out
              this.authenticationService.logout();
              return throwError(() => new Error('Unable to verify token'));
            })
          );
        }
        if (error.status === 403) {
          return throwError(() => new Error('You are not allowed'));
        }
        return throwError(() => new Error(error));
      })
    );
  }
}
