import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-claim-details',
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.css']
})
export class ClaimDetailsComponent implements OnInit {

  claimDetailForm = new FormGroup({
    status: new FormControl('', [Validators.required]),
    amount: new FormControl('',[Validators.required, Validators.pattern("[0-9]")])
  })

  constructor() { }

  ngOnInit(): void {
  }

  get status() {
    return this.claimDetailForm.get('status')
  }

  get amount() {
    return this.claimDetailForm.get('amount')
  }

  viewStatus: status[] = [
    new status("1", "Under Verification"),
    new status('2', 'Approved'),
    new status('3', 'Not Approved')
  ]

  onSubmit = () => console.log(this.claimDetailForm.value);
}


export class status {
  id:string;
  name:string;
 
  constructor(id:string, name:string) {
    this.id=id;
    this.name=name;
  }
}