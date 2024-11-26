import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, Subject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WfsService {

  private urlFile = `${environment.etl}/wfs`;
  private _refreshrequired = new Subject<void>();
  constructor(private http: HttpClient) {}

  get Refreshrequired() {
    return this._refreshrequired;
  }
  public postWFS(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlFile}`, data).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
  }
  public deleteWFS(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlFile}/${id}`);
  }
  public getWFS(): Observable<any> {
    return this.http.get<any>(`${this.urlFile}`);
  }

  public getWFSbyInstitution(institution:string): Observable<any> {
    return this.http.get<any>(`${this.urlFile}/institution/${institution}`);
  }
  public getWFSFile(file:string): Observable<any> {
    return this.http.get<any>(`${this.urlFile}/files/${file}`);
  }

  public insertWFS(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlFile}/insert/`, data).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
  }
}
