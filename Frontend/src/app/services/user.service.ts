import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable, Subject, tap, map, forkJoin, mergeMap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private urlUser = `${environment.api}/users`;
  private auth = `${environment.auth}/users`;
  private etl = `${environment.etl}/users`;
  private _refreshrequired = new Subject<void>();
  constructor(private http: HttpClient) {}
  get Refreshrequired() {
    return this._refreshrequired;
  }
  public postUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.urlUser}/register`, data);
  }

  public getAllDataUser(): Observable<any[]> {
    const userObservable = this.getAllUsers();
    const userSimObservable = this.getAllUsersSim();
  
    return forkJoin([userObservable, userSimObservable]).pipe(
      map((usersData:any) => {
        console.log('USER DATA F', usersData)
        
        const userDataN= usersData[0].payload.content;
        const userSimData= usersData[1].payload.user;
        

        
        const combinedData = userDataN.map((userData: any) => {
          const matchingSimUsers = userSimData.find((userSim: any) => userSim.ID === userData.id);
          // console.log('matchingSimUsers', matchingSimUsers[0])
          
          // console.log('USER SIM', userSim)
          if (matchingSimUsers ) {
            console.log('matchingSimUsers', matchingSimUsers)
            console.log('USER DATA F', userData)
            return {
                id: userData.id,
                username: userData.username,
                name: userData.name,
                lastName: matchingSimUsers.lastName || 'N/A',
                email: userData.email,
                identificationType: userData.identificationType,
                identificationNumber: userData.identificationNumber,
                institutionType: userData.institutionType,
                institutionName:  matchingSimUsers.institution ? matchingSimUsers.institution.name : ' ',
                workPosition: matchingSimUsers.workPosition,
                region: userData.region,
                phone: userData.phone,
  
              }
 
          } else {
            return {}

          }
        });
        const nonEmptyCombinedData = combinedData.filter((obj: any) => Object.keys(obj).length !== 0);
        return nonEmptyCombinedData;
      })
    );
  }

  public getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.etl}/${id}`);
  }
  public getAllUsers(): Observable<any> {
    return this.http.get<any>(
      `${this.urlUser}/?page=0&size=1000000&queryBy=name&sortBy=id&ascending=true`
    );
  }
  public getAllUsersSim(): Observable<any> {
    return this.http.get<any>(`${this.etl}`);
  }
  public resetPassword(data: any): Observable<any> {
    return this.http.post<any>(`${this.auth}/reset-password`, data);
  }
  public changePassword(data: any): Observable<any> {
    return this.http.put<any>(`${this.auth}/change-password`, data);
  }

  public deleteUser(id: Number): Observable<any> {
    return this.http.delete<any>(`${this.auth}/delete/${id}`);
  }

  public deleteUserSIM(id: Number): Observable<any> {
    return this.http.delete<any>(`${this.etl}/${id}`);
  }
}
