import { Http, Headers } from '@angular/http';
import { Injectable } from "@angular/core";

import swal from 'sweetalert2';//sweetalert2 

@Injectable()
export class Global {
    // static domain: string = "http://192.168.2.6:8088/IMS/";
    static domain: string = "http://192.168.2.229:8088/IMS/";
    //  static domain = "http://yun.esto.cn/IMS/";  
}

@Injectable()
export class GlobalService {

    headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
    constructor(private http: Http) {

    }
    /**
     * 对参数进行编码
     * @param params 
     */
    encode(params) {
        var str = '';
        if (params) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var value = params[key];
                    str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
                }
            }
            str = str.length > 0 ? ('?' + str.substring(0, str.length - 1)) : '';
        }
        return str;
    }

    httpGet(url, params, callback, loader: boolean = false) {
        if (loader) {
            //开启加载效果
        }
        this.http.get(url + this.encode(params)).toPromise().then(res => {
            let json = res.json();
            if (loader) {
                //关闭加载效果
            }
            callback(json);
        }).catch(err => {
            this.handleError(err);
        });
    }

    httpPost(url, params, callback, loader: boolean = false) {
        // let loading = this.loadingCtrl.create();
        if (loader) {
            //loading.present();
        }
        //console.log(url, params);
        this.http.post(url, params)
            .toPromise()
            .then(res => {
                var d = res.json();
                if (loader) {
                    //loading.dismiss();
                }
                callback(d == null ? "[]" : d);
            }).catch(error => {
                if (loader) { 
                    //loading.dismiss();
                }
                this.handleError(error);
            });
    }
    
    private handleError(error: Response | any) {
        let msg = '';
        if (error.status == 400) {
            msg = '请求无效(code：400)';
            console.log('请检查参数类型是否匹配');
        } else if (error.status == 404) {
            msg = '请求资源不存在(code：404)';
            console.error(msg + '，请检查路径是否正确');
        } else if (error.status == 500) {
            msg = '服务器发生错误(code：500)';
            console.error(msg + '，请检查路径是否正确');
        } else {
            msg = `请求出错!`;
            console.log(error);
        }

        if (msg != '') {
            swal('http请求异常', msg, 'error');
        }
    }

    private httpGetALL(urlArr: Array<string>, callback) {

    }
}
