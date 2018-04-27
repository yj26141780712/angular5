import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  RouterModule,
  Routes
} from '@angular/router';

//import * as $ from 'jquery';  //定义jquery
import * as echarts from 'echarts';//引入echarts的变量
import swal from 'sweetalert2';//sweetalert2 
declare let BMap,BMapLib; 

import {AppRoutingModule} from './app-rounting.module';
import { AppComponent } from './app.component';
import { IlinkMapComponent } from './ilink-map/ilink-map.component';
import { ProduceListComponent } from './produce-list/produce-list.component';
import { TimeDataComponent} from './time-data/time-data.component';
import { SearchMachineidComponent} from './search-machineid/search-machineid.component';
import {NavigationComponent} from './produce-list/navigation';
import {ProduceTable} from './produce-list/produce-table';
import {ModuleTable} from './produce-list/module-table';
import {RemotelyComponent}from './remotely/remotely.component';
import {ShutDown} from './remotely/ShutDown';
import {ParamMessage} from './remotely/paramMessage';
import {ProduceData} from './remotely/produceData';
import {TimelyTemperature} from './remotely/timelyTemperature';
import {SmoothMessage}from './remotely/smoothMessage';
import {selectAddress} from './remotely/selectAddress';
import {Machine}from './file-management/Machine';
import {AreaManagement}from './file-management/areaManagement';
import {Employee}from './file-management/employee';
import {Company}from './file-management/company';
import {OperationLog} from './file-management/OperationLog';
import {iLinklogin} from './iLinklogin';
import {Client}from './file-management/client';
import {LocationStrategy,HashLocationStrategy} from '@angular/common';
import { Global } from './services/global';
declare var $:any;

@NgModule({
  declarations: [
    AppComponent,
    IlinkMapComponent,
    ProduceListComponent,
    TimeDataComponent,
    SearchMachineidComponent,
    NavigationComponent,
    ProduceTable,
    ModuleTable,
    RemotelyComponent,
    ShutDown,
    ParamMessage,
    ProduceData,
    TimelyTemperature,
    SmoothMessage,
    selectAddress,
    Machine,
    AreaManagement,
    Employee,
    Company,
    OperationLog,
    Client,
    iLinklogin
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [Global],
  bootstrap: [iLinklogin]
})
export class AppModule {
  
}
