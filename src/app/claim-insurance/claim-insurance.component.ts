import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CRUDApiService } from '../crud-api.service';

@Component({
  selector: 'app-claim-insurance',
  templateUrl: './claim-insurance.component.html',
  styleUrls: ['./claim-insurance.component.css']
})
export class ClaimInsuranceComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CRUDApiService
  ) { }

  claimForm = new FormGroup({
    policy_no: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z0-9]*$")]),
    mobile_no: new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
    claim_reason: new FormControl('',[Validators.required]),
    date_of_loss: new FormControl('',[Validators.required]),
    place_of_loss: new FormControl('',[Validators.required,Validators.pattern("^[a-zA-Z]*$")]),
    loss_desc: new FormControl('',[Validators.required]),
    any_thirdparty_damage: new FormControl('',[Validators.required]),
    
   
  })


  get policy_no()
  {
    return this.claimForm.get('policy_no');
  }

  get mobile_no()
  {
    return this.claimForm.get('mobile_no');
  }

  get claim_reason()
  {
    return this.claimForm.get('claim_reason');
  }

  get date_of_loss()
  {
    return this.claimForm.get('date_of_loss');
  }

  get place_of_loss()
  {
    return this.claimForm.get('place_of_loss');
  }

  get loss_desc()
  {
    return this.claimForm.get('loss_desc');
  }

  get any_thirdparty_damage()
  {
    return this.claimForm.get('any_thirdparty_damage');
  }

  ngOnInit(): void {

  }

  onSubmit()
  {
    
    console.log(this.claimForm.value);
    let cl=new claim();
    cl.Policy_No=this.policy_no.value;
    cl.Reasons=this.claim_reason.value;
    cl.Date_claimed=new Date();
    cl.Date_of_Loss=this.date_of_loss.value;
    cl.Place_of_Loss=this.place_of_loss.value;
    cl.Damage_Description=this.loss_desc.value;
    cl.Injury_to_Thirdparty=this.any_thirdparty_damage.value;
    cl.Claim_approval_status="";
    cl.message="";


    this.crudService.claim(cl).subscribe(res => {
      console.log('Submitted Successfully'),
       window.alert('Submitted Successfully'),
      this.router.navigateByUrl('')
    });
  }

}

export class claim
{
  Policy_No : string;
  Reasons : string;
  Date_claimed : Date;
  Date_of_Loss : Date;
  Place_of_Loss : string;
  Damage_Description : string;
  Injury_to_Thirdparty : boolean;
  Claim_approval_status : string;
  message : string;
}