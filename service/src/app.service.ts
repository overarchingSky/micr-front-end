import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios'

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
    //http://clw.5ihw.cn/js/chunk-87d091b4.b7e89707.js
    return this.httpService.get('http://clw.5ihw.cn/js/my.8f0108aa.js').toPromise().then(res => res.data)
  }
}
