import { Injectable } from '@nestjs/common';
import * as AWSSchema from './schema/table.schema';
import * as Washrooms from './washroom_data.json';
const dynamoose = require('dynamoose');
import {v4 as uuidv4 } from 'uuid';

@Injectable()
export class AWSClient {
  private tableModel: any
  constructor() {
    this.tableModel = dynamoose.model(AWSSchema.Tables.WashroomTable, AWSSchema.WashroomTable);
  }

  public async setExample() {
    return await this.tableModel.create(
      {
        UUID: "g6ccd2be-4d11-11ed-bdc3-0242ac120002",
        DATA: {
          NAME: "NEW TEST",
          DESC: "NEW TEST DESC"
        }
      });
  }

  public async getExample() {
    return await this.tableModel.query("createdAt").gt(5).exec();
  }

  public async setupData() {
    let data = [];

    let i = 0;
    while (Washrooms[i] != undefined) {
      const elem = Washrooms[i];
      data.push({
        id: uuidv4(),
        X_COORDINATE: elem.X_COORDINATE,
        Y_COORDINATE: elem.Y_COORDINATE,
        NAME: elem.NAME,
        ADDRESS: elem.ADDRESS,
        HOUR_OPEN: elem.HOURS_MONDAY_OPEN,
        HOUR_CLOSE: elem.HOURS_MONDAY_CLOSED,
      })
      i++;
    }
    let res = "Successfully uploaded";
    try {
      i = 168;
      while (i < data.length) {
        const currentData = data.slice(i, i+21);
        await this.tableModel.batchPut(currentData);
        i = i + 22;
        await new Promise(r => setTimeout(r, 3000));
      }
    } catch (error) {
      res = `${i}--------Error: ${error}`;
    }
    return res;
  }


  public async getEntry(id) {
    return await this.tableModel.query("id").eq(id).exec();
  }

  public async incDownVotes(id){
    return await this.tableModel.update({"id":id},{"$ADD":{"DOWNVOTES":1}});
  }

  public async decDownVotes(id){
    return await this.tableModel.update({"id":id},{"$ADD":{"DOWNVOTES":-1}});
  }

  public async incUpVotes(id){
    return await this.tableModel.update({"id":id},{"$ADD":{"UPVOTES":1}});
  }

  public async decUpVotes(id){
    return await this.tableModel.update({"id":id},{"$ADD":{"UPVOTES":-1}});
  }

  // public async updateGenderNeutral(id){
  //   const userModel = this.getEntry(id);
  //   userModel
  // }
}
