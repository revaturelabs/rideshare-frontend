import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DriverComponent } from './driver/driver.component';
import { MarkInactiveDriverService } from './mark-inactive-driver.service';
import { Drivers } from './mock-driver';

@NgModule({
  declarations: [
    AppComponent,
    DriverComponent,
    MarkInactiveDriverService,
    Drivers
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
