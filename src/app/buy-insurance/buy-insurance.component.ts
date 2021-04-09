import { Component, OnInit } from '@angular/core';

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

  
  constructor() { }

  ngOnInit(): void {
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

