import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { WheelerBrand, WheelerModel } from './buy-insurance/buy-insurance.component';

// Observable -> HTTP AJAX request response
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { fakeAsync } from '@angular/core/testing';
//import { ClaimInfo} from './claim-info'

import { ClaimInfo } from './claim-info'

import { RenewForm } from './user-home-page/user-home-page.component';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class CRUDApiService {

  // login status using session, for user and admin
  public loginstatus = new BehaviorSubject<boolean>((sessionStorage.getItem('User_Id') != null) ? true : false);
  public adminstatus = new BehaviorSubject<boolean>((sessionStorage.getItem('Admin_username') != null) ? true : false);

  get isLoggedin() {
    return this.loginstatus.asObservable();
  }

  get adminLoggedin() {
    return this.adminstatus.asObservable();
  }

  // path of api, with content type as json format
  private apiServer = "http://localhost:64977/api";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient, private router: Router) { }

  // Register user API call
  create(ruser): Observable<RegisterUser> {
    return this.httpClient.post<RegisterUser>(this.apiServer + '/Register/', JSON.stringify(ruser), this.httpOptions).pipe(catchError(this.handleError));
  }

  // Login API for user
  check(luser): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/Login/', JSON.stringify(luser), this.httpOptions).pipe(catchError(this.handleCommonErrors));
  }

  // Mail API
  mail(muser): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/Mail/', JSON.stringify(muser), this.httpOptions).pipe(catchError(this.handleCommonErrors));
  }

  // Reset mail API
  reset_pwd(fuser): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/Reset_pwd/', JSON.stringify(fuser), this.httpOptions).pipe(catchError(this.handleCommonErrors));
  }

  // Fetch Brand Names based on vehicle type
  getBrands(VehicleType): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/BrandName/', JSON.stringify(VehicleType), this.httpOptions).pipe(catchError(this.handleCommonErrors));
  }

  // Get Model names based on vehicle type
  getModels(ModelType): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/ModelName/', JSON.stringify(ModelType), this.httpOptions).pipe(catchError(this.handleCommonErrors));
  }

  // Subscription plan API
  subscriptionPlan_details(User_Id): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/Subscription?User_Id=' + User_Id, JSON.stringify(User_Id), this.httpOptions).pipe(catchError(this.handleCommonErrors));
  }

  // Applying for Claim (user)
  claim_details(User_Id): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/ClaimHistory?User_Id=' + User_Id, JSON.stringify(User_Id), this.httpOptions).pipe(catchError(this.handleCommonErrors));
  }

  // Claim Insurance (Admin) API
  claim(clins): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/ClaimInsurance/', JSON.stringify(clins), this.httpOptions).pipe(catchError(this.handleCommonErrors));
  }

  // Renew Check Validation API
  RenewDetailsConfirm(renewFormObj): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/RenewCheck/', JSON.stringify(renewFormObj), this.httpOptions).pipe(catchError(this.handleCommonErrors));
  }

  // Admin home page -> Fetch Claim details API
  getadminclaims(): Observable<any> {
    return this.httpClient.get<any>(this.apiServer + '/Admin/').pipe(catchError(this.handleCommonErrors));
  }

  // Fetch claim details by id (API) -> for admin
  getdetailsById(Claim_no): Observable<any> {
    const opts = { params: new HttpParams({ fromString: "Claim_no=" + Claim_no }) };
    return this.httpClient.get<any>(this.apiServer + '/Admin?Claim_no=' + Claim_no).pipe(catchError(this.handleCommonErrors));
  }

  // Fetch market price based on model name API
  getMarketPriceApi(Model_Name): Observable<any> {
    const opts = { params: new HttpParams({ fromString: "Model_Name=" + Model_Name }) };
    return this.httpClient.get<any>(this.apiServer + '/MarketPrice/?model_name=' + Model_Name).pipe(catchError(this.handleCommonErrors));
  }

  // Update claim API for admin
  updateclaims(Claim_no, claim_info): Observable<any> {
    return this.httpClient.put<any>(this.apiServer + '/Admin?Claim_no=' + Claim_no, JSON.stringify(claim_info), this.httpOptions).pipe(catchError(this.handleCommonErrors));
  }

  // Buy Insurance check with vehicle Reg. No.
  BuyInsuranceCheck(buyformobj): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/BuyInsuranceCheck/', JSON.stringify(buyformobj), this.httpOptions).pipe(catchError(this.handleCommonErrors));
  }

  // buy insurance API for user
  BuyInsurance(buyInsData): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/BuyInsurance/', JSON.stringify(buyInsData), this.httpOptions).pipe(catchError(this.handleCommonErrors));
  }

  // Renew insurance API for user
  RenewInsurance(buyInsData): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/RenewInsurance/', JSON.stringify(buyInsData), this.httpOptions).pipe(catchError(this.handleCommonErrors));
  }

  // Admin login API
  checkAdmin(aluser): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/AdminLogin/', JSON.stringify(aluser), this.httpOptions).pipe(catchError(this.handleCommonErrors));
  }

  // Policy details for user API
  getPolicyDetails(userpolicy): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/PolicyDetails/', JSON.stringify(userpolicy), this.httpOptions).pipe(catchError(this.handleCommonErrors));
  }

  // Getting OD_PREM_AMT, THIRD_PARTY and depreciation
  getpremfacors(premamtobj): Observable<any> {
    return this.httpClient.post<any>(this.apiServer + '/PremiumAmount/', JSON.stringify(premamtobj), this.httpOptions)
  }

  // Exception handling for user already present
  handleError = error => {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    }
    else {
      errorMessage = `Email Id  is already taken`;
    }

    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  // Common Exception 
  handleCommonErrors = error => {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    }
    else {
      errorMessage = `Bad Request.`;
    }
    window.alert(errorMessage);
    sessionStorage.clear();
    this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });


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

export class LoginUser {
  Email_ID: string;
  Password: string;
  message: string;
}
export class Adminlogindetails {
  Admin_id: string;
  Password: string;
  message: string;
}
export class Mailuser {
  Email_ID: string;
  message: string;
}
export class reset_pwd {
  token: string;
  password: string;
  //cpassword : string;
}
// export class brands
// {
//   vehicle_type:string;
//   brand_names:string;
//   Brand_Id:number;

// }

export class claiminsurance {
  Policy_No: string;
  Reasons: string;
  Date_claimed: Date;
  Date_of_Loss: Date;
  Place_of_Loss: string;
  Damage_Description: string;
  Injury_to_Thirdparty: number;
  Claim_approval_status: string;
  Claim_amt: number;
}

export class Subscription_plan {
  Vehicle_Type: string;
  Manufacturer_Name: string;
  Model_Name: string;
  Reg_No: string;
  Engine_No: number;
  Chasis_No: number;
  Sub_date: Date;
  Policy_No: number;
}
