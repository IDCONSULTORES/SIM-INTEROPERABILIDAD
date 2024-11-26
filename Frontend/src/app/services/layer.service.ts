import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, Subject, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  private urlEtl = `${environment.etl}/layer`;
 
  private _refreshrequired = new Subject<void>();
  constructor(private http: HttpClient) { }

  get Refreshrequired() {
    return this._refreshrequired;
  }

  public getLayers(id:string): Observable<any> 
  {
    return this.http.get<any>(`${this.urlEtl}/${id}`);
  }

  public putLayers2(data:any, id:string) {
    return this.http.put<any>(`${this.urlEtl}/${id}`, data);
  }
}
