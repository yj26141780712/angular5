import { GlobalService } from './../tool/services/global';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Http } from '@angular/http';
import { Global } from '../tool/services/global';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  isUserNameRepeat: boolean = false;

  info = {
    factory: "",
    userName: "",
    password: "",
    passwordRe: ""
  }

  constructor(private http: Http, private gs: GlobalService, public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  close() {
    this.bsModalRef.hide();
  }

  reset() {
    for (let key in this.info) {
      this.info[key] = "";
    }
  }

  register() {
    let url = Global.domain + "api/apiaddFactory.action";
    console.log(url);
    this.gs.httpGet(url, this.info, json => {
      if (json.code == 200) {
        this.bsModalRef.hide();
      }
    });
  }

  checkUserName(value) {
    let url = Global.domain + "";
    this.gs.httpGet(url, { userName: value }, json => {
      if (json.code == 200) {
        this.isUserNameRepeat = true;
      }
    });
  }
}
