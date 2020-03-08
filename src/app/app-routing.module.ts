import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent} from './components/home-page/home-page.component'; //this is home
import { ProfileComponent } from './components/profile/profile.component'; //this is employee-page
import { DriverListComponent } from './Components/driver-list/driver-list.component';

const routes: Routes = [
{path: "home", component: HomePageComponent},
{path: "profile", component: ProfileComponent},
{path:"drivers",component:DriverListComponent},
{path: "**", component: HomePageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
//jkrnhijethnot
export class AppRoutingModule { }
