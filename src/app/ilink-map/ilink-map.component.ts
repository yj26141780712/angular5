import { Component, OnInit } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import {
  Router
} from '@angular/router';
import * as echarts from 'echarts';//引入echarts的变量
import * as moment from 'moment';
import * as $ from 'jquery';
import { Global } from '../services/global';
declare let BMap, BMapLib;
@Component({
  selector: 'app-ilink-map',
  templateUrl: './ilink-map.component.html',
  styleUrls: ['./ilink-map.component.scss']
})
export class IlinkMapComponent implements OnInit {
  MachineCount: any = { total: 0, running: 0, service: 0 };
  company_id: any;//当前账户公司id
  point_array: any = [];//当前账号在地图上的信息
  area_array: any = [];//所有区域的信息
  Machine_run: any = [];
  Machine_propor: any = [{ time: [], data: [] }, { time: [], data: [] }, { time: [], data: [] }, { time: [], data: [] }];
  constructor(private http: Http, private router: Router) {
  }
  ngOnInit() {
    this.m_propor();
    this.run_m();
    this.company_id = localStorage.getItem('companyid');
    this.getBaiduMap(() => {
      this.baiduMap(this.point_array, this.area_array);
    });
  }
  baiduMap(data, area) {
    var that = this;
    var map = new BMap.Map("ilink_baiduMap");
    var point = new BMap.Point(121.660844, 29.889687);
    var markers = [];
    var point_array = [].concat(data);//模拟坐标
    // 创建点坐标  
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom(true);//可滚动缩放

    function addMarker(item) {//地图添加标注
      var pointitem = new BMap.Point(item.x, item.y);
      var marker = new BMap.Marker(pointitem);
      var ops = {
        width: 250,
        height: 250
      };
      var sContent = `<div class="marker">
        <ul>
          <li><label>注塑机编号：</label><a>${item.data.id}</a></li>
          <li><label>注塑机名称：</label>${item.data.name}</li>
          <li><label>注塑机型号：</label>${item.data.type}</li>
          <li><label>注塑机状态：</label>${item.data.state}</li>
          <li><label>采集器编号：</label><font>${item.data.number}</font></li>
          <li><label>所属公司：</label>${item.data.company}</li>
          <li><label>所属片区：</label>${item.data.area}</li>
          <li><label>备注信息：</label>${item.data.notes}</li>
        </ul>
      </div>`;
      var infoWindow = new BMap.InfoWindow(sContent, ops);
      marker.addEventListener("click", function () {
        map.openInfoWindow(infoWindow, pointitem);
        $('.marker li:eq(0)>a').click(function () {
          var monitor = $(this).parent().siblings().find('font').text();
          that.router.navigate(['home/data'], { queryParams: { mid: monitor } });
        })
      });
      map.addEventListener('zoomstart', function () {
        infoWindow.close();//当地图缩放时候，关闭弹框
      })
      //map.addOverlay(marker); //有了聚合点不需要单个标注点
      marker.id = item.data.id;//给marker绑数据
      marker.name = item.data.name;
      marker.state = item.data.state;
      marker.number = item.data.number;//采集器编号
      markers.push(marker);
    }
    console.log(point_array.length);
    console.log(point_array);
    for (var i = 0; i < point_array.length; i++) {
      addMarker(point_array[i]);
    }
    var markerClusterer = new BMapLib.MarkerClusterer(map, { markers: markers });//添加点聚合

    addMarkerClustererClickHandler(markerClusterer);
    function addMarkerClustererClickHandler(Clusterer) {
      markerClusterer.addClickListener(function (event, cluster) {
        var currentMarkers = cluster.getClusterMarkers();
        var currentMarkerPoint = cluster.getClusterPoint();
        var html = `
        <div class="total_info">
          <ul>
            <li><label>编号</label><label>名称</label><label>最近状态</label><label></label></li>`;
        var str = "";
        for (var i = 0; i < currentMarkers.length; i++) {
          str += `<li><font>${currentMarkers[i].id}</font><font>${currentMarkers[i].name}</font><font>${currentMarkers[i].state}</font><a><font>查看详情</font></a><span class="hidden">${currentMarkers[i].number}</span></li>`;
        }
        html += str + `</ul></div>`;
        openInfoByPoint(html, currentMarkerPoint);
      }, false);

      function openInfoByPoint(content, point) {
        var ops = {
          width: 400,
          height: 0
        }
        var infoWindow = new BMap.InfoWindow(content, ops);
        map.openInfoWindow(infoWindow, point);
        map.addEventListener('zoomstart', function () {
          infoWindow.close();//当地图缩放时候，关闭弹框
        })
        //查看详细
        $('.total_info>ul>li>a').click(function () {
          var monitor = $(this).parent().find('span').text();
          console.log(monitor);
          that.router.navigate(['home/data'], { queryParams: { mid: monitor } });
        })
      }
    }
    console.log(area);
    for (var i = 0; i < area.length; i++) {
      //console.log("我进循环了!");
      getBoundary(area[i]);
    }
    function getBoundary(city)  //设置区域的覆盖物
    {
      var bdary = new BMap.Boundary();
      bdary.get(city, function (res) {
        //console.log(res);
        var count = res.boundaries.length;
        for (var i = 0; i < count; i++) {
          var ply = new BMap.Polygon(res.boundaries[i], { strokeWeight: 1, strokeColor: "#0375ff", fillOpacity: 1, enableMassClear: true });//建立多边形
          // map.addOverlay(ply);//添加覆盖物
          //map.setViewport(ply.getPath());//调整视野
        }
      })
    }
  }
  run_m() {
    let run_m_ech = <HTMLDivElement>document.getElementById('run_m_ech');
    var run_m = echarts.init(run_m_ech);
    var option = {
      tooltip: {
        trigger: 'axis',
        formatter: '{c}'
      },//信息提示框
      grid: {
        top: '5%',
        left: '3%',
        right: '4%',
        bottom: '1%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['0时', '3时', '6时', '9时', '12时', '15时', '18时', '21时', '24时']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '邮件营销',
          type: 'line',
          stack: '总量',
          data: [2, 2, 2, 4, 4, 4],
          itemStyle: {
            normal: {
              color: "#0178bc"
            }
          },
          areaStyle: {
            normal: {
              color: '#9ed8fd'
            }
          },
          label: {

          }
        }
      ]
    };
    run_m.setOption(option);
  }
  m_propor() {
    let m_propo_ech = <HTMLDivElement>document.getElementById('m_propo_ech');
    var run_m = echarts.init(m_propo_ech);
    var option = {
      legend: {
        orient: 'horizontal',
        x: 'left',
        y: 'center',
        data: ['328机型']
      },
      series: [
        {
          type: 'pie',
          radius: ['65%', '80%'],
          label: {
            normal: {
              formatter: '{b}\n{c}',
              rich: {
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                c: {
                  textAlign: "center"
                }
              }
            }
          },
          data: [
            { value: 4, name: '328机型' }
          ],
          itemStyle: {
            normal: {
              color: "#0178bc"
            }
          }
        }
      ]
    };
    run_m.setOption(option);
  }
  getBaiduMap(callback) {
    this.http.get(Global.domain + 'api/apideviceList.action').subscribe((res: Response) => {
      var Mdata: any = [];
      for (var i = 0; i < res.json().obj.length; i++) {
        if (res.json().obj[i].companyid == this.company_id || !this.company_id) { //add by yangjie 20180426  || !this.company_id
          if (res.json().obj[i].workstate == "全自动" || res.json().obj[i].workstate == "半自动" || res.json().obj[i].workstate == "时间自动" || res.json().obj[i].workstate == "电眼自动") {
            this.MachineCount.running++;
          }
          Mdata.push(res.json().obj[i]);
        }
        //Machine_run
        //Machine_pro
      }
      this.MachineCount.total = Mdata.length;
      for (var i = 0; i < Mdata.length; i++) {
        //Map——data
        var item = { x: "", y: "", data: { id: "", name: "", type: "", state: "", number: "", company: "", area: "", notes: "" } };
        if (Mdata[i].x == null || Mdata[i].x == "null") {
          item.x = "121.660844";
          item.y = "29.889687";
        } else {
          item.x = Mdata[i].x;
          item.y = Mdata[i].y;
        }
        item.data.id = Mdata[i].sn;
        item.data.name = Mdata[i].name;
        item.data.type = Mdata[i].modelName;
        item.data.state = Mdata[i].workstate;
        item.data.number = Mdata[i].monitorid;
        item.data.company = Mdata[i].companyName;
        item.data.area = Mdata[i].city;
        item.data.notes = Mdata[i].areaName;
        this.point_array.push(item);
      }
      callback();
    });
    this.http.get(Global.domain + 'api/apiareas.action?companyId=' + this.company_id ).subscribe((res: Response) => {
      console.log('yangjie',res.json());
      for (var i = 0; i < res.json().obj.length; i++) {
        if (res.json().obj[i] && res.json().obj[i].note) {
          var array = [];
          array = res.json().obj[i].note.split(',');
          for (var j = 0; j < array.length; j++) {
            this.area_array.push(array[j]);
          }
        }
      }
      this.area_array = Array.from(new Set(this.area_array)); //add by yangjie 20180426 去重复
      this.MachineCount.service = this.area_array.length;
    })
  }
}
