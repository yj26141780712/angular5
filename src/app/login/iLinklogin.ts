import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as $ from 'jquery';  //定义jquery
import swal from 'sweetalert2';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Global } from '../services/global';

@Component({
  selector: 'iLinklogin',
  templateUrl: './iLinklogin.html',
  styleUrls: ['./iLinklogin.scss']
})
export class iLinklogin implements OnInit {
  show_login: boolean = true;
  constructor(private router: Router, private http: Http) {

  }
  ngOnInit() {
    $('body').height($(window).height());
    $('.login_view').hide();
  }
  gotoMap(user, passw) {
    //this.router.navigate(['/home']);

    //post
    // let headers = new Headers();
    // headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    // let options = new RequestOptions({ headers:headers});
    // this.http.post(Global.domain+'api/apilogin',"username=admin&password=esto123",options).subscribe((res: Response) => {

    //   localStorage.setItem('sessionid',res.json().obj.jsessionid);
    // });
    this.http.get(Global.domain + 'api/apilogin?username=' + user.value + '&password=' + passw.value).subscribe((res: Response) => {
      console.log(res.json());
      if (res.json().code == 200) {
        this.show_login = false;
        this.router.navigate(['/home']);//跳转
        //console.log(res.json().obj.companyid);
        localStorage.setItem('companyid', res.json().obj.companyid || ''); // add by yangjie 20180426 || ''
        localStorage.setItem('id', res.json().obj.id);
        localStorage.setItem('companyName', res.json().obj.companyName);
        localStorage.setItem('roleName', res.json().obj.roleName);
      } else {
        swal("出错了", "用户名密码错误！", 'warning');
        return false;
      }
    });
  }
}

