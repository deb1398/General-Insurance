
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';
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
    license_no : new FormControl('',[Validators.required, Validators.minLength(16),Validators.pattern("(?=.[A-Z]{2})(?=.[0-9]{2})[A-Za-z0-9]{16}")]),
    purchase_date : new FormControl('',[Validators.required]),
    registeration_number : new FormControl('',[Validators.required, Validators.minLength(10),Validators.pattern("(?=.[A-Z]{2})(?=.[0-9]{2})[A-Za-z0-9]{10}")]),
    engine_number : new FormControl('',[Validators.required]),
    chassis_number : new FormControl('',[Validators.required])
  })

  fourWheelerBrandsList:fourWheelerBrand[] = [
    
    new fourWheelerBrand("1", "Hyundai"),
    new fourWheelerBrand('2', 'Toyota'),
    new fourWheelerBrand('3', 'Tata'),
    new fourWheelerBrand('3', 'Kia'),
    new fourWheelerBrand('3', 'MG'),
    new fourWheelerBrand('4', 'Mahindra'),
    new fourWheelerBrand('5', 'Maruti'),
    new fourWheelerBrand('6', 'Honda'),
    new fourWheelerBrand('7', 'Volkswagen'),
    new fourWheelerBrand('8', 'Renault'),
    new fourWheelerBrand('9', 'Skoda'),
  ];
  
  fourWheelerModelsList:fourWheelerModel[] = [
    
    new fourWheelerModel("1", "Xcent"),
    new fourWheelerModel('2', 'i20'),
    new fourWheelerModel('3', 'i10'),
    new fourWheelerModel('4', 'Sonata'),
    new fourWheelerModel('5', 'Eon'),
    new fourWheelerModel('6', 'Accent'),
    new fourWheelerModel('7', 'Creta'),
    new fourWheelerModel('8', 'Aura'),
    new fourWheelerModel('9', 'Verna'),
  ];

  constructor() { }

  ngOnInit(): void {
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

  onSubmit()
  {
    
    console.log(this.buyinsuranceForm.value);
  }

}

export class fourWheelerBrand {
  id:string;
  name:string;
 
  constructor(id:string, name:string) {
    this.id=id;
    this.name=name;
  }
}
export class twoWheelerBrand {
  id:string;
  name:string;
 
  constructor(id:string, name:string) {
    this.id=id;
    this.name=name;
  }
}

export class fourWheelerModel {
  id:string;
  name:string;
 
  constructor(id:string, name:string) {
    this.id=id;
    this.name=name;
  }
}