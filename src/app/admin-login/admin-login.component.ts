import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginForm = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required])
  })

  constructor() { }

  ngOnInit() {
  }

  get username()
  {
    return this.loginForm.get('username');
  }

  get password()
  {
    return this.loginForm.get('password');
  }

  onSubmit()
  {
    console.log(this.loginForm.value);
  }
}
export class logindetails
{
  Email_ID : string;
  Password : string;
}
