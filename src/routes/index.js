import {Router} from 'express'
import {finalConfig} from '../../config'
import user from './user'
import activity from './activity'

const router = Router()

router.use('/user', user)
router.use('/activity', activity)

router.get('/', (req,res) => res.send({'text': finalConfig.name}))

module.exports = router