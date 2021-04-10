import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetForm = new FormGroup({
    emailid : new FormControl('',[Validators.required, Validators.email]),
    password : new FormControl('',[Validators.required,Validators.minLength(8), Validators.pattern("(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!%*#?&])[A-Za-z0-9$@$!%*#?&]{8,32}")]),
    cpassword : new FormControl ('', [Validators.required])
  })


  constructor() { }

  ngOnInit(): void {
  }
  get emailid()
  {
    return this.forgetForm.get('emailid');
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
    console.log(this.forgetForm.value);
  }

}
export class user
{
  emailid : string;
  password : string;
  cpassword : string;
}