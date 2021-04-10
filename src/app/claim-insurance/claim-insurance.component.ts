import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-claim-insurance',
  templateUrl: './claim-insurance.component.html',
  styleUrls: ['./claim-insurance.component.css']
})
export class ClaimInsuranceComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    private router: Router
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
  }

}
