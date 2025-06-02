const cloudinary=require('cloudinary').v2
const {cloudinaryname,cloudinaryapikey,cloudinaryapisecret}=require('./env')

cloudinary.config({
    cloud_name:cloudinaryname,
    api_key:cloudinaryapikey,
    api_secret:cloudinaryapisecret
})

module.exports=cloudinary