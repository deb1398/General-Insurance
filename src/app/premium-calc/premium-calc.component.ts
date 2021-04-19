import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { CRUDApiService } from '../crud-api.service';
import { PremiumAmount } from '../plan-selection/plan-selection.component';

@Component({
  selector: 'app-premium-calc',
  templateUrl: './premium-calc.component.html',
  styleUrls: ['./premium-calc.component.css']
})

export class PremiumCalcComponent implements OnInit {
  

  public vehicle_typeg:string;
  public getbrands(vehicle_type:string)
  {
    this.vehicle_typeg = vehicle_type;
    this.BrandsList = [];
    this.ModelsList = [];

    let vehtypeobj = new vehicletypeclass();
    vehtypeobj.vehicle_type = vehicle_type;
    this.crudService.getBrands(vehtypeobj).subscribe(res => {
      res.forEach(element => {
        console.log(element.brand_names)
        console.log(element.Brand_Id)
        let c = new Brand(element.Brand_Id,element.brand_names);
        this.BrandsList.push(c);
      });
    });
    
  }


  public getmodels(Brand_Id)
  {
    //console.log(Brand_Id[3]+""+Brand_Id);

    var index = Brand_Id.indexOf(":")
    var id = Brand_Id.substring(index+1,);
    this.ModelsList = [];
    
    let brandidobj = new brandidclass();
    brandidobj.Brand_Id = id;
    brandidobj.vehicle_type = this.vehicle_typeg;
    this.crudService.getModels(brandidobj).subscribe(res => {
      console.log(res)
      res.forEach(element => {
        console.log(element.Model_Name)
        let c = new Brand(1,element.Model_Name);
        this.ModelsList.push(c);
      });
    });
    

  }

  

  public BrandsList:Brand[] =[];
  public ModelsList:Model[] =[];


  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CRUDApiService,
    
  ) { }


  calcForm = new FormGroup({
    veh_type: new FormControl('',[Validators.required]),
    brand_name: new FormControl('',[Validators.required]),
    model_name: new FormControl('',[Validators.required]),
    market_price: new FormControl('',[Validators.required, Validators.pattern("[0-9]{4,7}")]),
    veh_cc: new FormControl('',[Validators.required]),
    veh_pur_date: new FormControl('',[Validators.required,this.dateValidator]),
    
   
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

  maxdate:Date;
  ngOnInit(): void {

    this.maxdate = new Date(Date.now());

  }

  idv:Number=0;
  basic_third_party:number=0;
  basic_own_damage:number=0;


  net_premium_tp:number=0;
  net_premium_comp:number=0;
  
  gst_tp:number=0;
  gst_comp:number=0;

  total_premium_tp:number=0;
  total_premium_comp:number=0;
  
  onSubmit()
  {
    let premamtobj = new PremiumAmount();
    premamtobj.Model_Name = this.model_name.value;
    premamtobj.vehicle_cc = this.veh_cc.value;
    premamtobj.vehicle_type = this.veh_type.value;
    
    let timeDiff = Math.abs(Date.now() - new Date(this.veh_pur_date.value).getTime())
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    premamtobj.age = age;
  
    this.crudService.getpremfacors(premamtobj).subscribe((data) => {
      console.log(data);
      this.idv = this.market_price.value - (data.dep_per/100 * this.market_price.value);
      this.basic_third_party = data.thirdpartyprem;
      this.basic_own_damage = data.od_prem_per/100 * Number(this.idv);
      
      this.net_premium_comp = this.basic_third_party + this.basic_own_damage;
      this.net_premium_tp = this.basic_third_party

      this.gst_tp = 18/100 * this.net_premium_tp;
      this.gst_comp = 18/100 * this.net_premium_comp;

      this.total_premium_tp = this.gst_tp + this.net_premium_tp;
      this.total_premium_comp = this.gst_comp + this.net_premium_comp;

      
      console.log(this.idv);

    });
    
    console.log(this.calcForm.value);
  }

}

export class vehicletypeclass
{
  vehicle_type:string;
}

export class brandidclass
{
  Brand_Id:number;
  vehicle_type:string;
}


export class Brand {
  id:number;
  name:string;
 
  constructor(id:number, name:string) {
    this.id=id;
    this.name=name;
  }
}


export class Model {
  id:number;
  name:string;
 
  constructor(id:number, name:string) {
    this.id=id;
    this.name=name;
  }
}
