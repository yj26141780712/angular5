import { GlobalService, Global } from './../../tool/services/global';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-factory-info',
  templateUrl: './factory-info.component.html',
  styleUrls: ['./factory-info.component.scss']
})
export class FactoryInfoComponent implements OnInit {

  myForm: FormGroup;
  // id: AbstractControl;
  // name: AbstractControl;
  // address: AbstractControl;
  // phone: AbstractControl;
  // note: AbstractControl;
  navigations: Array<string> = ['主页', '档案管理', '公司信息'];
  constructor(private gs: GlobalService, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      'id': ['', Validators.required],
      'name': ['', Validators.required],
      'address': [''],
      'phone': [''],
      'note': [''],
    }); 
    // this.id = this.myForm.controls["id"];
    // this.name = this.myForm.controls["name"];
    // this.address = this.myForm.controls["address"];
    // this.phone = this.myForm.controls["phone"];
    // this.note = this.myForm.controls["note"];
  }   

  ngOnInit() {
    let url = Global.domain + "api/";
    this.gs.httpGet(url, {}, json => {
      if (json.code == 200) {
          //此处加载company数据
          this.myForm.reset();
      }
    });
  }

  reset() {
    console.log(123);
    this.myForm.reset();
  }

  onSubmit(value) {
    console.log(value);
  }
}
