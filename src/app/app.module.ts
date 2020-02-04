

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'node_modules/ngx-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { DriverComponent} from './components/driver/driver.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserService } from './services/user-service/user.service';
import { CarService } from './services/car-service/car.service';
import { BatchService } from './services/batch-service/batch.service';
import { CarRegisterComponent } from './components/car-register/car-register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth-service/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MyCarComponent } from './components/my-car/my-car.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PreferenceComponent } from './components/preference/preference.component';
import { ValidationService } from './services/validation-service/validation.service';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DriverInfoComponent } from './components/driver-info/driver-info.component';
import { LandingComponent } from './components/landing/landing.component';
import { SignupModalComponent } from './components/sign-up-modal/sign-up-modal.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ProfileContactComponent } from './components/profile-contact/profile-contact.component';
import { ProfileCarComponent } from './components/profile-car/profile-car.component';
import { ProfileLocationComponent } from './components/profile-location/profile-location.component';
import { ProfileMembershipComponent } from './components/profile-membership/profile-membership.component';
import { DriverContactModalComponent } from './components/driver-contact-modal/driver-contact-modal.component';
import { DriverListComponent } from './components/driver-list/driver-list.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    DriverComponent,
    AdminComponent,
    LoginComponent,
    CarRegisterComponent,
    LoginComponent,
    NavbarComponent,
    MyCarComponent,
    ProfileComponent,
    PreferenceComponent,
    AdminLoginComponent,
    DriverInfoComponent,
    LandingComponent,
    SignupModalComponent,
    LandingPageComponent,
    ProfileContactComponent,
    ProfileCarComponent,
    ProfileLocationComponent,
    ProfileMembershipComponent,
    DriverContactModalComponent,
    DriverListComponent,
    UserRegisterComponent,
    HomePageComponent,
    BsNavbarComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    NgbModule
  ],
  providers: [
    UserService,
    CarService,
    BatchService,
    AuthService,
    ValidationService,
    BsModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

