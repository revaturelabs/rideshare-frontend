import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CarRegisterComponent } from './components/car-register/car-register.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DriverComponent } from './components/driver/driver.component';
import { MyCarComponent } from './components/my-car/my-car.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PreferenceComponent } from './components/preference/preference.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { DriverInfoComponent } from './components/driver-info/driver-info.component';
import { SignupModalComponent } from './components/sign-up-modal/sign-up-modal.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ProfileContactComponent } from './components/profile-contact/profile-contact.component';
import { ProfileCarComponent } from './components/profile-car/profile-car.component';
import { ProfileMembershipComponent } from './components/profile-membership/profile-membership.component';
import { ProfileLocationComponent } from './components/profile-location/profile-location.component';
import { DriverContactModalComponent } from './components/driver-contact-modal/driver-contact-modal.component';
import { DriverListComponent } from './components/driver-list/driver-list.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';


const routes: Routes = [
  {path: 'home/drivers', component: DriverInfoComponent},
  {path: 'home/riders', component: DriverComponent}, 
  {path: 'all-drivers', component: DriverInfoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login/admin', component: AdminLoginComponent},
  {path: 'login/adminhome', component: AdminComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'new/car', component: CarRegisterComponent},
  {path: 'car', component: MyCarComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'preference', component: PreferenceComponent},
  {path: 'signup', component: SignupModalComponent},
  {path: 'landingPage', component: LandingPageComponent},
  {path: 'drivers', component: DriverListComponent},
{path: 'profile/contact', component: ProfileContactComponent},
{path: 'profile/car', component: ProfileCarComponent},
{path: 'profile/membership', component: ProfileMembershipComponent},
{path: 'profile/location', component: ProfileLocationComponent},
{path: 'driver', component: DriverContactModalComponent},
{path: 'navbar', component: NavbarComponent},
{path: '', component: HomePageComponent},
{path: '**', pathMatch: 'full', redirectTo: ''}];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
