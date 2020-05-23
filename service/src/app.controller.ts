import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('user/tl')
  getUser(): Object {
    return {
      status:500,
      data:this.appService.getUser()
    }
  }
  @Get('doc')
  doc(@Res() response){
    this.appService.doc().then(res => {
      response.status(200).send(res)
    })
  }
  @Get('my')
  my(@Res() response){
    this.appService.doc().then(res => {
      response.status(200).send(res)
    })
  }
}
