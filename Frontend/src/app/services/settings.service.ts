import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, Subject, tap, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private urlEtl = `${environment.etl}/db`;
  private _refreshrequired = new Subject<void>();
  constructor(private http: HttpClient) { }
  get Refreshrequired() {
    return this._refreshrequired;
  }
  public postSettings(data:any): Observable<any> 
  {
    return this.http.post<any>(`${this.urlEtl}`, data);
  }
  public getSettings(): Observable<any> 
  {
    return this.http.get<any>(`${this.urlEtl}`);
  }

}
