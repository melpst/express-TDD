import { logger } from '../logger'
const { Client } = require('@elastic/elasticsearch')
import {finalConfig} from '../../config'

const client = new Client({
    node: finalConfig.ELASTIC_URL
})

const userMapping = {
    "properties": {
        "username": {
            "type": "text"
        },
        "text":{
            "type": "text"
        }
    }
};

async function insertUser(user){
    let indexStr = `user-${user.username}`;
    logger.info(user)
    let haveIndex = false;
    try{
        if(!await client.indices.exists({index: indexStr})){
            logger.debug(`try create index: [${indexStr}]`);
            await client.indices.create({
                index: indexStr,
                body: {
                    mappings:userMapping,
                    settings: {}
                }
            });
            logger.info(`create index: [${indexStr}] success`);
        }
        haveIndex = true;
    }
    catch(err){
        if(err.body !== undefined && err.body.error !== undefined){
            if(err.body.error.type === 'resource_already_exists_exception'){
                haveIndex = true;
                logger.debug(`create index: [${indexStr}] already exist`);
            }
            else{
                logger.info("cannot create index: ",err.body);
            }
        }
        else{
            logger.error("error is undefined"+ err);
        }
        
    }
    if(haveIndex){
        try{
            await client.index({
                index: indexStr,
                type: '_doc',
                refresh: true,
                body: user
            });
            logger.debug("insert user: "+JSON.stringify(user)+" success");
        }
        catch(err){
            console.log("from elastic",JSON.stringify(err))
            logger.error("cannot insert user: ",err.body.error.type);
        }
    }
    
}

class ElasticService {
    constructor() {
        this.indexTable = {};
        this.save = insertUser;
        //this.update = elastic_update;

    }
}


export {
    ElasticService
};