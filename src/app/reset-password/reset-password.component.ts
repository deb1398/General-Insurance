import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { CRUDApiService } from '../crud-api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm = new FormGroup({
    emailid : new FormControl('',[Validators.required, Validators.email])
  })


  constructor(public crudService: CRUDApiService) { }

  ngOnInit(): void {
    
  }
  get emailid()
  {
    return this.resetForm.get('emailid');
  }
  onSubmit()
  {
    
    console.log(this.resetForm.value);
    let resetobj = new user();
    resetobj.Email_ID = this.emailid.value;
    resetobj.message="";

    this.crudService.mail(resetobj).subscribe(res => {
      console.log(res);
      //window.alert(res);
      if(res == "Successfull")
      {
        //console.log("Successfull");    
        window.alert("Mail Sent successfully");
      }
      else
      {
        console.log("Failed to sent");
        window.alert("Failed to sent");
        //this.Display Error Message
      }
    });
  }
}
export class user
{
  Email_ID : string;
  message : string;
}
