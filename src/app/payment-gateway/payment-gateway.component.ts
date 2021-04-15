import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BuyInsClass } from '../buy-insurance/buy-insurance.component';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.css']
})
export class PaymentGatewayComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public shared: SharedService
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

  buyInsData: BuyInsClass;
  globalpayableamount:number;
  
  ngOnInit(): void {

    //this.buyInsData = this.shared.getBuyInsData();
    
    var temp = sessionStorage.getItem('sessionbuyins');
    var sessionbuyInsData = JSON.parse(temp);
    
    this.buyInsData = sessionbuyInsData;

    console.log(this.buyInsData);
    this.globalpayableamount = this.buyInsData.total_payable;
  }

  onSubmit()
  {
    this.buyInsData.card_holder_name = this.card_name.value;
    this.buyInsData.card_no = this.card_number.value;
    this.buyInsData.card_exp_month = this.card_exp_no.value;
    this.buyInsData.card_exp_year = this.cc_exp_yr.value;
    this.buyInsData.card_cvc = this.card_cvc.value;
    
    //this.shared.setBuyInsData(this.buyInsData);
    

    sessionStorage.setItem('sessionbuyins', JSON.stringify(this.buyInsData));

    console.log(this.buyInsData);
  }


}
