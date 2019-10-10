global.__basedir = path.resolve(__dirname, '../')

import { logger } from 'src/logger'
import express from 'express'
import bodyParser from 'body-parser'
import router from 'src/routes'
import path from 'path'
import database from 'src/database'
import {finalConfig} from 'config'

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', router)

const server = app.listen(finalConfig.port, () => {
    logger.info(`server is running on port ${finalConfig.port} and in ${finalConfig.name} mode`)
})

module.exports = server
module.exports.db = database