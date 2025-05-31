const cloudinary=require('cloudinary').v2
const {cloudinaryapikey,cloudinaryapisecret}=require('./env')

cloudinary.config({
    cloud_name:'ds1wlpluy',
    api_key:cloudinaryapikey,
    api_secret:cloudinaryapisecret
})

module.exports=cloudinary