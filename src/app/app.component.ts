import { Global } from './services/global';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';  //定义jquery

import { Headers, Http, Response, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  roleName: any;
  menu_fold: boolean = true;
  data: any;
  admin: any;//公司名称
  awesomeStr = [];

  constructor(private router: Router, private http: Http) {
    console.log(global);
  }
  ngOnInit() {
    this.roleName = localStorage.getItem('roleName');
    switch (this.roleName) {
      case "机械厂管理员":
      case "系统管理员":
        this.awesomeStr = [
          { i: "fa-desktop", title: "大屏幕", list: [{ name: "实时地图", rounter: "home" }, { name: "实时数据", rounter: "data" }], color: "green" },
          { i: "fa-cloud", title: "监控管理", list: [{ name: "机器图表", rounter: "table" }, { name: "机器列表", rounter: "list" }], color: "blue" },
          {
            i: "fa-info-circle", title: "远程详情", list: [{ name: "停机解码", rounter: "stop" }, { name: "通信诊断", rounter: "communi" }
              , { name: "参数信息", rounter: "message" }, { name: "生产数据", rounter: "produce_data" }, { name: "实时温度", rounter: "temp" }, { name: "润滑信息", rounter: "lub" }], color: "orange"
          },
          {
            i: "fa-file-text-o", title: "档案管理", list: [{ name: "注塑机管理", rounter: "Machine_M" }, { name: "公司管理", rounter: "company" }, { name: "片区管理", rounter: "area" },
            { name: "用户管理", rounter: "employee" }, { name: "客户管理", rounter: "client" }, { name: "操作日志", rounter: "log" }], color: "green"
          }];
        break;
      case "工厂管理员":
        this.awesomeStr = [{ i: "fa-desktop", title: "大屏幕", list: [{ name: "实时地图", rounter: "home" }, { name: "实时数据", rounter: "data" }], color: "green" },
        { i: "fa-cloud", title: "监控管理", list: [{ name: "机器图表", rounter: "table" }, { name: "机器列表", rounter: "list" }], color: "blue" },
        { i: "fa-info-circle", title: "远程详情", list: [{ name: "参数信息", rounter: "message" }, { name: "生产数据", rounter: "produce_data" }, { name: "实时温度", rounter: "temp" }, { name: "润滑信息", rounter: "lub" }], color: "orange" },
        {
          i: "fa-file-text-o", title: "档案管理", list: [{ name: "注塑机管理", rounter: "Machine_M" },
          { name: "用户管理", rounter: "employee" }, { name: "客户管理", rounter: "client" }, { name: "操作日志", rounter: "log" }], color: "green"
        }];
        break;
      default:
        // code...
        break;
    }
    this.admin = localStorage.getItem('companyName');
    $('.login_view').hide();
    this.http.get(Global.domain+"main/fiveCodeGet.action?mid=160").subscribe(res=>{
        console.log(res); 
    });
    this.http.get(Global.domain+"device/showFittingPage.action").subscribe(res=>{
      console.log(res); 
  });
  }
  ngAfterViewInit() {
    $('body').height($(window).height());
    $('.fold').click(() => {
      this.menu_fold = !this.menu_fold;
      if (this.menu_fold == true) {
        $('.ilink_content').width('calc(100% - 50px)');
      } else {
        $('.ilink_content').width('calc(100% - 166px)');
      }
    })
  }
  slideToggle(i) {
    $('.menu_unfold li .menu_list:eq(' + i + ')').slideToggle(300);
  }
  menuHovershow(i) {
    $('.menu_list:eq(' + i + ')').show();
  }
  menuHoverhide(i) {
    $('.menu_list:eq(' + i + ')').hide();
  }
  gotoLogin() {
    this.router.navigate(['login']);
  }
  // getMachineCount():void{
  //   this.http.post(Global.domain+'api/deviceTemp.action',
  //     JSON.stringify({
  //       mid:'31'
  //   })).subscribe((res:Response)=>{
  //     this.data=res.json();
  //   })
  // }
}

