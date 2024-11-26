import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, Subject, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvertService {

  private urlEtl = `${environment.etl}/convert`;
  private _refreshrequired = new Subject<void>();
  constructor(private http: HttpClient) { }
  public postConversion(data:any): Observable<any> 
  {
    return this.http.post<any>(`${this.urlEtl}`, data);
  }
}
