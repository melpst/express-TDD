import express from 'express'
import bodyParser from 'body-parser'
import {MongoClient} from 'mongodb'

const app = express()

const client = new MongoClient(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

client.connect((err) => {
  if (err){
    console.log('error', err)
  }
  else{
    console.log('connected to db')
  }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  client.db('test').collection('temp').find().toArray((err, docs) => {
    console.log(docs)
    res.status(200).send(JSON.stringify(docs))
  })
})

app.listen(5000, () => console.log('Example app listening on port 5000!'))