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
    return this.httpService.get('http://clw.5ihw.local:8080/js/1.js').toPromise().then(res => res.data)
  }
}
