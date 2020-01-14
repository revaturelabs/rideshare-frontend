

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { AdminfilterPipe } from './pipes/adminfilter.pipe';

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
    AdminfilterPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    CarService,
    BatchService,
    AuthService,
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

