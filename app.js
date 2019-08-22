import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import router from './routes'

mongoose.connect(process.env.MONGODB_URL+'&authSource=admin',  { useNewUrlParser: true })
.then(() => console.log('connected'))
.catch((err) => console.log(err))


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', router)

app.listen(4000, () => console.log('Example app listening on port 4000!'))