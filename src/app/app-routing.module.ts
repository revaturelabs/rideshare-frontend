import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowDriversComponent } from './components/show-drivers/show-drivers.component';
import { HomePageComponent} from './components/home-page/home-page.component'; //this is home
import { ProfileComponent } from './components/profile/profile.component'; //this is employee-page
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component'; //this is manager-page
import { DriverListComponent } from './Components/driver-list/driver-list.component';

const routes: Routes = [

{path: "drivers", component: ShowDriversComponent},
{path: "home", component: HomePageComponent},
{path: "profile", component: ProfileComponent},
{path: "register", component: RegisterComponent},
{path: "login", component: LoginComponent},
{path: "manager", component: AdminComponent},
{path:"driverlist",component:DriverListComponent},
{path: "**", component: HomePageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
