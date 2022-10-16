import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AWSClient } from './aws.client.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly awsClient: AWSClient
    ) {}

  @Get('/test')
  async getHello() {
    return await this.appService.getHello();
  }

  @Get("/csv-setup")
  async csvSetup() {
    return await this.awsClient.setupData();
  }
}
