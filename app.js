import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import {temp} from './models'

const app = express()

const client = mongoose.createConnection(process.env.MONGODB_URL,  { useNewUrlParser: true })
const tempSchema = client.model('temp', temp)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
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

app.post('/', (req, res) => {
  let newTemp = new tempSchema()
  newTemp.text = "new temp"
  newTemp.save((err, docs) => {
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