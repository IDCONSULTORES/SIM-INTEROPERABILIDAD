import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, Subject, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  private urlEtl = `${environment.etl}/availability/`;
  private _refreshrequired = new Subject<void>();
  constructor(private http: HttpClient) { }
  get Refreshrequired() {
    return this._refreshrequired;
  }
  public postAvailability(data:any): Observable<any> 
  {
    return this.http.post<any>(`${this.urlEtl}`, data);
  }
  public getAvailability(): Observable<any> 
  {
    return this.http.get<any>(`${this.urlEtl}`);
  }
  public getAvailabilityByInstitution(data:any, id:string): Observable<any> 
  {
    return this.http.get<any>(`${this.urlEtl}institution/${id}`,data);
  }
}
