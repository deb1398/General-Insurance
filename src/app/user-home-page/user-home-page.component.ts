import { Component, OnInit } from '@angular/core';
//import { EmailValidator } from '@angular/forms';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { CRUDApiService } from '../crud-api.service';
import { ClaimInfo} from '../claim-info'

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent implements OnInit {

  public subscriptionplan_list : Subscription[] = [];
  public claim_history : ClaimHistory[]=[];

  renewForm = new FormGroup({
    policyNumber: new FormControl('',[Validators.required]),
    mobile: new FormControl('',[Validators.required, Validators.pattern("[0-9 ]{10}")]),
    email:new FormControl('',[Validators.email,Validators.required])
  })

  

  constructor(public crudService: CRUDApiService) { }

  ngOnInit() {
    const User_Id=sessionStorage.getItem('User_Id');
    console.log(User_Id);
    this.crudService.subscriptionPlan_details(User_Id).subscribe((data : Subscription[]) => {
      this.subscriptionplan_list=data;
      //console.log(this.subscriptionplan_list)

    })
     this.crudService.claim_details(User_Id).subscribe((data : ClaimHistory[])=>
     {
       this.claim_history=data;
     })
  }

  get policyNumber(){
    return this.renewForm.get('policyNumber');
  }

  get mobile(){
    return this.renewForm.get('mobile');
  }

  get email(){
    return this.renewForm.get('email');
  }

  onSubmit = () => console.log(this.renewForm.value);
}

export class RenewForm {
  policyNumber: number;
  mobile: number;
  email: string;
}
export class Subscription
{
  Vehicle_Type : string;
  Manufacturer_Name :string;
  Model_Name :string;
  Reg_No :string;
  Engine_No :number;
  Chasis_No :number;
  Sub_date :Date;
  Policy_No :number;
  Status_of_sub : string;
  message : string;
}
export class ClaimHistory
{
  Claim_no : number
  Policy_No : number;
  Date_claimed : Date;
  Claim_approval_status : string;
  Claim_amt : number;
}