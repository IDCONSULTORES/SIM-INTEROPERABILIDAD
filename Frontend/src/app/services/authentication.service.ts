import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserQuery } from '../store/user.query';
import { UserStore } from '../store/user.store';
import { environment } from 'src/environments/environment';
import { Credentials } from '../models/Credentials';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject;
  public currentUser: Observable<any>;
  constructor(
    private http: HttpClient,
    private router: Router,
    private userQuery: UserQuery,
    private userStore: UserStore
  ) {
    const access_token = localStorage.getItem('access_token') || '';
    const refresh_token = localStorage.getItem('refresh_token') || '';
    const data = access_token ? { access_token, refresh_token } : null;
    this.currentUserSubject = new BehaviorSubject<Credentials | null>(data);
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public login(data:any) {
    return this.http.post<any>(`${environment.auth}/users/login`, data).pipe(
      map((response: any) => {
        const user = response.payload;
        console.log(user);
        localStorage.setItem('access_token', user.access_token);
        localStorage.setItem('refresh_token', user.refresh_token);
        this.currentUserSubject.next(user);
        return user;
      })
    );
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  public logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.currentUserSubject.next(null);
    this.userStore.reset();
    this.router.navigate(['/']);
  }
  public refreshToken() {
    const refresh_token = localStorage.getItem('refresh_token');
    return this.http.post(`${environment.auth}/users/refresh`, { token: refresh_token }).pipe(
      map((response: any) => {
        const token = response.payload;
        localStorage.setItem('access_token', token);
        const currentUserSubjectValue = this.currentUserSubject.value;
        this.currentUserSubject.next({ ...currentUserSubjectValue });
        return token;
      })
    );
  }
  public verify(data:any)
  {
    return this.http.post(`${environment.auth}/users/verify`, data);
  }
}
