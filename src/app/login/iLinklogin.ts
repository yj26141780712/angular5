import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';  //定义jquery
import swal from 'sweetalert2';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Global } from '../tool/services/global';

@Component({
  selector: 'iLinklogin',
  templateUrl: './iLinklogin.html',
  styleUrls: ['./iLinklogin.scss']
})
export class iLinklogin implements OnInit {
  show_login: boolean = true;
  loginInfo = {
    username: '',
    password: '',
    isAuto: false
  };
  constructor(private router: Router, private http: Http) {

  }
  ngOnInit() {
    this.loginInfo.username = localStorage.getItem('username');
    this.loginInfo.password = localStorage.getItem('password');
    this.loginInfo.isAuto = localStorage.getItem('isAuto') && localStorage.getItem('isAuto') == "true";
    console.log(this.loginInfo);
    $('body').height($(window).height());
    $('.login_view').hide();
    //自动登陆
  }

  gotoMap() {
    this.http.get(Global.domain + 'api/apilogin?username=' + this.loginInfo.username + '&password=' + this.loginInfo.password).subscribe((res: Response) => {
      if (res.json().code == 200) {
        console.log(res.json());
        localStorage.setItem('username', this.loginInfo.username);
        localStorage.setItem('password', this.loginInfo.password); // 缺少安全处理
        localStorage.setItem('isAuto', this.loginInfo.isAuto + '');
        localStorage.setItem('companyid', res.json().obj.companyid || ''); // add by yangjie 20180426 || ''
        localStorage.setItem('id', res.json().obj.id);
        localStorage.setItem('companyName', res.json().obj.companyName);
        localStorage.setItem('roleName', res.json().obj.roleName);
        if (this.loginInfo.isAuto) {
          localStorage.setItem('lastTime', new Date().getTime() + '');
        } else {
          localStorage.removeItem('lastTime')
        }
        this.router.navigate(['/home']);//跳转
      } else {
        swal("出错了", "用户名密码错误！", 'warning');
        return false;
      }
    });
  }
}

