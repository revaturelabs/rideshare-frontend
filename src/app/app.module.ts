// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';

// import { AppRoutingModule } from './app-routing.module';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms';
// import { AppComponent } from './app.component';
// import { DriverComponent } from './driver/driver.component';
// import { MarkInactiveDriverService } from './mark-inactive-driver.service';
// import { Drivers } from './mock-driver';


// @NgModule({
//   declarations: [
//     AppComponent,
//     DriverComponent,
//     MarkInactiveDriverService,
//     Drivers
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     HttpClientModule,
//     FormsModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AdminbanComponent } from './adminban/adminban.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminbanComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

