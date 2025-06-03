const File=require('../models/file')
const Audit=require('../models/audit')

async function AccessFileThroughToken(req,res) {
    try{
        const token=req.params.token
        const file=await File.findOne({shareToken:token})
        if (!file) return res.status(404).json({ error: 'no file found' });
        if (file.expiresAt && file.expiresAt < new Date()) {
            return res.status(403).json({ error: 'share token expired' });
        }
        await Audit.create({
            user:req.user._id,
            file:file._id,
            action:'share_access',
            ipAddress:req.ip,
            userAgent:req.get('User-Agent'),
            shareToken:token
        })
        return res.status(200).json(file);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'file accessing error' });

    }
}

async function DeleteFileToken(req,res) {
    try{
        const token=req.params.token
        const file=await File.findOne({shareToken:token})
        if (!file) return res.status(404).json({ error: 'no file found' });
        file.shareToken=null
        file.expiresAt=null
        await file.save()
        await Audit.create({
            user:req.user._id,
            file:file._id,
            action:'delete_token',
            ipAddress:req.ip,
            userAgent:req.get('User-Agent'),
            shareToken:token
        })
        return res.status(200).json({ message: 'token deleted successfully' });
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'token deletion error' });
    }
}

module.exports={
    AccessFileThroughToken,
    DeleteFileToken
}