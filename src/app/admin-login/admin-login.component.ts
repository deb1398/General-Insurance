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

  //convenience getter for easy access to form fields
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

     // display form values on successfull submission
    console.log(this.loginForm.value);

    //adding element values to the object of class
    let loginobj = new logindetails();
    loginobj.Admin_id = this.username.value;
    loginobj.Password = this.password.value;
    loginobj.message="";

    //api service for Admin Login
    this.crudService.checkAdmin(loginobj).subscribe(res => {
      console.log(res);

      // display message on successfull service
      if(res.message === "Successfull")
      {
        console.log("Successfull");    
        window.alert("Login Successful");
        
        //set session storage for username
        sessionStorage.setItem('Admin_username',res.Admin_id);

        //redirecting to another page
        this.router.navigateByUrl('/admin-page');
        console.log(sessionStorage.length);
        this.crudService.adminstatus.next(true);

      }

       // display message on invalid conditions
      else
      {
        console.log("Invalid Username/Password");
        window.alert("Invalid User\nEnter the correct credentials");
      }
    });
  }
}

//Class Declaration for creating objects to pass in CRUD API Service
export class logindetails
{
  Admin_id : string;
  Password : string;
  message: string;
}
