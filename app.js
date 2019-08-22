import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import {DALController} from './controller'


mongoose.connect(process.env.MONGODB_URL+'&authSource=admin',  { useNewUrlParser: true })
.then(() => console.log('connected'))
.catch((err) => console.log(err))
import userSchema from './models'

const app = express()
const dal = new DALController()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  const coll = mongoose.model('user', userSchema)
  dal.findAll({'_id': '5d5d62c3ab56e83654c12883'}, {'_id': 'desc'}, 1, coll)
  .then((docs) => {
    console.log(docs)
    res.status(200).send(docs)
  })
  .catch((err)=>{
    console.log(err)
    res.status(500).send(err.message)
  })
})

app.post('/', (req, res) => {
  let newuser = new User()
  newuser.text = "new user"
  newuser.set('username', "hhoooooooooooooooooo")
  newuser.save((err, docs) => {
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