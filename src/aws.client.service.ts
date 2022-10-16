import { Injectable } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { Model } from 'dynamoose/dist/Model';
import { Table } from 'dynamoose/dist/Table';


@Injectable()
export class AWSClient {
  private AWS = require('aws-sdk');
  private readonly dynamoose = require('dynamoose');
  private dynamo: DynamoDB;
  private db: any
  constructor() {
    this.AWS.config.update({ region: 'us-east-1' });
    this.dynamo = new this.AWS.DynamoDB({ 
      apiVersion: '2012-08-10',
      maxRetries: 1
    });
    this.dynamoose.aws.ddb.set(new this.dynamoose.aws.ddb.DynamoDB({
      'region': 'us-east-1'
    }));

    const tableSchema = new this.dynamoose.Schema(
      {
        UUID: {
          type: String,
          hashKey: true,
          required: true
        },
        DATA: {
          type: Object,
          schema: {
            NAME: String,
            DESC: String,
          }
        },
      },
      {
        timestamps: true
      }
    );
    this.db = this.dynamoose.model("TEST_TABLE", tableSchema);
  }

  public async setExample() {
    return await this.db.create(
      {
        UUID: "g6ccd2be-4d11-11ed-bdc3-0242ac120002",
        DATA: {
          NAME: "NEW TEST",
          DESC: "NEW TEST DESC"
        }
      });
  }

  public async getExample() {
    return await this.db.query("createdAt").gt(5).exec();
  }

  public async getTest() {
    let res = "No Data";
    let myData = null;
    const requestParams = {
      TableName: 'TEST_TABLE',
      Key: {
        'UUID': {'S': 'f6e930c0-4d06-11ed-bdc3-0242ac120002'}
      },
      ProjectionExpression: 'UUID, DATA'
    };

    const ok = await this.dynamo.getItem(
      requestParams,
      (err, data) => {
        if (!err && err !== null) {
          myData = data;
          res = "Success";
        }
      });
    console.log(myData);
    return res;
  }
}
