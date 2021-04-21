import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CRUDApiService } from '../crud-api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private service: CRUDApiService, private router: Router) { }

  canActivate(): boolean {
    if(!sessionStorage.getItem('Admin_username')) {
      alert("Not logged in.");
      this.router.navigateByUrl("/Home");
      return false;
    }
    
    return true;
  }
}
