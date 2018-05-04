import { Component, OnInit } from '@angular/core';
import {NavigationComponent} from '../produce-list/navigation';
import {SearchMachineidComponent} from '../search-machineid/search-machineid.component';
import { Headers, Http,Response,RequestOptions} from '@angular/http';
import * as moment from 'moment';
import * as $ from 'jquery';
import { Global } from '../tool/services/global';
@Component({
  selector: 'shutDown',
  templateUrl: './ShutDown.html',
  styleUrls: ['./remotely.component.scss']
})
export class ShutDown implements OnInit {
  error:boolean=false;
  warning:boolean=false;
  success:boolean=false;
  current_mid:boolean;//当前mid
  isStop:boolean=false;//是否停机
  msg:boolean;//消息
  openMessage:any={code:"",out:"",curr:"",count:"",password:""};
  navigations:Array<string>=['主页','远程控制','停机控制'];
  constructor(private http:Http) {}

  ngOnInit() {
    
  }
  ngAfterViewInit(){
    var date=moment().format('YYYY-MM-DD');
    $('#stop_0').attr('value',date);
    $('#stop_1').attr('value',date);
  }
  getMonitorEvent(mid){
    this.current_mid=mid;
    this.http.get(Global.domain+'api/remotepayGet.action?mid='+mid).subscribe((res:Response)=>{
      this.error=false;
      this.warning=false;
      this.success=false;
      $('.enabled').attr('disabled',"true");
      $('#method').addClass('stop');
      $('#feature').attr('disabled',"true").addClass('stop');
      if(res.json().code==200)
      {
        $('#feature').removeAttr('disabled').removeClass('stop');
        if(res.json().obj.stop==1)
        {
          this.isStop=true;
          this.openMessage.code=res.json().obj.sn;
          this.openMessage.out=res.json().obj.cycle1.substring(0,10);
          this.openMessage.curr=res.json().obj.curNum;
          this.openMessage.count=res.json().obj.num;
        }else{
          this.isStop=false;
        }
      }else if(res.json().code==500){
        this.error=true;
        this.msg=res.json().msg;
        $('.enabled').attr('disabled',"true");
        $('#method').addClass('stop');
      }else if(res.json().code==501){
        this.warning=true;
        this.msg=res.json().msg;
      }
      console.log(res.json());
    })
  }
  //select的change事件
  changeFeature(dom){
    if(dom.value=="1")
    {
      $('.enabled').removeAttr('disabled');
      $('#method').removeClass('stop');
    }else{
      $('.enabled').attr('disabled',"true");
      $('#method').addClass('stop');
    }
    //console.log(dom.value);
  }
  //提交停机数据
  submitStopMessage(stop,method,num,hour,minute,days,sn,identifier,output,cycle1,cycle2,cycle3,cycle4,cycle5,cycle6){
    var dayNum=days.value==""?"0":days.value;
    let headers = new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
    let options = new RequestOptions({ headers:headers});
    this.http.post(Global.domain+'api/remotepaySet.action?',
      "mid="+this.current_mid+"&p.stop="+stop.value+"&p.style="+method.value+"&p.num="+num.value+"&p.hour="
      +hour.value+"&p.minute="+minute.value+"&p.days="+dayNum+"&p.sn="+sn.value+"&p.identifier="
      +identifier.value+"&p.output="+output.value+"&p.cycle1="
      +cycle1.value+"&p.cycle2="+cycle2.value+"&p.cycle3="+cycle3.value+"&p.cycle4="+cycle4.value+"&p.cycle5="+cycle5.value+"&p.cycle6="+cycle6.value+""
      ,options).subscribe((res:Response)=>{
        if(res.json().code==200)
        {
          this.success=true;
          this.msg=res.json().msg;
          this.isStop=true;
          this.openMessage.code=sn.value;
          this.openMessage.out=output.value;
          this.openMessage.curr=num.value;
          this.openMessage.count=dayNum;
        }
        console.log(res.json());
    })
  }
  //提交解码信息
  sendOpenMessage(code){
    this.http.get(Global.domain+'api/remotesendCode.action?mid='+this.current_mid+'&code='+code.value).subscribe((res:Response)=>{
      console.log(res.json());
      if(res.json().code==200)
      {
        this.success=true;
        this.msg=res.json().msg;
        this.isStop=false;
        this.getMonitorEvent(this.current_mid);
      }else if(res.json().code==500){
        this.error=true;
        this.msg=res.json().msg;
      }else if(res.json().code==501){
        this.warning=true;
        this.msg=res.json().msg;
      }
    });
  }
  //select
  open(method,num){
    if(method.value==0&&num.value>=2)//间隔天数
    {
      $('#day').removeAttr('disabled');
    }else{
      $('#day').attr('disabled',"true");
    }
    if(method.value==2&&num.value>=1&&num.value<=6)
    {
      var N=num.value;
      for(var i=0;i<=N;i++)
      {
        $("#stop_"+i+"").removeAttr('disabled');
      }
      for(var j=6;j>N;j--)
      {
        $("#stop_"+j+"").attr('disabled','true');
      }
    }
    if(method.value!=2)
    {
      for(var i=2;i<=6;i++)
      {
        $("#stop_"+i+"").attr('disabled','true');
      }
    }
  }
  //失去焦点
  openDays(method,num){
    if(method.value==0&&num.value>=2)//间隔天数
    {
      $('#day').removeAttr('disabled');
    }else{
      $('#day').attr('disabled',"true");
    }

    if(method.value==2&&num.value>=1&&num.value<=6)//2-6日期启动
    {
      var N=num.value;
      for(var i=0;i<=N;i++)
      {
        $("#stop_"+i+"").removeAttr('disabled');
      }
      for(var j=6;j>N;j--)
      {
        $("#stop_"+j+"").attr('disabled','true');
      }
    }
    if(num.value>6||num.value<1)
    {
      $('#sep_count').siblings('i').show();
    }else{
      $('#sep_count').siblings('i').hide();
    }
  }
  //input非空判断
  nonEmpty(){

  }
}