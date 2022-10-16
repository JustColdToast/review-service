import { Controller, Get, Param, Put } from '@nestjs/common';
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

  @Get("/washroom/:id")
  async getWashroom(@Param('id') id: string) {
    return await this.awsClient.getEntry(id);
  }

  //Increases downvotes by 1
  @Put("/incDownVotes/:id")
  async incDownVotes(@Param('id') id: string) {
    return await this.awsClient.incDownVotes(id);
  }

    //Decreases downvotes by 1
    @Put("/decDownVotes/:id")
    async decDownVotes(@Param('id') id: string) {
      return await this.awsClient.decDownVotes(id);
    }

      //Increases upvotes by 1
  @Put("/incUpVotes/:id")
  async incUpVotes(@Param('id') id: string) {
    return await this.awsClient.incUpVotes(id);
  }

    //Decreases upvotes by 1
    @Put("/decUpVotes/:id")
    async decUpVotes(@Param('id') id: string) {
      return await this.awsClient.decUpVotes(id);
    }

    //  @Put("/updateGenderNeutral/:id")
    // async updateGenderNeutral(@Param('id') id: string) {
    //   return await this.awsClient.updateGenderNeutral(id);
    // }

}
