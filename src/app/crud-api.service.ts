import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { WheelerBrand, WheelerModel } from './buy-insurance/buy-insurance.component';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry} from 'rxjs/operators';

import { fakeAsync } from '@angular/core/testing';
import { RenewForm } from './user-home-page/user-home-page.component';


@Injectable({
  providedIn: 'root'
})
export class CRUDApiService {


  public loginstatus = new BehaviorSubject<boolean>((sessionStorage.length!=0)?true:false);

  get isLoggedin()
  {
    return this.loginstatus.asObservable();
  }

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

  check(luser): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/Login/', JSON.stringify(luser), this.httpOptions)
  }

  getBrands(VehicleType): Observable<any>{
    return this.httpClient.post<any>(this.apiServer + '/BrandName/', JSON.stringify(VehicleType), this.httpOptions)
  }

  getModels(ModelType): Observable<any>{
    return this.httpClient.post<any>(this.apiServer + '/ModelName/', JSON.stringify(ModelType), this.httpOptions)
  }

  mail(muser): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/Mail/', JSON.stringify(muser), this.httpOptions)
  }

  reset_pwd(fuser): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/Reset_pwd/', JSON.stringify(fuser), this.httpOptions)
  }

  claim(clins): Observable<claiminsurance> {
    return this.httpClient.post<claiminsurance>(this.apiServer + '/ClaimInsurance/', JSON.stringify(clins), this.httpOptions);
  }

  RenewDetailsConfirm(renewFormObj): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/RenewCheck/', JSON.stringify(renewFormObj), this.httpOptions);
  }

  BuyInsuranceCheck(buyformobj): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/BuyInsuranceCheck/', JSON.stringify(buyformobj), this.httpOptions);
  }

  BuyInsurance(buyInsData):Observable<any>{
    return this.httpClient.post<any>(this.apiServer + '/BuyInsurance/', JSON.stringify(buyInsData), this.httpOptions);
  }

  RenewInsurance(buyInsData):Observable<any>{
    return this.httpClient.post<any>(this.apiServer + '/RenewInsurance/', JSON.stringify(buyInsData), this.httpOptions);
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
  

  getbrandsapi(vehtype): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/BrandName/', JSON.stringify(vehtype), this.httpOptions)
  }
  
  getmodelsapi(vehtypebrandid): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/ModelName/', JSON.stringify(vehtypebrandid), this.httpOptions)
  }

  getpremfacors(premamtobj): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/PremiumAmount/', JSON.stringify(premamtobj), this.httpOptions)
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

export class Mailuser
{
  Email_ID : string;
  message : string;
}
export class reset_pwd
{
  token : string;
  password : string;
  //cpassword : string;
}
// export class brands
// {
//   vehicle_type:string;
//   brand_names:string;
//   Brand_Id:number;

// }

export class claiminsurance
{
  Policy_No : string;
  Reasons : string;
  Date_claimed : Date;
  Date_of_Loss : Date;
  Place_of_Loss : string;
  Damage_Description : string;
  Injury_to_Thirdparty : number;
  Claim_approval_status : string;
  Claim_amt : number;
}