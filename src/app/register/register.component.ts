import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from '../crud.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public fb: FormBuilder,
    private router: Router,
    public crudservice : CrudService
  ) { }

  registerForm = new FormGroup({
    firstName: new FormControl('',[Validators.required,Validators.pattern("[a-zA-Z]{0,}")]),
    lastName: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    dob: new FormControl('',[Validators.required]),
    contact : new FormControl('', [Validators.required, Validators.pattern("[0-9]{10}")]),
    address: new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}')]),
    cpassword: new FormControl('', [Validators.required])
  })

  get firstName()
  {
    return this.registerForm.get('firstName');
  }
  get lastName()
  {
    return this.registerForm.get('lastName');
  }
  get email()
  {
    return this.registerForm.get('email');
  }
  get dob()
  {
    return this.registerForm.get('dob');
  }
  get contact()
  {
    return this.registerForm.get('contact');
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

  ngOnInit(): void {
  }


  submitForm() {
    this.crudservice.create(this.registerForm.value).subscribe(res => {
      console.log('User Registrations created!'),
      this.router.navigateByUrl('')
    });
  }

}
