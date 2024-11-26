import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, Subject, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  //private urlEtl = `${environment.etl}/logs/`;
  private urlEtl = `${environment.etl}/logs`;
  private _refreshrequired = new Subject<void>();
  constructor(private http: HttpClient) { }
  public getLogs(): Observable<any> 
  {
    return this.http.get<any>(`${this.urlEtl}`);
  }
}