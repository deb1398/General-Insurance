import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CRUDApiService {

  private apiServer = "http://localhost:64977/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private httpClient: HttpClient) { }

  create(ruser): Observable<RegisterUser> {
    return this.httpClient.post<RegisterUser>(this.apiServer + '/Register/', JSON.stringify(ruser), this.httpOptions).pipe(catchError(this.handleError));
  }

  check(luser): Observable<LoginUser> {
    return this.httpClient.post<LoginUser>(this.apiServer + '/Login/', JSON.stringify(luser), this.httpOptions)
  }

  handleError(error)
  {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent)
    {
      errorMessage = `Error: ${error.error.message}`;
    }
    else
    {
      errorMessage = `Email Id or Phone Number is already taken`;
    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  
}

export class RegisterUser {
  User_id: String;
  Name: String;
  Email_ID: String;
  Phone_No: Number;
  DOB: Date;
  Address: String;
  Password: String;
}

export class LoginUser
{
  Email_ID:string;
  Password:string;
  message: string;
}
