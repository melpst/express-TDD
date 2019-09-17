import {Router} from 'express'
import {finalConfig} from '../../config'
import user from './user'

const router = Router()

router.use('/user', user)

router.get('/', (req,res) => res.send({'text': finalConfig.name}))

module.exports = router