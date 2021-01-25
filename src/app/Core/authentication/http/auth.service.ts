import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserModel } from 'src/app/Models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersPath = environment.baseUrl + environment.userPath;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });//, "Authorization": 
  constructor(private http: HttpClient) { }


  login(loginUser: UserModel): Observable<UserModel> {
    return this.http.post<{user: UserModel, token:string}>(`${this.usersPath}/login`, JSON.stringify(loginUser), { headers: this.headers })
      .pipe(catchError(this.handleError),
      map(res => res.user));    
}


logout(userID:string){

}



  
  private handleError(error: any) {
    let msg = error["error"];
    return throwError(msg);
  }
}
