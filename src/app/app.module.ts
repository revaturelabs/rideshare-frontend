import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';//this is home
//import { RegisterComponent } from './components/register/register.component';//this is register
import { LoginComponent } from './components/login/login.component';//this is login
// import { AdminComponent } from './components/admin/admin.component';//this is manager-page
import { ProfileComponent } from './components/profile/profile.component';//this is employee-page
import { ShowDriversComponent } from './components/show-drivers/show-drivers.component';//this is show-drivers
import { MapComponent } from './components/map/map.component';//this is map
import { DriverListComponent } from './Components/driver-list/driver-list.component';//this is drivers-list
import { ProfileContactComponent } from './components/profile-contact/profile-contact.component';//this is edit-contact
import { ProfileLocationComponent } from './components/profile-location/profile-location.component';//this is edit-location
import { ProfileCarComponent } from './components/profile-car/profile-car.component';//this is edit-car
import { EditOfficeComponent } from './components/edit-office/edit-office.component';//this is edit-office
import { NavbarComponent } from './components/navbar/navbar.component';//this is nav-bar
// import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';//this is manager-edit-employee
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'node_modules/ngx-bootstrap';
// import { RegisterComponent } from './Components/register/register.component';
import { SignupModalComponent } from './components/sign-up-modal/sign-up-modal.component';
// import { ProfileMembershipComponent } from './components/profile-membership/profile-membership.component'
import { DriverContactModalComponent } from './components/driver-contact-modal/driver-contact-modal.component';
import { ManagerEditComponent } from './components/manager-edit/manager-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ManagerStatusPipe } from './pipes/manager-status.pipe';

@NgModule({
  declarations: [
    DriverContactModalComponent,
    AppComponent,
    HomePageComponent,
    // RegisterComponent,
    LoginComponent,
    // AdminComponent,
    ProfileComponent,
    ShowDriversComponent,
    MapComponent,
    DriverListComponent,
    ProfileContactComponent,
    ProfileLocationComponent,
    ProfileCarComponent,
    EditOfficeComponent,
    NavbarComponent,
    // EditEmployeeComponent,
    SignupModalComponent,

    // ProfileMembershipComponent,
    ManagerEditComponent,
    ManagerStatusPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // FontAwesomeModule,
    HttpClientModule,
    NgbModule,
    ModalModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
