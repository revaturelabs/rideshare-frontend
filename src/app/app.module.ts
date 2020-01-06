

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AdminbanComponent } from './adminban/adminban.component';
import { DriverComponent} from './driver/driver.component';
import { TableFilterPipe } from './table-filter-pipe';


@NgModule({
  declarations: [
    AppComponent,
    AdminbanComponent,
    DriverComponent,
    TableFilterPipe
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

