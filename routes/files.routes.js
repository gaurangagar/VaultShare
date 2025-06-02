const express=require('express')
const multer = require('multer')
const router=express.Router()
const { handleFileUpload,handleallFiles,handleFileDownload,handleFileDelete,handleFileShare }=require('../controllers/files.controller')
const checkToken=require('../middlewares/auth')

const upload = multer()

router.post('/upload',upload.single('file'),checkToken,handleFileUpload)

router.get('/allfiles',checkToken,handleallFiles)

router.get('/download/:id',checkToken,handleFileDownload)

router.delete('/:id',checkToken,handleFileDelete)

router.post('/share/:id',checkToken,handleFileShare)

module.exports=router