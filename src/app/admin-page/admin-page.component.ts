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
     this.service.getadminclaims().subscribe((data: details[])=>{
         this.ClaimsList = data;
         console.log(this.ClaimsList);
     })  
    // this.service.getadminclaims().subscribe(res => {
    //   res.forEach(element => {
    //    console.log(element)
    //    //let c = new details(element.Policy_No,element.Reasons);
    //     this.ClaimsList.push(element);
    //    });
    //   console.log(this.ClaimsList);
    // });

  }

}
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