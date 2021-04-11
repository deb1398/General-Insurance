import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-premium-calc',
  templateUrl: './premium-calc.component.html',
  styleUrls: ['./premium-calc.component.css']
})
export class PremiumCalcComponent implements OnInit {

  

  fourWheelerBrandsList:fourWheelerBrand[] = [
    
    new fourWheelerBrand("1", "Hyundai"),
    new fourWheelerBrand('2', 'Toyota'),
    new fourWheelerBrand('3', 'Tata'),
    new fourWheelerBrand('4', 'Mahindra'),
    new fourWheelerBrand('5', 'Maruti'),
    new fourWheelerBrand('6', 'Honda'),
    new fourWheelerBrand('7', 'Volkswagen'),
    new fourWheelerBrand('8', 'Renault'),
    new fourWheelerBrand('9', 'Volkswagen'),
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

  constructor(
    public fb: FormBuilder,
    private router: Router
  ) { }


  calcForm = new FormGroup({
    veh_type: new FormControl('',[Validators.required]),
    brand_name: new FormControl('',[Validators.required]),
    model_name: new FormControl('',[Validators.required]),
    market_price: new FormControl('',[Validators.required]),
    veh_cc: new FormControl('',[Validators.required]),
    veh_pur_date: new FormControl('',[Validators.required]),
    
   
  })

  get veh_type()
  { 
    return this.calcForm.get('veh_type');
  }
  get brand_name()
  { 
    return this.calcForm.get('brand_name');
  }
  get model_name()
  { 
    return this.calcForm.get('model_name');
  }
  get market_price()
  { 
    return this.calcForm.get('market_price');
  }
  get veh_cc()
  { 
    return this.calcForm.get('veh_cc');
  }
  get veh_pur_date()
  { 
    return this.calcForm.get('veh_pur_date');
  }

  ngOnInit(): void {

  }

  onSubmit()
  {
    
    console.log(this.calcForm.value);
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
