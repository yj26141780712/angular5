import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { IlinkMapComponent } from '../ilink-map/ilink-map.component';
import { TimeDataComponent } from '../time-data/time-data.component';
import { ProduceListComponent } from '../produce-list/produce-list.component';
import { SearchMachineidComponent } from '../search-machineid/search-machineid.component';
import { NavigationComponent } from '../produce-list/navigation';
import { ProduceTable } from '../produce-list/produce-table';
import { ModuleTable } from '../produce-list/module-table';
import { RemotelyComponent } from '../remotely/remotely.component';
import { ShutDown } from '../remotely/ShutDown';
import { ParamMessage } from '../remotely/paramMessage';
import { ProduceData } from '../remotely/produceData';
import { TimelyTemperature } from '../remotely/timelyTemperature';
import { SmoothMessage } from '../remotely/smoothMessage';
import { selectAddress } from '../remotely/selectAddress';
import { Machine } from '../file-management/Machine';
import { AreaManagement } from '../file-management/areaManagement';
import { Employee } from '../file-management/employee';
import { Company } from '../file-management/company';
import { OperationLog } from '../file-management/OperationLog';
import { Client } from '../file-management/client';
import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,    
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
    Client
  ]
})
export class HomeModule { 
}
