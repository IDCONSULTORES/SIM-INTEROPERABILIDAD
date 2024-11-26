import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private urlFile = `${environment.api}/files`;
  constructor(private http: HttpClient) {}
  public postFile(data: FormData): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'multipart/form-data');
    return this.http
      .post<any>(`${this.urlFile}/`, data, { headers: headers })
      .pipe(map((res) => res.payload));
  }
  public deleteFile(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlFile}/${id}`);
  }

  
}
