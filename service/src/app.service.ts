import { Injectable, HttpService } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService){}
  getHello(): string {
    return 'Hello World!';
  }
  getUser(): Object {
    return { message:'my name is TL' }
  }
  doc() {
    //http://web4.5ihw.cn/js/app.5e0c2406.js
    //http://clw.5ihw.cn/js/chunk-87d091b4.b7e89707.js
    return this.httpService.get('http://192.168.142.20:8080/js/mirc-app.07f3453e.js').toPromise().then(res => {
      return res.data
    })
  }
}
