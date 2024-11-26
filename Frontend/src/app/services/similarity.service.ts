import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, Subject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimilarityService {

  private urlFile = `${environment.etl}/similarity`;
  private _refreshrequired = new Subject<void>();
  constructor(private http: HttpClient) {}

  get Refreshrequired() {
    return this._refreshrequired;
  }

  public getSimilarity(): Observable<any> {
    return this.http.get<any>(`${this.urlFile}`);
  }
}
