import { Global } from './tool/services/global';
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

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.autoLogin();
  }

  /**
   * 自动登陆
   */
  autoLogin() {
    let nowTime = new Date().getTime();
    let lasTime = localStorage.getItem('lastTime') ? Number(localStorage.getItem('lastTime')) : 0;
    let spanTime = nowTime - lasTime;
    let allTime = 10 * 24 * 60 * 60 * 1000;
    console.log(lasTime, spanTime);
    if (spanTime < allTime && lasTime > 0) {
      this.router.navigate(['/home']);//跳转 { queryParams: { type: "autoLogin" } } 
    }
  }
}

