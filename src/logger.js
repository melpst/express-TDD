const log4js = require('log4js')
import config from 'config'
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
    default: { "appenders": ["work","console"] , "level": "INFO" },
    test: { "appenders": ["test"] , "level": "DEBUG" }
  }
});

const logger = log4js.getLogger(config.get('logger'));

export {
  logger,Log_config
}