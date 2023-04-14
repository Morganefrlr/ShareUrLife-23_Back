import express from 'express'
const router = express.Router()
import { addRelation, deleteRelation, getFollowed, getFollower, getIdFollowed } from '../controllers/relationControl.js'
import {auth} from "../middleware/auth.js" 


router.post('/',auth, addRelation)
router.get('/:id',auth, getIdFollowed)
router.delete('/:id',auth, deleteRelation)
router.get('/follower/:id',auth, getFollower)
router.get('/followed/:id',auth, getFollowed)


export default router