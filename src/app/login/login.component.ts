import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CRUDApiService } from '../crud-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required])
  })

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CRUDApiService) { }

  ngOnInit(): void {
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
    let loginobj = new logindetails();
    loginobj.Email_ID = this.username.value;
    loginobj.Password = this.password.value;
    loginobj.message="";

    this.crudService.check(loginobj).subscribe(res => {
      console.log(res);
      if(res.message === "Successfull")
      {
        
        console.log("Successfull");        
        sessionStorage.setItem('User_Id',res.User_Id);
        localStorage.setItem('Name',res.Name);
        localStorage.setItem('Email_ID',res.Email_ID);
        localStorage.setItem('Phone_No',res.Phone_No);
        localStorage.setItem('DOB',res.DOB);
        localStorage.setItem('Address',res.Address);

        this.router.navigateByUrl('user-home-page');

      }
      else
      {
        console.log("Invalid Username/Password");
        //this.Display Error Message
      }
    });
  }

}
export class logindetails
{
  Email_ID : string;
  Password : string;
  message: string;
}
