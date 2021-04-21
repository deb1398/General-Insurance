import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CRUDApiService } from '../crud-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private service: CRUDApiService, private router: Router) { }
  
  canActivate(): boolean {
    if(!sessionStorage.getItem('Email_ID') || !sessionStorage.getItem('Phone_No')) {
      alert("Not logged in.");
      this.router.navigateByUrl("/Home");
      return false;
    }
    
    return true;
  }
  

}
// export class AdminAuthGuardService implements CanActivate {

//   constructor(private service: CRUDApiService, private router: Router) { }
  
//   canActivate(): boolean {
//     if(!sessionStorage.getItem('Admin_username')) {
//       alert("Not logged in.");
//       this.router.navigateByUrl("/Home");
//       return false;
//     }
    
//     return true;
//   }
  

// }
