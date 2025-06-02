const express=require('express')
const router=express.Router()
const checkToken=require('../middlewares/auth')
const { AccessFileThroughToken, DeleteFileToken }=require('../controllers/share.controller')

router.get('/:token',checkToken, AccessFileThroughToken)

router.delete('/:token',checkToken,DeleteFileToken)

module.exports=router