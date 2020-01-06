import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CarRegisterComponent } from './components/car-register/car-register.component';
import { DriverRegisterComponent } from './components/driver-register/driver-register.component';
import { LoginComponent } from './components/login/login.component';
import { DriverComponent } from './driver/driver.component';


const routes: Routes = [{
  path: 'home',
  component: AdminComponent
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'register',
  component: DriverRegisterComponent
}, {
  path: 'new/car',
  component: CarRegisterComponent
}, {
  path: 'driver',
  component: DriverComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
