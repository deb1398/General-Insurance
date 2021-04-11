import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    private router: Router
  ) { }

  paymentForm = new FormGroup({
    card_name: new FormControl('',[Validators.required]),
    card_number: new FormControl('',[Validators.required]),
    card_exp_no: new FormControl('',[Validators.required]),
    cc_exp_yr: new FormControl('',[Validators.required]),
    card_cvc: new FormControl('',[Validators.required]) 
    
  })

  get card_name()
  {
    return this.paymentForm.get('card_name');
  }
  get card_number()
  {
    return this.paymentForm.get('card_number');
  }
  get card_exp_no()
  {
    return this.paymentForm.get('card_exp_no');
  }
  get cc_exp_yr()
  {
    return this.paymentForm.get('cc_exp_yr');
  }
  get card_cvc()
  {
    return this.paymentForm.get('card_cvc');
  }

  
  ngOnInit(): void {
  }

  onSubmit()
  {
    console.log(this.paymentForm.value);
  }


}
