import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstName : new FormControl('',[Validators.required, Validators.minLength(3) ,Validators.pattern("^[a-zA-Z]+$")]),
    lastName : new FormControl('',[Validators.required]),
    emailid : new FormControl('',[Validators.required, Validators.email]),
    dateofbirth : new FormControl ('',[Validators.required]),
    contactno : new FormControl ('', [Validators.required, Validators.pattern("[0-9]{10}")]),
    address : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required,Validators.minLength(8), Validators.pattern("(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!%*#?&])[A-Za-z0-9$@$!%*#?&]{8,32}")]),
    cpassword : new FormControl ('', [Validators.required])
  })

  constructor() { }

  ngOnInit(){ }

  get firstName()
  {
    return this.registerForm.get('firstName');
  }

  get lastName()
  {
    return this.registerForm.get('lastName');
  }

  get emailid()
  {
    return this.registerForm.get('emailid');
  }

  get dateofbirth()
  {
    return this.registerForm.get('dateofbirth');
  }

  get contactno()
  {
    return this.registerForm.get('contactno');
  }

  get address()
  {
    return this.registerForm.get('address');
  }

  get password()
  {
    return this.registerForm.get('password');
  }

  get cpassword()
  {
    return this.registerForm.get('cpassword');
  }


  onSubmit()
  {
    console.log(this.registerForm.value);
  }

}

export class user
{
  firstName : string;
  lastName : string;
  emailid : string;
  dateofbirth : Date;
  contactno : number;
  address : string;
  password : string;
  cpassword : string;
}
