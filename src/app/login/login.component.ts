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

  //form validations
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
    //creating object to pass details of user in CRUS api service
    let loginobj = new logindetails();
    loginobj.Email_ID = this.username.value;
    loginobj.Password = this.password.value;
    loginobj.message="";

    //gets entire details through CRUD api service
    this.crudService.check(loginobj).subscribe(res => {
      console.log(res);
      if(res.message === "Successfull")
      {
        console.log("Successfull");    
        window.alert("Login Successful");// if email id and password are correct then logged in
        
        //sessions are stored when logged in
        sessionStorage.setItem('User_Id',res.User_Id);
        sessionStorage.setItem('Name',res.Name);
        sessionStorage.setItem('Email_ID',res.Email_ID);
        sessionStorage.setItem('Phone_No',res.Phone_No);
        sessionStorage.setItem('DOB',res.DOB);
        sessionStorage.setItem('Address',res.Address);


        this.router.navigateByUrl('user-home-page');
        console.log(sessionStorage.length);
        this.crudService.loginstatus.next(true);

      }
      else
      {
        console.log("Invalid Username/Password");
        window.alert("Invalid User\nEnter the correct credentials");
      }
    });
  }

}

//class declarations for creating objects to pass in pass CRUD api service
export class logindetails
{
  Email_ID : string;
  Password : string;
  message: string;
}
