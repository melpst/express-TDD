import {Router} from 'express'
import mongoose from 'mongoose'
import userModel from '../models'
import {DALController} from '../controller'

const router = Router()
const dal = new DALController()
const userColl = mongoose.model('user', userModel)

function findAll(filter, sort, limit, coll, res){
  dal.findAll(filter, sort, limit, coll)
  .then((docs) => {
    // console.log(docs)
    res.status(200).send(docs)
  })
  .catch((err)=>{
    console.log(err)
    res.status(500).send(err.message)
  })
}

router.get('/', (req, res) => {
  findAll({}, {'_id': 'desc'}, null, userColl, res)
})

router.get('/test', (req,res) => res.render('index'))

router.get('/:id', (req, res) => {
  // findAll({'_id': req.params.id}, {'_id': 'desc'}, 1, userColl, res)
  dal.findAll({'_id': req.params.id}, {'_id': 'desc'}, 1, userColl)
  .then((docs) => {
    console.log(docs)
    res.render('all', {users: docs})
  })
  .catch((err)=>{
    console.log(err)
    res.status(500).send(err.message)
  })
})


router.put('/:id', (req, res) => {
  dal.findOneAndUpdate({'_id': req.params.id}, {'name': 'test deprecate'}, {'new': true}, userColl)
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
  console.log(req.body)
  const newUser = new userColl(req.body)

  dal.save(newUser)
  .then((docs) => {
    console.log(docs)
    res.status(200).send(docs)
  })
  .catch((err)=>{
    console.log(err)
    res.status(500).send(err.message)
  })
})

router.post('/getUserById', (req, res) => {
  console.log(req.body)
  dal.findAll({'_id': req.body.id}, {'_id': 'desc'}, null, userColl)
  .then((docs) => {
    console.log(docs)
    let users = '<table><thead><td>id</td><td>name</td><td>text</td></thead><tbody>'
    docs.forEach(doc => {
      users += '<tr><td>'+doc._id+'</td><td>'+doc.username+'</td><td>'+doc.text+'</td></tr>'
    });
    users += '</tbody></table>'
    res.status(200).send(users)
  })
  .catch((err)=>{
    console.log(err)
    res.status(500).send(err.message)
  })
})



module.exports = router