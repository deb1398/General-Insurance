import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ClaimInfo} from '../claim-info'
import { Router } from '@angular/router';
import { RenewIns } from 'src/Models/renew-ins';
import { BuyInsClass } from '../buy-insurance/buy-insurance.component';
import { CRUDApiService } from '../crud-api.service';
import { ViewChild, ElementRef} from '@angular/core';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public claim_history : ClaimHistory[]=[];

  constructor(public crudService: CRUDApiService, public router:Router) { }

  
  Name:string = sessionStorage.getItem('Name');
  Email_ID:string = sessionStorage.getItem('Email_ID');
  Phone_No:string = sessionStorage.getItem('Phone_No');
  DOB:string = sessionStorage.getItem('DOB');
  Address:string = sessionStorage.getItem('Address');

  ngOnInit() {
    const User_Id=sessionStorage.getItem('User_Id');
    console.log(User_Id);
    this.crudService.claim_details(User_Id).subscribe((data : ClaimHistory[])=>
     {
       this.claim_history=data;
     })
  }

}
export class ClaimHistory
{
  Claim_no : number
  Policy_No : number;
  Date_claimed : Date;
  Claim_approval_status : string;
  Claim_amt : number;
}
