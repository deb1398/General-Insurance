import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './contact/contact.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';

import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { BuyInsuranceComponent } from './buy-insurance/buy-insurance.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { PlanSelectionComponent } from './plan-selection/plan-selection.component';
import { ClaimDetailsComponent } from './claim-details/claim-details.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

import { FAQComponent } from './faq/faq.component';
import { PremiumCalcComponent } from './premium-calc/premium-calc.component';
import { ClaimInsuranceComponent } from './claim-insurance/claim-insurance.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    NavbarComponent,
    FAQComponent,
    PremiumCalcComponent,
    ClaimInsuranceComponent,
    ContactComponent,
    AdminPageComponent,
    UserHomePageComponent,

    HomeComponent,
    FooterComponent,
    BuyInsuranceComponent,
    AdminLoginComponent,
    PlanSelectionComponent,
    ClaimDetailsComponent,
    RegisterComponent,
    LoginComponent,
    AboutusComponent,
    ForgetPasswordComponent,

    PaymentGatewayComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
