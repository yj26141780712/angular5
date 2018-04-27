import { Component, OnInit } from '@angular/core';
import { NavigationComponent } from '../produce-list/navigation';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Global } from '../services/global';
@Component({
  selector: 'Machine',
  templateUrl: './Machine.html',
  styleUrls: ['./Machine.scss']
})
export class Machine implements OnInit {
  companyid: any;
  data: any;
  navigations: Array<string> = ['主页', '档案管理', '注塑机管理'];
  module_table_thead: Array<string> = ['注塑机编号', '注塑机名称', '注塑机类型', '采集器编号', '出厂调试人员', '出厂日期', '所属片区', '出厂公司', '代理公司', '塑料厂', '备注信息'];
  module_table_body: Array<Object> = [];
  module_table_search = { search: "m_id", name: "注塑机编号" };
  module_table_attr: Array<string> = ['m_id', 'm_name', 'm_type', 'c_id', 'o_name', 'o_date', 'area', 'o_company', 'd_company', 's_company', 'remarks'];
  module_table_type: string = "machine";

  constructor(private http: Http) {

  }
  getMachineData(callback) {
    this.http.get(Global.domain + 'api/apideviceList.action').subscribe((res: Response) => {

      var array = [];
      for (var i = 0; i < res.json().obj.length; i++) {
        if (res.json().obj[i].companyid == this.companyid || !this.companyid) {
          array.push(res.json().obj[i]);
        }
      }
      this.data = [].concat(array);
      console.log(this.data);
      callback();
    })
  }
  ngOnInit() {
    this.companyid = localStorage.getItem('companyid');
    this.getMachineData(() => {
      var array = [];
      for (var i = 0; i < this.data.length; i++) {
        var item = { m_id: "", m_name: "", m_type: "", c_id: "", o_name: "", o_date: "", area: "", o_company: "", d_company: "", s_company: "", remarks: "", id: "", x: "", y: "" };
        item.m_id = this.data[i].sn;
        item.m_name = this.data[i].name;
        item.m_type = this.data[i].modelName;
        item.c_id = this.data[i].monitorid;
        if (this.data[i].ddate != null) {
          item.o_date = this.data[i].ddate.substring(0, 10);
        }
        item.area = this.data[i].areaName;
        item.o_company = this.data[i].companyName;
        item.d_company = this.data[i].proxyName;
        item.s_company = this.data[i].factoryName;
        item.id = this.data[i].id; //add by yangjie 新增 id  x y
        item.x = this.data[i].x;
        item.y = this.data[i].y;
        array.push(item);
      }
      this.module_table_body = [].concat(array);
    });
  }
  getResult(msg) {
    this.getMachineData(() => {
      var array = [];
      for (var i = 0; i < this.data.length; i++) {
        var item = { m_id: "", m_name: "", m_type: "", c_id: "", o_name: "", o_date: "", area: "", o_company: "", d_company: "", s_company: "", remarks: "", id: "", x: "", y: "" };
        item.m_id = this.data[i].sn;
        item.m_name = this.data[i].name;
        item.m_type = this.data[i].modelName;
        item.c_id = this.data[i].monitorid;
        if (this.data[i].ddate != null) {
          item.o_date = this.data[i].ddate.substring(0, 10);
        }
        item.area = this.data[i].areaName;
        item.o_company = this.data[i].companyName;
        item.d_company = this.data[i].proxyName;
        item.s_company = this.data[i].factoryName;
        item.id = this.data[i].id; //add by yangjie 20180427
        item.x = this.data[i].x;
        item.y = this.data[i].y;
        array.push(item);
      }
      this.module_table_body = [].concat(array);
    });
  }
}