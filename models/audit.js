const {Schema, model}=require('mongoose')

const AuditSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    file: {
      type: Schema.Types.ObjectId,
      ref: 'file',
      required: true,
    },
    action: {
      type: String,
      enum: ['upload','delete','download', 'share_access','generate_token','delete_token'],
      required: true,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    shareToken: {
      type: String, // If access was made through a share link,
      default:null
    },

},{timestamps:true})

const AuditModel=model('audit',AuditSchema)

module.exports=AuditModel;