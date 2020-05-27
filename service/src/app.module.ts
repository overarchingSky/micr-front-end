import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [HttpModule.register({
    headers:{token:'123456'}
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
