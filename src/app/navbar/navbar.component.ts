import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CRUDApiService } from '../crud-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private service:CRUDApiService
  ) { }

  public loginstatus$:Observable<boolean>;
  public adminstatus$: Observable<boolean>;

  logout()
  {
    sessionStorage.clear();
    this.service.loginstatus.next(false); 
  }

  adminLogout() {
    
    sessionStorage.clear();
    this.service.adminstatus.next(false);
  }

  ngOnInit(): void {
    this.loginstatus$ = this.service.isLoggedin;
    this.adminstatus$ = this.service.adminLoggedin;
  }

}
