import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { NavigationComponent } from './navigation';

import { ModuleTable } from './module-table';
import { Global } from '../tool/services/global';
@Component({
  selector: 'produce-table',
  templateUrl: './produce-table.html',
  styleUrls: ['./produce-list.component.scss']
})
export class ProduceTable implements OnInit {
  companyid: any;
  Machine_data: any;
  navigations: Array<string> = ['主页', '监控管理', '机器列表'];
  module_table_thead: Array<string> = ['编号', '名称', '机器状态', '机器动作', '马达动作', '电热状态', '生产模数', '全程计时(时)', '开机时间(天)'];
  module_table_body: Array<Object> = [];
  module_table_attr: Array<string> = ['id', 'name', 'state', 'action', 'motor', 'hot', 'count', 'time', 'open'];
  module_table_search = { search: "id", name: "编号" }
  constructor(private http: Http) {

  }

  ngOnInit() {
    this.getMachineCount(() => {
      var array = [];
      //对对象重新封装
      for (var i = 0; i < this.Machine_data.length; i++) {
        var Machine_item = { id: "", name: "", state: "", action: "", motor: "", hot: "", count: "", time: "", open: "" };
        Machine_item.id = this.Machine_data[i].sn;
        Machine_item.name = this.Machine_data[i].name;
        Machine_item.state = this.Machine_data[i].workstate;
        Machine_item.action = this.Machine_data[i].action;
        Machine_item.motor = this.Machine_data[i].motor;
        Machine_item.hot = this.Machine_data[i].electricHeat;
        Machine_item.count = this.Machine_data[i].modelNum;
        Machine_item.time = this.Machine_data[i].fulltime.toFixed(1);//全程计时小数位
        Machine_item.open = this.Machine_data[i].workhour;
        // Machine_item.time=this.Machine_data[i].totalhour;//全程计时小数位
        // Machine_item.open=this.Machine_data[i].fulltime.toFixed(1);
        array.push(Machine_item);
      }
      this.module_table_body = [].concat(array);
    })
  }
  getMachineCount(callback): void {
    this.companyid = localStorage.getItem('companyid');
    this.http.request(Global.domain + 'api/apideviceList.action?companyId=' + this.companyid || '')
      .subscribe((res: Response) => {
        //根据companyid筛选
        var array = [];
        for (var i = 0; i < res.json().obj.length; i++) {
          array.push(res.json().obj[i]);
        }
        this.Machine_data = [].concat(array);
        callback();
      })
  }
}
