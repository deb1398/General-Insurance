import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { LoginComponent} from './login/login.component';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {ContactComponent} from './contact/contact.component';
import { BuyInsuranceComponent } from './buy-insurance/buy-insurance.component';
import { AboutusComponent} from './aboutus/aboutus.component';
import { ForgetPasswordComponent} from './forget-password/forget-password.component';
import { RegisterComponent} from './register/register.component';
import { from } from 'rxjs';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FAQComponent } from './faq/faq.component';
import { ClaimInsuranceComponent } from './claim-insurance/claim-insurance.component';
import { PlanSelectionComponent } from './plan-selection/plan-selection.component';
import { PremiumCalcComponent } from './premium-calc/premium-calc.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ClaimDetailsComponent } from './claim-details/claim-details.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
const routes: Routes = [
  {path:'', component : HomeComponent},
  {path:'Login', component : LoginComponent},
  {path:'Adminlogin', component : AdminLoginComponent},
  {path:'Contact', component : ContactComponent},
  {path:'BuyInsurance', component : BuyInsuranceComponent},
  {path:'AboutUs', component : AboutusComponent},
  {path:'ForgetPwd', component : ForgetPasswordComponent},
  {path:'register', component : RegisterComponent},
  {path:'user-profile', component : UserProfileComponent},
  {path:'premium-calc', component : PremiumCalcComponent},
  {path:'plan-selection', component : PlanSelectionComponent},
  {path:'claim-insurance', component : ClaimInsuranceComponent},
  {path:'faq', component : FAQComponent},
  {path:'admin-page', component : AdminPageComponent},
  {path:'user-home-page', component : UserHomePageComponent},
  {path:'payment-gateway', component : PaymentGatewayComponent},
  {path:'claim-details', component : ClaimDetailsComponent}
  

  
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
