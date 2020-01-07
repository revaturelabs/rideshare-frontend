import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CarRegisterComponent } from './components/car-register/car-register.component';
import { DriverRegisterComponent } from './components/driver-register/driver-register.component';
import { RiderRegisterComponent } from './components/rider-register/rider-register.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [{
  path: 'home',
  component: AdminComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'registerDriver',
  component: DriverRegisterComponent
}, {
  path: 'registerRider',
  component: RiderRegisterComponent
}, {
  path: 'new/car',
  component: CarRegisterComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
