import { iLinklogin } from './login/iLinklogin';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// //import * as $ from 'jquery';  //定义jquery
// import * as echarts from 'echarts';//引入echarts的变量
// import swal from 'sweetalert2';//sweetalert2 
// declare let BMap, BMapLib;

import { AppRoutingModule } from './app-rounting.module';
import { AppComponent } from './app.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './tool/services/auth-guard.service';
import { GlobalService } from './tool/services/global';

declare var $: any;

@NgModule({
  declarations: [
    AppComponent,
    iLinklogin,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AuthGuard,GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
