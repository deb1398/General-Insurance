import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-buy-insurance',
  templateUrl: './buy-insurance.component.html',
  styleUrls: ['./buy-insurance.component.css']
})
export class BuyInsuranceComponent implements OnInit {

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

  buyiForm = new FormGroup({
    vehtype : new FormControl('',[Validators.required]),
    driLicence : new FormControl ('', [Validators.required,Validators.maxLength(16), Validators.pattern("")]),
    purdate : new FormControl('',[Validators.required]),
    regisno : new FormControl('',[Validators.required,Validators.maxLength(10), Validators.pattern("")]),
    engno : new FormControl ('', [Validators.required]),
    chasno : new FormControl('',[Validators.required])
  })


  constructor() { }

  ngOnInit(): void {
  }

  get vehtype()
  {
    return this.buyiForm.get('vehtype');
  }
  get driLicence()
  {
    return this.buyiForm.get('driLicence');
  }
  get purdate()
  {
    return this.buyiForm.get('purdate');
  }
  get regisno()
  {
    return this.buyiForm.get('regisno');
  }
  get engno()
  {
    return this.buyiForm.get('engno');
  }
  get chasno()
  {
    return this.buyiForm.get('chasno');
  }

  onSubmit()
  {
    console.log(this.buyiForm.value);
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

export class user
{
  //vehtype : ;
  driLicence : number;
  purdate: Date;
  regisno : number;
  engno : number;
  chasno : number;
}