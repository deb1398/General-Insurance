import { Component, OnInit } from '@angular/core';
//import { EmailValidator } from '@angular/forms';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { ClaimInfo} from '../claim-info'
import { Router } from '@angular/router';
import { RenewIns } from 'src/Models/renew-ins';
import { BuyInsClass } from '../buy-insurance/buy-insurance.component';
import { CRUDApiService } from '../crud-api.service';
import { ViewChild, ElementRef} from '@angular/core';


@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent implements OnInit {


  public subscriptionplan_list : Subscription[] = [];
  public claim_history : ClaimHistory[]=[];

  // Getting ElementRef for Modal to close Modal and redirect to another page
  @ViewChild('closeModal') closeModal: ElementRef;


  renewForm = new FormGroup({
    policyNumber: new FormControl('',[Validators.required]),
    mobile: new FormControl('',[Validators.required, Validators.pattern("[0-9]{10}")]),
    email:new FormControl('',[Validators.email,Validators.required])
  })

  constructor(public crudService: CRUDApiService, public router:Router) { }

  ngOnInit() {

    const User_Id=sessionStorage.getItem('User_Id');
    console.log(User_Id);

    // Gets list of Subsciption Plans for the User
    this.crudService.subscriptionPlan_details(User_Id).subscribe((data : Subscription[]) => {
      this.subscriptionplan_list=data;
      console.log(this.subscriptionplan_list)
    })

    // Gets List of Claim Details that the User has applied
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

  

  // Method Executed on Sumbiting Form in Renew Form Modal
  onSubmit()
  {
    console.log(this.renewForm.value);
    // Creating object to pass Policy No, Email, Phone No, User Id to CRUD API Service
    let renewFormObj:RenewForm;
    renewFormObj = this.renewForm.value;
    renewFormObj.User_Id = Number(sessionStorage.getItem('User_Id'));


    // Service Does Validation check
    // 1. if User has any active subs for the same Registration Number
    // 2. If policy is still Active
    // 3. If User has that entered Policy No
    // Allow to renew only its false for all the above cases
    this.crudService.RenewDetailsConfirm(renewFormObj).subscribe(res => {
      console.log(res);
      if(res.message === "Valid" && res.subscription_status=="Expired")
      {
        console.log(res);
        console.log(Number(sessionStorage.getItem('User_Id')));
        let buyInsdata = new BuyInsClass();
        buyInsdata = res;
        buyInsdata.User_Id = Number(sessionStorage.getItem('User_Id'));
        buyInsdata.policy_no= Number(this.policyNumber.value);
        buyInsdata.inusrance_type = "renew";

        sessionStorage.setItem('sessionbuyins',JSON.stringify(buyInsdata));
        
        // Close Renew Insurance Form Modal
        this.closeModal.nativeElement.click();
        this.router.navigateByUrl('plan-selection');

      }
      else if(res.message == "Invalid Policy Number")
      {
        window.alert("You don't have this current Policy")
      }
      else if(res.message == "Already having active policy")
      {
        window.alert("Policy is still Active")
      }

    });

  }
    
}


// Class Declaraton for Renew Form
export class RenewForm {
  policyNumber: number;
  mobile: string;
  email: string;
  User_Id:number;
}

// Class Declaration for creating List of Objects Subscription (List of Insurance)
export class Subscription
{
  Plan_type:string;
  Vehicle_Type : string;
  Manufacturer_Name :string;
  Model_Name :string;
  Reg_No :string;
  Engine_No :number;
  Chasis_No :number;
  Sub_date :Date;
  End_date:Date;
  Policy_No :number;
  Status_of_sub : string;
  message : string;
}

// Class Declaration for creating List of Objects Claim History (Claim History Details)
export class ClaimHistory
{
  Claim_no : number
  Policy_No : number;
  Date_claimed : Date;
  Claim_approval_status : string;
  Claim_amt : number;
}