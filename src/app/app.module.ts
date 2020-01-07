import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DriverRegisterComponent } from './components/driver-register/driver-register.component';
import { RiderRegisterComponent } from './components/rider-register/rider-register.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserService } from './services/user-service/user.service';
import { CarService } from './services/car-service/car.service';
import { BatchService } from './services/batch-service/batch.service';
import { CarRegisterComponent } from './components/car-register/car-register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth-service/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MyCarComponent } from './components/my-car/my-car.component';

@NgModule({
  declarations: [
    AppComponent,
    DriverRegisterComponent,
    RiderRegisterComponent,
    AdminComponent,
    CarRegisterComponent,
    LoginComponent,
    NavbarComponent,
    MyCarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    CarService,
    BatchService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
