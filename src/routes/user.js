import {Router} from 'express'
import mongoose from 'mongoose'
import userModel from '../models'
import {DALController} from '../controller'
import { logger } from '../logger';
import { ElasticService } from '../controller/elastic'

const router = Router()
const dal = new DALController()
const elastic = new ElasticService()
const userColl = mongoose.model('user', userModel)

function findAll(filter, sort, limit, coll, res){
  dal.findAll(filter, sort, limit, coll)
  .then((docs) => {
    logger.debug(docs)
    res.status(200).send(docs)
  })
  .catch((err)=>{
    logger.error(err)
    res.status(500).send(err.message)
  })
}

router.get('/', (req, res) => {
  logger.info(`GET /user`)
  findAll({}, {'_id': 'desc'}, null, userColl, res)
})

router.get('/test', (req,res) => {
  res.render('index')
})

router.get('/:id', (req, res) => {
  // findAll({'_id': req.params.id}, {'_id': 'desc'}, 1, userColl, res)
  logger.info(`GET /user/${req.params.id}`)
  dal.findAll({'_id': req.params.id}, {'_id': 'desc'}, 1, userColl)
  .then((docs) => {
    logger.debug(docs)
    res.render('all', {users: docs})
  })
  .catch((err)=>{
    logger.error(err)
    res.status(500).send(err.message)
  })
})

router.put('/:id', (req, res) => {
  logger.info(`PUT /user/${req.params.id}`)
  dal.findOneAndUpdate({'_id': req.params.id}, {'name': 'test deprecate'}, {'new': true}, userColl)
  .then((docs) => {
    logger.debug(docs)
    res.status(200).send(docs)
  })
  .catch((err)=>{
    logger.error(err)
    res.status(500).send(err.message)
  })
})

router.post('/', (req, res) => {
  logger.info(`POST /user`)
  logger.info(`req : ${JSON.stringify(req.body)}`)
  const newUser = new userColl(req.body)

  dal.save(newUser)
  .then((docs) => {
    logger.debug(docs)
    res.status(200).send(docs)
    elastic.save(req.body)
  })
  .catch((err)=>{
    logger.error(err)
    res.status(500).send(err.message)
  })
})

router.post('/getUserById', (req, res) => {
  logger.info(`POST /getUserByID`)
  logger.info(`req : ${req.body.id}`)
  dal.findAll({'_id': req.body.id}, {'_id': 'desc'}, null, userColl)
  .then((docs) => {
    logger.debug(docs)
    let users = '<table><thead><td>id</td><td>name</td><td>text</td></thead><tbody>'
    docs.forEach(doc => {
      users += '<tr><td>'+doc._id+'</td><td>'+doc.username+'</td><td>'+doc.text+'</td></tr>'
    });
    users += '</tbody></table>'
    res.status(200).send(users)
  })
  .catch((err)=>{
    logger.info(err)
    res.status(500).send(err.message)
  })
})

module.exports = router