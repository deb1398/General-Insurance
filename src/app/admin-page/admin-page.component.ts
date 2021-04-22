import { Component, OnInit } from '@angular/core';
//import { claim } from '../claim-insurance/claim-insurance.component';
import { CRUDApiService } from '../crud-api.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  
  public ClaimsList:details[] =[];

  constructor(public service: CRUDApiService) { }

  ngOnInit() {
    //gets the entire data through CRUD api service
     this.service.getadminclaims().subscribe((data: details[])=>{
         this.ClaimsList = data;
         console.log(this.ClaimsList);
     })  
  }

}

//class declarations for creating objects to pass in pass CRUD api service
export class details
{
  Policy_No : string;
  Reasons : string;
  Date_claimed : Date;
  Date_of_Loss : Date;
  Place_of_Loss : string;
  Damage_Description : string;
  Injury_to_Thirdparty : boolean;
  Claim_approval_status : string;
  Claim_amt : number;
}