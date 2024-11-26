import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, Subject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private urlFile = `${environment.etl}/dashboard/`;
  private urlFile2 = `http://167.114.174.169:8400/api/dashboard/`;


  private _refreshrequired = new Subject<void>();
  constructor(private http: HttpClient) {}

  get Refreshrequired() {
    return this._refreshrequired;
  }

  public getDashboard(): Observable<any> {
    return this.http.get<any>(`${this.urlFile}`);
  }

  public getDashboardDate(strat:string,end:string): Observable<any> {
    return this.http.get<any>(`${this.urlFile}`+'from/'+`${strat}`+'/to/'+`${end}`);
  }
}
