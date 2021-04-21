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

  //convenience getter for easy access to form fields
  get emailid()
  {
    return this.resetForm.get('emailid');
  }

  onSubmit()
  {

    // display form values on successfull submission
    console.log(this.resetForm.value);

    //adding element values to the object of class
    let resetobj = new user();
    resetobj.Email_ID = this.emailid.value;
    resetobj.message="";

    //api service for reset password
    this.crudService.mail(resetobj).subscribe(res => {
      console.log(res);
      
      // display message on successfull service
      if(res == "Successfull")
      { 
        window.alert("Mail Sent successfully");
      }

      // display message on invalid conditions
      else
      {
        console.log("Failed to sent");
        window.alert("Failed to sent");
      }
    });
  }
}

//Class Declaration for creating objects to pass in CRUD API Service
export class user
{
  Email_ID : string;
  message : string;
}
