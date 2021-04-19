import { Component, OnInit } from '@angular/core';
//import { EmailValidator } from '@angular/forms';
import { FormControl, FormGroup, Validators} from '@angular/forms';
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

  @ViewChild('closeModal') closeModal: ElementRef;

  renewForm = new FormGroup({
    policyNumber: new FormControl('',[Validators.required]),
    mobile: new FormControl('',[Validators.required, Validators.pattern("[0-9]{10}")]),
    email:new FormControl('',[Validators.email,Validators.required])
  })

  constructor(
    public crudService:CRUDApiService,
    public router:Router
  ) { }

  ngOnInit(): void {

    
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

  
  //buyInsdata:BuyInsClass;

  onSubmit()
  {
    console.log(this.renewForm.value);
    let renewFormObj:RenewForm;
    renewFormObj = this.renewForm.value;
    renewFormObj.User_Id = Number(sessionStorage.getItem('User_Id'));

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

        // buyInsdata.brand_name = res.brand_name;
        // buyInsdata.registeration_number = res.registeration_number;
        // buyInsdata.license_no = res.license_no;
        // buyInsdata.engine_number = res.engine_number;
        // buyInsdata.chassis_number = res.chassis_number;


        // buyInsdata.model_name = res.model_name;
        // buyInsdata.vehicleCC = res.vehicleCC;
        // buyInsdata.veh_type = res.veh_type;
        // buyInsdata.purchase_date = res.purchase_date;
        // buyInsdata.market_price = res.market_price;
        buyInsdata.inusrance_type = "renew";

        sessionStorage.setItem('sessionbuyins',JSON.stringify(buyInsdata));
        this.closeModal.nativeElement.click();
        this.router.navigateByUrl('plan-selection');


      }
      else if(res.message == "Invalid Policy Number")
      {
        window.alert("You don't have this current Policy")
      }
      else if(res.subscription_status == "Active")
      {
        window.alert("Policy is still Active")
      }

    });

  }
    
}

export class RenewForm {
  policyNumber: number;
  mobile: string;
  email: string;
  User_Id:number;
}
