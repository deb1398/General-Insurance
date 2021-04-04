import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './home/home.component';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {ContactComponent} from './contact/contact.component';
import { BuyInsuranceComponent } from './buy-insurance/buy-insurance.component';
import { from } from 'rxjs';
const routes: Routes = [
  {path:'', component : HomeComponent},
  {path:'Login', component : AdminLoginComponent},
  {path:'Contact', component : ContactComponent},
  {path:'BuyInsurance', component : BuyInsuranceComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
