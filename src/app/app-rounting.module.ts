import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { IlinkMapComponent } from './ilink-map/ilink-map.component';
import { ProduceListComponent } from './produce-list/produce-list.component';
import { TimeDataComponent } from './time-data/time-data.component';
import { SearchMachineidComponent } from './search-machineid/search-machineid.component';
import { NavigationComponent } from './produce-list/navigation';
import { ProduceTable } from './produce-list/produce-table';
import { ModuleTable } from './produce-list/module-table';
import { RemotelyComponent } from './remotely/remotely.component';
import { ShutDown } from './remotely/ShutDown';
import { ParamMessage } from './remotely/paramMessage';
import { ProduceData } from './remotely/produceData';
import { TimelyTemperature } from './remotely/timelyTemperature';
import { SmoothMessage } from './remotely/smoothMessage';
import { Machine } from './file-management/Machine';
import { AreaManagement } from './file-management/areaManagement';
import { Employee } from './file-management/employee';
import { Company } from './file-management/company';
import { OperationLog } from './file-management/OperationLog';
import { iLinklogin } from './iLinklogin';
import { Client } from './file-management/client';

const routes: Routes = [
  //{ path: '',redirectTo:'login', pathMatch: 'full'},//path为空，表示指向根目录，默认路由
  { path: 'login', component: iLinklogin },
  {
    path: 'home', component: AppComponent, children: [
      { path: '', component: IlinkMapComponent },
      { path: 'home', component: IlinkMapComponent },
      { path: 'table', component: ProduceListComponent },
      { path: 'data', component: TimeDataComponent },
      { path: 'list', component: ProduceTable },
      { path: 'communi', component: RemotelyComponent },
      { path: 'stop', component: ShutDown },
      { path: 'message', component: ParamMessage },
      { path: 'produce_data', component: ProduceData },
      { path: 'temp', component: TimelyTemperature },
      { path: 'lub', component: SmoothMessage },
      { path: 'Machine_M', component: Machine },
      { path: 'area', component: AreaManagement },
      { path: 'employee', component: Employee },
      { path: 'company', component: Company },
      { path: 'client', component: Client },
      { path: 'log', component: OperationLog },
    ]
  },
  // { path:'**',component:IlinkMapComponent}//默认进入哪个界面
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [],
})
export class AppRoutingModule { }
