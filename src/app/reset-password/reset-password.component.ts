import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm = new FormGroup({
    emailid : new FormControl('',[Validators.required, Validators.email])
  })


  constructor() { }

  ngOnInit(): void {
  }
  get emailid()
  {
    return this.resetForm.get('emailid');
  }
  onSubmit()
  {
    console.log(this.resetForm.value);
  }

}
export class user
{
  emailid : string;
}
