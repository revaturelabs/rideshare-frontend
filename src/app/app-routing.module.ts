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
import { DriverInfoComponent } from './components/driver-info/driver-info.component';


const routes: Routes = [{
  path: 'home',
  component: DriverInfoComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'admin',
  component: AdminComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'new/car',
  component: CarRegisterComponent
}, {
  path: 'driver',
  component: DriverComponent
},{
  path: 'car',
  component: MyCarComponent
}, {
  path: 'profile',
  component: ProfileComponent
},  {
  path: 'preference',
  component: PreferenceComponent
},{
  path: '**',
  pathMatch: 'full',
  redirectTo: ''
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
