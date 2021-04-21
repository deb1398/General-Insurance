import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CRUDApiService } from '../crud-api.service';
import { ClaimInfo} from '../claim-info'

@Component({
  selector: 'app-claim-details',
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.css']
})
export class ClaimDetailsComponent implements OnInit {

  Claim_no : number;
  Claim_info:ClaimInfo

  claimDetailForm = new FormGroup({
    status: new FormControl('', [Validators.required]),
    amount: new FormControl('',[Validators.required, Validators.pattern("[0-9]")])
  })

  
  constructor(public service: CRUDApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    //get parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    this.Claim_no = Number(urlParams.get('Claim_no')) ;

    //api service for displaying claim details of user
    this.service.getdetailsById(this.Claim_no).subscribe((data : ClaimInfo)=>{
      this.Claim_info=data;
      this.amount.setValue(this.Claim_info.Claim_amt);
    })
    }

    //convenience getter for easy access to form fields

  get status() {
    return this.claimDetailForm.get('status')
  }

  get amount() {
    return this.claimDetailForm.get('amount')
  }

  viewStatus: status[] = [
    new status("Under Verification"),
    new status('Approved'),
    new status('Not Approved')
  ]

  onSubmit() {
    // display form values on successfull submission
    console.log(this.claimDetailForm.value);

    //adding element values to the object of claim information class
    let cl = new ClaimInfo(
      this.status.value,
      this.amount.value
    );

    //api service for updating claim details
    this.service.updateclaims(this.Claim_no,cl).subscribe(res => {
      console.log("Claim Info Updated Successfully");
      this.router.navigateByUrl('admin-page');
    })
  } 
}

//Class Declaration for creating objects to pass in CRUD API Service
export class status {
  name:string;
 
  constructor(name:string) {
    this.name=name;
  }
}