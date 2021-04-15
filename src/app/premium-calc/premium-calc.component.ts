import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CRUDApiService } from '../crud-api.service';

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
        console.log(element.model_name)
        let c = new Brand(element.Model_Name,element.Model_Name);
        this.ModelsList.push(c);
      });
    });
    

  }

  

  public BrandsList:Brand[] =[];
  public ModelsList:Model[] =[];


  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CRUDApiService
  ) { }


  calcForm = new FormGroup({
    veh_type: new FormControl('',[Validators.required]),
    brand_name: new FormControl('',[Validators.required]),
    model_name: new FormControl('',[Validators.required]),
    market_price: new FormControl('',[Validators.required, Validators.pattern("[0-9]{4,7}")]),
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
