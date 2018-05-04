import { Component, OnInit } from '@angular/core';
import {NavigationComponent} from '../produce-list/navigation';
import {SearchMachineidComponent} from '../search-machineid/search-machineid.component';
import {ModuleTable} from '../produce-list/module-table';
import { Headers, Http,Response,RequestOptions} from '@angular/http';
import * as moment from 'moment';
import { Global } from '../tool/services/global';
@Component({
  selector: 'produceData',
  templateUrl: './produceData.html',
  styleUrls: ['./remotely.component.scss']
})
export class ProduceData implements OnInit {
  now_date:any;
  current_mid:any;
  timer:any;//定时器
  navigations:Array<string>=['主页','机器详情','生产数据'];
  module_table_thead:Array<string>=['序号','制品时间','射出时间','射出起点','保压起点','残料位置','储料位置'];
  module_table_body:Array<Object>=[];
  module_table_attr:Array<string>=['id','time','shot_time','shot_pos','keep_pos','canliao_pos','sto_pos'];
  module_table_search={search:"id",name:"序号"}
  constructor(private http:Http) { }

  ngOnInit() {
    this.now_date=new Date().getTime();
  }
  getProduceData(){
    this.http.get(Global.domain+'api/remoteproductData.action?mid='+this.current_mid+'&mtime='+this.now_date).subscribe((res:Response)=>{
      //console.log(res.json());
      var array=[];
      for(var i=0;i<res.json().obj.length;i++)
      {
        var item={id:0, time:"", shot_time:"", shot_pos:"", keep_pos:"", canliao_pos:'', sto_pos:''};
        item.id=i+1;
        item.time=moment(res.json().obj[i].mtime).utc().zone(-8).format('YYYY-MM-DD HH:mm:ss');
        item.shot_time=res.json().obj[i].params[1].value;
        item.shot_pos=Number(res.json().obj[i].params[2].value).toFixed(1);
        item.keep_pos=Number(res.json().obj[i].params[4].value).toFixed(1);//保压起点
        item.canliao_pos=res.json().obj[i].params[7].value;//这里没有实际的值
        item.sto_pos=res.json().obj[i].params[7].value;//储料
        array.push(item);
      }
      this.module_table_body=[].concat(array);
    })
  }
  getMonitorEvent(mid){
    this.current_mid=mid;
    clearInterval(this.timer);
    this.timer=setInterval(()=>{
      this.getProduceData();
    },5000);
  }
}