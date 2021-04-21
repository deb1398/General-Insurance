import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CRUDApiService } from '../crud-api.service';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css']
})
export class PolicyDetailsComponent implements OnInit {

  constructor(
    public crudService:CRUDApiService,
    private router: Router
  ) { }

  policy_no:number;
  policy_details:any;
  currentDate:Date;

  ngOnInit(): void {

    this.currentDate = new Date();

    // Getting Policy No from URL
    const urlParams = new URLSearchParams(window.location.search);
    this.policy_no = Number(urlParams.get('policy_no')) ;

    console.log(this.policy_no);

    //Creating object to pass User Id and Policy No in CRUD Api Service
    let policyapiobj = new UserPolicy();
    policyapiobj.User_Id = Number(sessionStorage.getItem('User_Id'));
    policyapiobj.policy_no = this.policy_no;

    // Gets Entire Policy Details through CRUD Api Service
    this.crudService.getPolicyDetails(policyapiobj).subscribe(res => {

      // If User do not have this policy then alert message Access Denied
      if(res.message=="Access Denied")
      {
        window.alert("Access Denied");
        this.router.navigateByUrl('user-home-page');
      }
      else
      {
        console.log(res);
        this.policy_details=res;
      }
    });

  }

}


//Class Declaration for creating objects to pass in CRUD API Service
export class UserPolicy
{
  User_Id:number;
  policy_no:number; 
}
