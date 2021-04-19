import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiServer = "http://localhost:54037";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }
  
  create(user): Observable<User> {
    return this.httpClient.post<User>(this.apiServer + '/user/', JSON.stringify(user), this.httpOptions)
  }

}
