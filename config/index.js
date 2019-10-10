import config from './config.json'

const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];

environmentConfig.database.url = process.env.MONGODB_URL+environmentConfig.database.url

const finalConfig = {
    ...environmentConfig,
    ELASTIC_URL: process.env.ELASTIC_URL
}

console.log(finalConfig)

export {finalConfig}
