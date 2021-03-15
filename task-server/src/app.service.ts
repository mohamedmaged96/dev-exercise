import { Injectable } from '@nestjs/common';
import * as SampleData from '../sample-data.json';
import { Entry } from './models/Entry';
import { Type, Category } from "./models/MeasurementReport";

@Injectable()
export class AppService {
  entries: Entry[] =SampleData;

  getAllEntries(): any {
    return this.entries;
  }
  getUsers():string[]{
    let users:string[]=this.entries.map(
      value =>{
        return value.meta.participant.username;
      }
    );
    return users;
  }
  getDistinctTypes():string[]{
    let types:string[]=[].concat(...this.entries.map(
      value =>{
        return value.measurementReport.types.map(type=>{
          return type.meta.identifier;
        });
      }
    ));
    types = [...new Set(types)];
    return types;
  }
  getDistinctCategories():string[]{
    let categories:string[]=[].concat(...this.entries.map(
      value =>{
        return value.measurementReport.categories.map(category=>{
          return category.meta.identifier;
        });
      }
    ));
    categories = [...new Set(categories)];
    return categories;
    
  }
  getTime():string[]{
    let startTime: string= new Date(Number(this.entries[0].meta.time.timePeriodStart)*1000).toLocaleTimeString();
    let endTime: string= new Date(Number(this.entries[0].meta.time.timePeriodEnd)*1000).toLocaleTimeString();
    
    return [this.entries[0].meta.time.day, startTime, endTime]
  }
  getEntryPerUser(username:String):Entry{
    let entry:Entry=this.entries.find(
      value =>username.toLowerCase()===value.meta.participant.username.toLowerCase()
    );
    return entry;
  }
  getReportsPerType(identifier:String):any{
    let types:[String,Type] []=this.entries.map(
      value =>{
        let t:Type= value.measurementReport.types.find(
          type=>type.meta.identifier.toLowerCase()===identifier.toLowerCase()
        );

        return [value.meta.participant.username,t];
      }
    );
    let result=[];
    for(var type of types){
      if(type[1]){
        let obj={name:type[0],
          missingAmount:type[1].missing.amount,
          missingMax:type[1].missing.max,
          missingAverage:type[1].missing.avr,
          delayAmount:type[1].delay.amount,
          delayMax:type[1].delay.max,
          delayAverage:type[1].delay.avr,
      }
      result.push(obj);
      }
    }
    return result;
  }

  getReportsPerCategory(identifier:String):any{
    let categories:[String,Category] []=this.entries.map(
      value =>{
        let t:Category= value.measurementReport.categories.find(
          category=>category.meta.identifier.toLowerCase()===identifier.toLowerCase()
        );

        return [value.meta.participant.username,t];
      }
    );
    let result=[];
    for(var type of categories){
    if(type[1]){
      let obj={name:type[0],
        missingAmount:type[1].missing.amount,
        missingMax:type[1].missing.max,
        missingAverage:type[1].missing.avr,
        delayAmount:type[1].delay.amount,
        delayMax:type[1].delay.max,
        delayAverage:type[1].delay.avr,
    }
    result.push(obj);
    }

    }
    return result;
  }
}
