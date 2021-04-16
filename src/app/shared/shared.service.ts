import { Injectable } from '@angular/core';
import { BuyInsClass } from '../buy-insurance/buy-insurance.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  buyInsuranceData: BuyInsClass;

  constructor() { }

  setBuyInsData(data){
    this.buyInsuranceData = data;
  }

  
  getBuyInsData(){
    return this.buyInsuranceData;
  }
}
