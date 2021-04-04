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
const routes: Routes = [
  {path:'', component : HomeComponent},
  {path:'Login', component : LoginComponent},
  {path:'AdminLogin', component : AdminLoginComponent},
  {path:'Contact', component : ContactComponent},
  {path:'BuyInsurance', component : BuyInsuranceComponent},
  {path:'AboutUs', component : AboutusComponent},
  {path:'ForgetPwd', component : ForgetPasswordComponent},
  {path:'register', component : RegisterComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
