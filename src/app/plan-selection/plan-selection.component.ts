import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CRUDApiService } from '../crud-api.service';
import { BuyInsClass } from '../buy-insurance/buy-insurance.component';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import * as moment from 'moment';


@Component({
  selector: 'app-plan-selection',
  templateUrl: './plan-selection.component.html',
  styleUrls: ['./plan-selection.component.css']
})
export class PlanSelectionComponent implements OnInit {


  planForm = new FormGroup({
    planType: new FormControl('',[Validators.required]),
    planDuration: new FormControl('', [Validators.required])
  })

// <<<<<<< HEAD
//   buyinsobj = new BuyInsClass();
//   constructor(
//     public service : CRUDApiService
//   ) { 
//     this.buyinsobj.Vehicle_cc = 1000;
//     this.buyinsobj.Model_Name = "RE Classic";
//     this.buyinsobj.Vehicle_Type = "4-wheeler";
//     this.buyinsobj.Veh_purchase_date = new Date('4/6/2018');
//     this.buyinsobj.Market_price = 150000;
//   }

//   ngOnInit(): void {
    

  constructor(
    public shared: SharedService,
    public service:CRUDApiService,
    private router: Router) { }

  buyInsData: BuyInsClass;

  ngOnInit(): void {
    //this.buyInsData = this.shared.getBuyInsData();
    //console.log(this.buyInsData);
    var temp = sessionStorage.getItem('sessionbuyins');
    var sessionbuyInsData = JSON.parse(temp);
    
    this.buyInsData = sessionbuyInsData;

    console.log(sessionbuyInsData);
  }

  gloalplantype:string;
  globalplanduration:number;
  checked:boolean = false;
  
  plantypechange(plantype)
  {
    this.gloalplantype = plantype.target.value;

    if(this.planForm.valid)
    {
      this.calcprem();
    }
  }

  plandurchange(plandur)
  {
    this.globalplanduration = plandur.target.value;
    if(this.planForm.valid)
    {
      this.calcprem();
      this.checked = true;
    }
  }




  
  idv:number;
  basic_third_party:number=0;
  basic_own_damage:number=0;

  basic_third_partyf:number=0;
  basic_own_damagef:number=0;

  net_premium:number=0;
  gst:number=0;
  total_premium:number=0;
  

  calcprem()
  {
    this.idv = 0;
    console.log(this.buyInsData.vehicleCC);
    console.log(this.buyInsData.model_name);
    console.log(this.buyInsData.market_price);
    console.log(this.gloalplantype);
    console.log(this.globalplanduration);

    /*
    Total prem Amount for Comprehensive			
    =		Fixed_amt_tp_based_on_cc	
	    +	veh_based_base_od_prem_per * (IDV) 	


    IDV = MP - dep
    */

    /*
    get dep_per by age_of_vehicle(purchasedate)
    get prem_per by modelname
    get fixed_amt by vehicle_cc

    */


    let premamtobj = new PremiumAmount();
    premamtobj.Model_Name = this.buyInsData.model_name;
    premamtobj.vehicle_cc = this.buyInsData.vehicleCC;
    premamtobj.vehicle_type = this.buyInsData.veh_type;
    let age = moment().diff(this.buyInsData.purchase_date, 'years');
    // let timeDiff = Math.abs(Date.now() - new Date(this.buyInsData.purchase_date).getTime())
    // let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    console.log(age);
    premamtobj.age = age;
  
    this.service.getpremfacors(premamtobj).subscribe((data) => {
      console.log(data);
      this.idv = this.buyInsData.market_price - (data.dep_per/100 * this.buyInsData.market_price);
      this.basic_third_party = data.thirdpartyprem;
      
      if(this.gloalplantype == 'Comprehensive')
      {
        this.basic_own_damage = data.od_prem_per/100 * Number(this.idv);
      }
      else
      {
        this.basic_own_damage = 0;
      }


      
      this.basic_own_damagef = this.basic_own_damage * this.globalplanduration;
      this.basic_third_partyf = this.basic_third_party * this.globalplanduration;


      this.net_premium = this.basic_third_partyf + this.basic_own_damagef;
      this.gst = 18/100 * this.net_premium;
      this.total_premium = this.gst + this.net_premium;

      
      console.log(this.idv);



    })

    
  }







  get planType(){
    return this.planForm.get('planType');
  }

  get planDuration(){
    return this.planForm.get('planDuration');
  }

  onSubmit()
  {
    console.log(this.planForm.value);
    this.buyInsData.plan_type = this.planType.value;
    this.buyInsData.plan_duration = this.planDuration.value;
    this.buyInsData.total_payable = this.total_premium;
    this.buyInsData.total_tp = this.basic_third_partyf;
    this.buyInsData.total_od = this.basic_own_damagef;
    this.buyInsData.idv = this.idv;
    //this.shared.setBuyInsData(this.buyInsData);
    //console.log(this.buyInsData);

    sessionStorage.setItem('sessionbuyins', JSON.stringify(this.buyInsData));
    
    this.router.navigateByUrl('/payment-gateway');

  }
}

export class PremiumAmount
{
  Model_Name: string;
  vehicle_cc:number;
  vehicle_type:string;
  age:number;
}

export class Plan {
  planType: string;
  PlanDuration: string;
}


//Engine Number is not in db