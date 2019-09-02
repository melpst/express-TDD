import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import router from './routes'
import path from 'path'

mongoose.connect(process.env.MONGODB_URL+'&authSource=admin',  { useNewUrlParser: true , useFindAndModify: false})
.then(() => console.log('connected'))
.catch((err) => console.log(err))

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', router)


app.listen(4000, () => console.log('Example app listening on port 4000!'))