import {Router} from 'express'
import user from './user'

const router = Router()

router.use('/user', user)

router.get('/', (req,res) => res.send('hello, world'))

module.exports = router