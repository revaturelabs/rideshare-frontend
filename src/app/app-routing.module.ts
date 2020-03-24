import { NgModule, Component, Type } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
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
import { ProfileContactComponent } from './components/profile-contact/profile-contact.component';
import { ProfileCarComponent } from './components/profile-car/profile-car.component';
import { ProfileMembershipComponent } from './components/profile-membership/profile-membership.component';
import { ProfileLocationComponent } from './components/profile-location/profile-location.component';
import { DriverContactModalComponent } from './components/driver-contact-modal/driver-contact-modal.component';
import { DriverListComponent } from './components/driver-list/driver-list.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';


const routes: Routes = [
  { path: 'home/drivers', component: DriverInfoComponent },
  { path: 'home/riders', component: DriverComponent },
  { path: 'all-drivers', component: DriverInfoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/admin', component: AdminLoginComponent },
  { path: 'login/adminhome', component: AdminComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'new/car', component: CarRegisterComponent },
  { path: 'car', component: MyCarComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'preference', component: PreferenceComponent },
  { path: 'signup', component: SignupModalComponent },
  { path: 'drivers', component: DriverListComponent },
  { path: 'profile/contact', component: ProfileContactComponent },
  { path: 'profile/car', component: ProfileCarComponent },
  { path: 'profile/membership', component: ProfileMembershipComponent },
  { path: 'profile/location', component: ProfileLocationComponent },
  { path: 'driver', component: DriverContactModalComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: '', component: HomePageComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


/**
 * Function that provides a component list for testing
 * classes that leverage the router.  For whatever reason
 * the test classes require declarations for every component
 * used in the router, even when it is being mocked. There
 * should be a more elegant solution for this as I have not
 * had to do this in older projects - for the time being this
 * helper function can be used to keep unit test component
 * declarations up to date with the router's components.
 */
export const getRoutableComponents = () => {
  const components = new Set<Type<any>>();
  const routeQueue: Routes[] = [];

  routeQueue.push(routes);
  while (routeQueue.length > 0) {
    const currentRoutes = routeQueue.pop();
    currentRoutes.forEach((r) => {
      if (r.component) {
        components.add(r.component);
      }

      if (r.children) {
        routeQueue.push(r.children);
      }
    });
  }
  return components;
};
