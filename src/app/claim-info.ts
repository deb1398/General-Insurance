export class ClaimInfo {
    Claim_no : number;
    Policy_No : string;
  Reasons : string;
  Date_claimed : Date;
  Date_of_Loss : Date;
  Place_of_Loss : string;
  Damage_Description : string;
  Injury_to_Thirdparty : boolean;
  Claim_approval_status : string;
  Claim_amt : number;
  constructor(
    Claim_approval_status : string,
  Claim_amt : number
  )
  {
    this.Claim_approval_status=Claim_approval_status;
    this.Claim_amt=Claim_amt;
  }
}
