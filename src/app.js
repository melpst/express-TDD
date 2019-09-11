import { logger } from './logger'
import config from 'config'
import express from 'express'
import bodyParser from 'body-parser'
import router from './routes'
import path from 'path'
import database from './database'

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', router)

const server = app.listen(config.get('port'), () => {
    logger.info(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`)
})

module.exports = server
module.exports.db = database