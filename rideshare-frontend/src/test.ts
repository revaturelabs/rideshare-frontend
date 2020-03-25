// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DriverInfoComponent } from 'src/app/components/driver-info/driver-info.component';
import { DriverComponent } from 'src/app/components/driver/driver.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { AdminLoginComponent } from 'src/app/components/admin-login/admin-login.component';
declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment([
  BrowserDynamicTestingModule,
  HttpClientTestingModule,
  RouterTestingModule,
  AppRoutingModule,
  FormsModule,
],
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
