import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BuyInsClass } from '../buy-insurance/buy-insurance.component';
import { SharedService } from '../shared/shared.service';

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

  constructor(public shared: SharedService) { }

  buyInsData: BuyInsClass;

  ngOnInit(): void {
    this.buyInsData = this.shared.getBuyInsData();
    console.log(this.buyInsData);
  }
  
  get planType(){
    return this.planForm.get('planType');
  }

  get planDuration(){
    return this.planForm.get('planDuration');
  }

  onSubmit = () => console.log(this.planForm.value);
}

export class Plan {
  planType: string;
  PlanDuration: string;
}