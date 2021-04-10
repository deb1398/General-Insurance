import { Component, OnInit } from '@angular/core';
//import { EmailValidator } from '@angular/forms';
import { FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class UserHomePageComponent implements OnInit {

  renewForm = new FormGroup({
    policyNumber: new FormControl('',[Validators.required]),
    mobile: new FormControl('',[Validators.required, Validators.pattern("[0-9 ]{10}")]),
    email:new FormControl('',[Validators.email,Validators.required])
  })

  constructor() { }

  ngOnInit(): void {
    
  }

  get policyNumber(){
    return this.renewForm.get('policyNumber');
  }

  get mobile(){
    return this.renewForm.get('mobile');
  }

  get email(){
    return this.renewForm.get('email');
  }

  onSubmit = () => console.log(this.renewForm.value);
}

export class RenewForm {
  policyNumber: number;
  mobile: number;
  email: string;
}
