const File=require('../models/file')

async function AccessFileThroughToken(req,res) {
    try{
        const token=req.params.token
        const file=await File.findOne({shareToken:token})
        if (!file) return res.status(404).json({ error: 'no file found' });
        return res.status(200).json(file);
    } catch(err) {
        res.status(500).json({ message: 'file accessing error', err });
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
        return res.status(200).json({ message: 'token deleted successfully' });
    } catch(err) {
        res.status(500).json({ message: 'token deletion error', err });
    }
}

module.exports={
    AccessFileThroughToken,
    DeleteFileToken
}