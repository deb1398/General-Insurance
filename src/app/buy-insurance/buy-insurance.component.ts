
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CRUDApiService } from '../crud-api.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-buy-insurance',
  templateUrl: './buy-insurance.component.html',
  styleUrls: ['./buy-insurance.component.css']
})
export class BuyInsuranceComponent implements OnInit {

  buyinsuranceForm = new FormGroup({
    veh_type : new FormControl('',[Validators.required]),
    brand_name : new FormControl('',[Validators.required]),
    model_name : new FormControl('',[Validators.required,]),
    license_no : new FormControl('',[Validators.required, Validators.minLength(16),Validators.pattern("(?=.*[A-Z]{2})(?=.*[0-9]{2})[A-Za-z0-9]{16}")]),
    purchase_date : new FormControl('',[Validators.required,this.dateValidator]),
    registeration_number : new FormControl('',[Validators.required, Validators.minLength(10),Validators.pattern("(?=.*[A-Z]{2})(?=.*[0-9]{2})[A-Za-z0-9]{10}")]),
    engine_number : new FormControl('',[Validators.required]),
    vehicleCC: new FormControl('',[Validators.required]),
    chassis_number : new FormControl('',[Validators.required]),
    //market_price : new FormControl('',[Validators.required, Validators.pattern("[0-9]{4,7}")])
    market_price : new FormControl('')
  })

  dateValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      const date = moment(control.value);
      const today = moment();
      if (date.isAfter(today)) {
        return { 'invalidDate': true }
      }
    }
    return null;
  }
  

  //declaration
  brandsList:WheelerBrand[];
  
  modelsList:WheelerModel[];

  constructor( public service: CRUDApiService, public shared: SharedService, private router: Router, public crudService:CRUDApiService) { }
  
  //set max date for date validation 
  maxdate:Date;

  ngOnInit(): void {
    this.maxdate = new Date(Date.now());
  }

  //convenience getter for easy access to form fields
  get f(){
    return this.buyinsuranceForm.controls;
  }

  get veh_type()
  {
    return this.buyinsuranceForm.get('veh_type');
  }

  get brand_name()
  {
    return this.buyinsuranceForm.get('brand_name');
  }

  get model_name()
  {
    return this.buyinsuranceForm.get('model_name');
  }

  get license_no()
  {
    return this.buyinsuranceForm.get('license_no');
  }

  get purchase_date()
  {
    return this.buyinsuranceForm.get('purchase_date');
  }

  get registeration_number()
  {
    return this.buyinsuranceForm.get('registeration_number');
  }

  get engine_number()
  {
    return this.buyinsuranceForm.get('engine_number');
  }

  get chassis_number()
  {
    return this.buyinsuranceForm.get('chassis_number');
  }

  get vehicleCC()
  {
    return this.buyinsuranceForm.get('vehicleCC');
  }

  get market_price()
  {
    return this.buyinsuranceForm.get('market_price');
  }

  globalVehicleType: string

  modelType: ModelType;

  onItemChange(e){

    this.globalVehicleType = e.target.value;

    //adding element values to the object of vehicle type class
    let vehicleType = new VehicleType;
    vehicleType.vehicle_type = e.target.value; 

    //api service for getting brand names
    this.service.getBrands(vehicleType).subscribe((data) => {
      this.brandsList = data;
    })
    
  }

  onChange(e){
    var index = e.target.value.indexOf(":")
    var id = e.target.value.substring(index+1,);

    //adding element values to the object of model type class
    let modelType = new ModelType;
    modelType.Brand_ID = id;
    modelType.vehicle_type = this.globalVehicleType;

    //api service for getting model names
    this.service.getModels(modelType).subscribe((data) => {
      this.modelsList = data;
    })
  }

  Market_Price_Response:number=0;
  public getMarketPrice(model_name:string)
  {
    console.log("Inside");
    var index = model_name.indexOf(":")
    model_name = model_name.substring(index+1,).trim();
    this.crudService.getMarketPriceApi(model_name).subscribe(res => {
      console.log(res);
      this.Market_Price_Response = Number(res.Market_Price);
      console.log(res.Market_Price);
    });

    console.log(model_name);
  }

  buyInsurance: BuyInsClass;

  onSubmit()
  {
    //adding element values to the object of registration class
    let reg= new registrationNo;
    reg.registration_no=String(this.registeration_number.value);
    
    //api service for buy insurance
    this.crudService.BuyInsuranceCheck(reg).subscribe(res => {
      console.log(res);


      if(res.message === "Valid")
      {

        //add element values to buy insurance object
        this.buyInsurance = this.buyinsuranceForm.value;
        this.buyInsurance.market_price = this.Market_Price_Response;
        this.buyInsurance.User_Id = Number(sessionStorage.getItem('User_Id'));
        this.buyInsurance.inusrance_type = "Buy_New";
        
        //set session storage
        sessionStorage.setItem('sessionbuyins', JSON.stringify(this.buyInsurance));
        
        //redirecting to another page
        this.router.navigateByUrl('/plan-selection');

      }
      else
      {
        window.alert("This Vehicle Registration already has active subscription");
      }
    });  
  }

}

//Class Declaration for creating objects to pass in CRUD API Service

export class registrationNo{
  registration_no:string;
}

export class VehicleType{
  vehicle_type: string;
}

export class ModelType{
  Brand_ID: number;
  vehicle_type: string;
}

export class WheelerBrand {
  vehicle_type: string;
  brand_names: string;
  Brand_Id: number
}


export class WheelerModel {
  Brand_Id:number;
  Model_Name:string;
}

export class BuyInsClass {
  User_Id:number;
  policy_no:number;

  veh_type:string;
  brand_name:number;
  model_name:string;
  license_no:string;
  purchase_date:string;
  registeration_number:string;
  engine_number:number;
  vehicleCC:number;
  chassis_number:number;  
  market_price:number;

  plan_type:string;
  plan_duration:number;
  idv:number;
  total_tp:number;
  total_od:number;
  total_payable:number;

  card_holder_name:string;
  card_no:number;
  card_exp_month:number;
  card_exp_year:number;
  card_cvc:number;

  inusrance_type:string;

  
}