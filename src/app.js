const debug =require('debug')('server:debug');
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import config from 'config'
import router from './routes'
import path from 'path'

const client = mongoose.createConnection(process.env.MONGODB_URL+config.get('database'),  { useNewUrlParser: true , useFindAndModify: false})
// .then((data) => {
//     console.log('connected to db')
//     module.exports.db = data
//     return data
// })
// .catch((err) => console.log(err))

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', router)

const server = app.listen(config.get('port'), () => {
    debug(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
    // console.log(client.client.s.url)
    console.log(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
})

module.exports.server = server
module.exports.db = client