import { Injectable } from '@nestjs/common';
import DynamoDB from 'aws-sdk/clients/dynamodb';
import { AWSClient } from './aws.client.service';

@Injectable()
export class AppService {
  // private readonly AWS = require('aws-sdk');
  // private dynamoClient: DynamoDB;
  constructor(private readonly awsClient: AWSClient) {}

  public async getHello() {
    return await this.awsClient.getExample();
  }
}
