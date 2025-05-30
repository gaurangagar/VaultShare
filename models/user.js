const {Schema, model}=require('mongoose')

const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
        select:false
    }
},{timestamps:true})

const UserModel=model('user',userSchema)

module.exports=UserModel;