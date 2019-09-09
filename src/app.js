const debug =require('debug')('server:debug');
import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import config from 'config'
import router from './routes'
import path from 'path'

mongoose.connect(process.env.MONGODB_URL+config.get('database'),  { useNewUrlParser: true , useFindAndModify: false})
.then(() => console.log('connected'))
.catch((err) => console.log(err))

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', router)


app.listen(4000, () => {
    debug(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
    console.log(`server is running on port ${config.get('port')} and in ${config.get('name')} mode`);
})