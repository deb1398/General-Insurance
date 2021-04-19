import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CRUDApiService } from '../crud-api.service';
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

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CRUDApiService) { }

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
    let loginobj = new logindetails();
    loginobj.Admin_id = this.username.value;
    loginobj.Password = this.password.value;
    loginobj.message="";

    this.crudService.checkAdmin(loginobj).subscribe(res => {
      console.log(res);
      if(res.message === "Successfull")
      {
        console.log("Successfull");    
        window.alert("Login Successful");
        
        sessionStorage.setItem('Admin_id',res.Admin_id);

        this.router.navigateByUrl('/admin-page');
        console.log(sessionStorage.length);
        this.crudService.loginstatus.next(true);

      }
      else
      {
        console.log("Invalid Username/Password");
        window.alert("Invalid User\nEnter the correct credentials");
        //this.Display Error Message
      }
    });
  }
}
export class logindetails
{
  Admin_id : string;
  Password : string;
  message: string;
}
