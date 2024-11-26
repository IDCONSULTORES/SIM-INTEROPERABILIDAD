import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, Subject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private urlFile = `${environment.etl}/schedule`;
  private _refreshrequired = new Subject<void>();
  constructor(private http: HttpClient) {}

  get Refreshrequired() {
    return this._refreshrequired;
  }

  public getSchedule(): Observable<any> {
    return this.http.get<any>(`${this.urlFile}`);
  }

  public postSchedule(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlFile}/`, data).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
  }

  public deleteSchedule(id:string): Observable<any> {
    return this.http.delete<any>(`${this.urlFile}/${id}/`);
  }
  public patchSchedule(id:string ,data: any): Observable<any> {
    return this.http.put<any>(`${this.urlFile}/${id}/`, data).pipe(
      tap(() => {
        this.Refreshrequired.next();
      })
    );
  }
}
