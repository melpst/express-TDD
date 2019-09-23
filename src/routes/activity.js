import {Router} from 'express'
import mongoose from 'mongoose'
import activityModel from '../models'
import {DALController} from '../controller'
import { logger } from '../logger';
import { ElasticService } from '../controller/elastic'

const router = Router()
const dal = new DALController()
const elastic = new ElasticService()
const activityColl = mongoose.model('activity', activityModel)

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
  logger.info(`GET /activity`)
  findAll({}, {'_id': 'desc'}, null, activityColl, res)
})

router.post('/', (req, res) => {
  logger.info(`POST /activity`)
  logger.info(`req : ${JSON.stringify(req.body)}`)
  const newactivity = new activityColl(req.body)

  dal.save(newactivity)
  .then((docs) => {
    logger.debug(docs)
    res.status(200).send(docs)
    elastic.saveActivity(req.body)
  })
  .catch((err)=>{
    logger.error(err)
    res.status(500).send(err.message)
  })
})

module.exports = router