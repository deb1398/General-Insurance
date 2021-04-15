
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
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
    model_name : new FormControl('',[Validators.required]),
    license_no : new FormControl('',[Validators.required, Validators.minLength(16),Validators.pattern("(?=.*[A-Z]{2})(?=.*[0-9]{2})[A-Za-z0-9]{16}")]),
    purchase_date : new FormControl('',[Validators.required]),
    registeration_number : new FormControl('',[Validators.required, Validators.minLength(10),Validators.pattern("(?=.*[A-Z]{2})(?=.*[0-9]{2})[A-Za-z0-9]{10}")]),
    engine_number : new FormControl('',[Validators.required]),
    vehicleCC: new FormControl('',[Validators.required]),
    chassis_number : new FormControl('',[Validators.required]),
    market_price : new FormControl('',[Validators.required, Validators.pattern("[0-9]{4,7}")])
  })

  

  

  brandsList:WheelerBrand[];
  
  modelsList:WheelerModel[];

  constructor( public service: CRUDApiService, public shared: SharedService, private router: Router) { }
  
  
  ngOnInit(): void {
    
  }

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
    let vehicleType = new VehicleType;
    vehicleType.vehicle_type = e.target.value; 
    this.service.getBrands(vehicleType).subscribe((data) => {
      this.brandsList = data;
    })
    
    //this.vehicle_type = e.target.value;
    // console.log(e.target.value);
  }

  onChange(e){
    var index = e.target.value.indexOf(":")
    var id = e.target.value.substring(index+1,);
    let modelType = new ModelType;
    
    modelType.Brand_ID = id;
    modelType.vehicle_type = this.globalVehicleType;
    // console.log(modelType);
    this.service.getModels(modelType).subscribe((data) => {
      this.modelsList = data;
    })
    // console.log(e.target.value);
  }

  buyInsurance: BuyInsClass;

  onSubmit()
  {
    this.buyInsurance = this.buyinsuranceForm.value;
    this.shared.setBuyInsData(this.buyInsurance);
    
    
    //console.log(this.buyInsurance);
    sessionStorage.setItem('sessionbuyins', JSON.stringify(this.buyInsurance));
    //var temp = sessionStorage.getItem('sessionbuyins');
    //var sessionbuyInsData = JSON.parse(temp);
    //console.log(sessionbuyInsData);
    this.router.navigateByUrl('/plan-selection');
  }

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

// export class twoWheelerBrand {
//   id:string;
//   name:string;
 
//   constructor(id:string, name:string) {
//     this.id=id;
//     this.name=name;
//   }
// }

export class WheelerModel {
  Brand_Id:number;
  Model_Name:string;
}

export class BuyInsClass {
  veh_type:string;
  brand_name:string;
  model_name:string;
  license_no:string;
  purchase_date:string;
  registeration_number:string;
  engine_number:string;
  vehicleCC:number;
  chassis_number:string;
  market_price:number;

  plan_type:number;
  plan_duration:number;
  total_payable:number;

  card_holder_name:string;
  card_no:number;
  card_exp_month:number;
  card_exp_year:number;
  card_cvc:number;
  

}