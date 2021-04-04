import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './contact/contact.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
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
    PaymentGatewayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
