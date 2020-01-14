import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CarRegisterComponent } from './components/car-register/car-register.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { LoginComponent } from './components/login/login.component';
import { MyCarComponent } from './components/my-car/my-car.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PreferenceComponent } from './components/preference/preference.component';


const routes: Routes = [{
  path: 'home',
  component: AdminComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'register',
  component: UserRegisterComponent
}, {
  path: 'new/car',
  component: CarRegisterComponent
}, {
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
