const express=require('express')
const router=express.Router()
const { handleUserAudit,handleFileAudit }=require('../controllers/audit.controller')
const checkToken=require('../middlewares/auth')

router.get('/:userid',checkToken,handleUserAudit);

router.get('/:fileid',checkToken,handleFileAudit);

module.exports=router