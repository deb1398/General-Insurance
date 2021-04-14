import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  
  Name:string = sessionStorage.getItem('Name');
  Email_ID:string = sessionStorage.getItem('Email_ID');
  Phone_No:string = sessionStorage.getItem('Phone_No');
  DOB:string = sessionStorage.getItem('DOB');
  Address:string = sessionStorage.getItem('Address');

  ngOnInit(): void {
  }

}
