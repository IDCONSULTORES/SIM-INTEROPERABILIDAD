import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, Subject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {

  private urlFile = `${environment.etl}/compare`;
  private _refreshrequired = new Subject<void>();
  constructor(private http: HttpClient) {}

  get Refreshrequired() {
    return this._refreshrequired;
  }

  public getCompare(): Observable<any> {
    return this.http.get<any>(`${this.urlFile}/`);
  }

  public postCompare(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlFile}`, data).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
  }
}
