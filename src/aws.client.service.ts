import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const uuid = require('uuid');

@Injectable()
export class AWSClient {
  private AWS = require('aws-sdk');
  private dynamo: DynamoDB;
  private dynamoClient: DynamoDBClient;
  constructor() {
    this.AWS.config.update({ region: 'us-east-1' });
    this.dynamo = new this.AWS.DynamoDB({ 
      apiVersion: '2012-08-10',
      maxRetries: 1
    });
  }

  public async 

  public async getTest() {
    let res = "No Data";
    let myData = null;
    const requestParams = {
      TableName: 'TEST_TABLE',
      Key: {
        'CUSTOMER_ID': {N: '2'},
        'CUSTOMER_NAME': {S: 'JOE BIDEN'}
      },
      ProjectionExpression: 'CUSTOMER_ID, CUSTOMER_NAME, ask'
    };

    const ok = await this.dynamo.getItem(
      requestParams,
      (err, data) => {
        if (!err && err !== null) {
          myData = data;
          res = "Success";
        }
      });
    return res;
  }
}
