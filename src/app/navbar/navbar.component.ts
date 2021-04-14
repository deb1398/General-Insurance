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

  logout()
  {
    sessionStorage.clear();
    this.service.loginstatus.next(false); 
  }

  ngOnInit(): void {
    this.loginstatus$ = this.service.isLoggedin;
  }

}
