const {Schema, model}=require('mongoose')

const FileSchema=new Schema({ 
    originalName: {
        type: String,
        required: true,
    },
    secureUrl: {
        type: String,
        required: true,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    public_id:{
        type: String,
        required: true,
    },
    signature:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    shareToken: { 
        type: String,
        unique: true,
        sparse: true,
    },
    expiresAt: { 
        type: Date 
    }
},{timeStamps:true})

const FileModel=model('file',FileSchema)

module.exports=FileModel;