import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AWSClient } from './aws.client.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AWSClient],
})
export class AppModule {}
