import {Router} from 'express'
import mongoose from 'mongoose'
import userModel from '../models'
import {DALController} from '../controller'

const router = Router()
const dal = new DALController()

router.get('/', (req, res) => {
  const coll = mongoose.model('user', userModel)
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

router.post('/', (req, res) => {
  let newuser = new userModel()
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

module.exports = router