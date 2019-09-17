import log4js from 'log4js'
import {finalConfig} from '../config'
const current_datetime = new Date();
var Log_config = log4js.configure({
  appenders: {
    work: {
      type: "file",
      filename: "./logs/"+ current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()+ " app.log" ,       
      maxLogSize: 10485760,
      numBackups: 3
    },
    test: {
      type: "file",
      filename: "./logs/test/"+ current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear()+ " app.log" ,       
      maxLogSize: 10485760,
      numBackups: 3
    },
    console:{
      type: "console"
    }
  },
  categories: {
    prod: { "appenders": ["work","console"] , "level": "INFO" },
    default: { "appenders": ["work","console"] , "level": "DEBUG" },
    test: { "appenders": ["test"] , "level": "TRACE" }
  }
});

const logger = log4js.getLogger(finalConfig.logger);

export {
  logger,Log_config
}