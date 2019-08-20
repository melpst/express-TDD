import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import {temp} from './models'

const app = express()

const client = mongoose.createConnection(process.env.MONGODB_URL,  { useNewUrlParser: true })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  const tempSchema = client.model('temp', temp)
  tempSchema.find().exec((err, docs) => {
    if(err){
      res.status(500).send(err.message)
    }
    else{
      console.log(JSON.stringify(docs))
      res.status(200).send(JSON.stringify(docs))
    }
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))