import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CRUDApiService } from '../crud-api.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetForm = new FormGroup({
    password : new FormControl('',[Validators.required,Validators.minLength(8), Validators.pattern("(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!%*#?&])[A-Za-z0-9$@$!%*#?&]{8,32}")]),
    cpassword : new FormControl ('', [Validators.required])
  })


  constructor(public crudService: CRUDApiService, private router:Router) { }

  ngOnInit():void {
    
  }

  //convenience getter for easy access to form fields
  get password()
  {
    return this.forgetForm.get('password');
  }

  get cpassword()
  {
    return this.forgetForm.get('cpassword');
  }


  onSubmit()
  {
    //get parameters from URL
    const urlParams = new URLSearchParams(window.location.search);

    //decodes URI by getting the tokens
    const token = decodeURI(urlParams.get('token'));

    // display form values on successfull submission
    console.log(this.forgetForm.value);

    //adding element values to the object of class
    let forgot_pwdobj = new user();
    forgot_pwdobj.token = token;
    forgot_pwdobj.password=this.password.value;
    forgot_pwdobj.message="";

    //api service for forgot password
    this.crudService.reset_pwd(forgot_pwdobj).subscribe(res => {
      console.log(res);

      // display message on successfull service
      if(res == "Successfull")
      {
        console.log("Successfull");    
        window.alert("Password Changed successfully");
        this.router.navigateByUrl('/Login');
      }

      // display message on invalid conditions
      else
      {
        console.log("Failed to change");
        window.alert("Failed to change");
      }
    });
  }
}
//Class Declaration for creating objects to pass in CRUD API Service
export class user
{
  token : string;
  password : string;
  message : string;
}