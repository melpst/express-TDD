import mongoose from 'mongoose'
import {finalConfig} from '../config'
import { logger } from './logger'

if(finalConfig.database.dialect === 'mongo'){
    mongoose.connect(finalConfig.database.url,  { useNewUrlParser: true , useFindAndModify: false})
    .then(() => {
        logger.info('connected to db')
    })
    .catch((err) => logger.error(err))
    module.exports = mongoose.connection
}
else if(finalConfig.database.dialect === 'mock'){
    const db = {
        url: "mock url"
    }
    module.exports = db
}