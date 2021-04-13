import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WheelerBrand, WheelerModel } from './buy-insurance/buy-insurance.component';

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
    return this.httpClient.post<RegisterUser>(this.apiServer + '/Register/', JSON.stringify(ruser), this.httpOptions)
  }

  check(luser): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/Login/', JSON.stringify(luser), this.httpOptions)
  }

  getBrands(VehicleType): Observable<WheelerBrand[]>{
    return this.httpClient.post<WheelerBrand[]>(this.apiServer + '/RamBuyCheck/', JSON.stringify(VehicleType), this.httpOptions)
  }

  getModels(ModelType): Observable<WheelerModel[]>{
    return this.httpClient.post<WheelerModel[]>(this.apiServer + '/RamBuyCheck2/', JSON.stringify(ModelType), this.httpOptions)
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
