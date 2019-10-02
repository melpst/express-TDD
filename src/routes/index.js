import {Router} from 'express'
import {finalConfig} from '../../config'
import user from './user'
import activity from './activity'
import { logger } from '../logger'
import { DateTime } from 'luxon'
import moment from 'moment-timezone'

const router = Router()

router.use('/user', user)
router.use('/activity', activity)

router.get('/', (req,res) => res.send({'text': finalConfig.name}))

router.get('/time', (req,res) => {
    const today = {
        date: null,
        time: moment.tz(new Date(),'Asia/Bangkok')
    }

    logger.debug(today.time.toString())
    logger.debug(typeof(today.time))
    res.send({time: today.time.format()})
})

module.exports = router