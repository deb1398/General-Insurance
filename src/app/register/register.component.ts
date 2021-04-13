import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router} from '@angular/router';

import { CRUDApiService } from '../crud-api.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    firstName : new FormControl('',[Validators.required, Validators.minLength(3) ,Validators.pattern("^[a-zA-Z]+$")]),
    lastName : new FormControl('',[Validators.required]),
    emailid : new FormControl('',[Validators.required, Validators.email]),
    dateofbirth : new FormControl ('',[Validators.required]),
    contactno : new FormControl ('', [Validators.required, Validators.pattern("[0-9]{10}")]),
    address : new FormControl('',[Validators.required]),
    password : new FormControl('',[Validators.required,Validators.minLength(8), Validators.pattern("(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!%*#?&])[A-Za-z0-9$@$!%*#?&]{8,32}")]),
    cpassword : new FormControl ('', [Validators.required])
  })
  // },{ 
  //   validators: this.passwordcheck.bind(this)
  // })

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudService: CRUDApiService
  ) { }

  ngOnInit(){ }

  get firstName()
  {
    return this.registerForm.get('firstName');
  }

  get lastName()
  {
    return this.registerForm.get('lastName');
  }

  get emailid()
  {
    return this.registerForm.get('emailid');
  }

  get dateofbirth()
  {
    return this.registerForm.get('dateofbirth');
  }

  get contactno()
  {
    return this.registerForm.get('contactno');
  }

  get address()
  {
    return this.registerForm.get('address');
  }

  get password()
  {
    return this.registerForm.get('password');
  }

  get cpassword()
  {
    return this.registerForm.get('cpassword');
  }

  // passwordcheck(formGroup: FormGroup) {
  //   const { value: password } = formGroup.get('password');
  //   const { value: confirmPassword } = formGroup.get('cpassword');
  //   return password === confirmPassword ? null : { passwordNotMatch: true };
  // }

  onSubmit()
  {
    console.log(this.registerForm.value);

    let us = new user(
      this.firstName.value+" "+this.lastName.value,
      this.emailid.value,
      this.dateofbirth.value,
      this.contactno.value,
      this.address.value,
      this.password.value,      
      );

    
    this.crudService.create(us).subscribe(res => {
      console.log('User Registrations created!'),
      window.alert('Registration Successful'),
      this.router.navigateByUrl('/Login')
    });
  }

}

export class user
{
  Name : string;
  Email_ID : string;
  DOB : Date;
  Phone_No : number;
  Address : string;
  Password : string;

  constructor(Name : string,
    Email_ID : string,
    DOB : Date,
    Phone_No : number,
    Address : string,
    Password : string)
    {
      this.Name = Name;
      this.Email_ID = Email_ID;
      this.DOB = DOB;
      this.Phone_No = Phone_No;
      this.Address = Address;
      this.Password = Password;
    }
}
