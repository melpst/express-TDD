import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import {temp} from './models'

const app = express()

const testDB = mongoose.createConnection(process.env.MONGODB_URL,  { useNewUrlParser: true })
const tempSchema = testDB.model('temp', temp)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  tempSchema.find().exec((err, docs) => {
    if(err){
      res.status(500).send(err.message)
    }
    else{
      console.log(docs)
      res.status(200).send(docs)
    }
  })
})

app.post('/', (req, res) => {
  let newTemp = new tempSchema()
  newTemp.text = "new temp"
  newTemp.set('username', "hhoooooooooooooooooo")
  newTemp.save((err, docs) => {
    if(err){
      res.status(500).send(err.message)
    }
    else{
      console.log(docs)
      res.status(200).send(docs)
    }
  })
})


app.listen(3000, () => console.log('Example app listening on port 3000!'))