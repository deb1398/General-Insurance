import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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


  constructor(public crudService: CRUDApiService) { }

  ngOnInit():void {
    
  }
  
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
    const urlParams = new URLSearchParams(window.location.search);
    const token = decodeURI(urlParams.get('token'));
    console.log(token);
    console.log(decodeURI(token));

    console.log(this.forgetForm.value);
    let forgot_pwdobj = new user();
    forgot_pwdobj.token = token;
    forgot_pwdobj.password=this.password.value;
    forgot_pwdobj.message="";

    this.crudService.reset_pwd(forgot_pwdobj).subscribe(res => {
      console.log(res);
      //window.alert(res);
      if(res == "Successfull")
      {
        console.log("Successfull");    
        window.alert("Password Changed successfully");
      }
      else
      {
        console.log("Failed to change");
        window.alert("Failed to change");
        //this.Display Error Message
      }
    });
  }
}

export class user
{
  token : string;
  password : string;
  message : string;
  //cpassword : string;
}