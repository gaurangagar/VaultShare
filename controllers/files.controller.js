const { v4: uuidv4 } = require('uuid');
const File = require('../models/file');
const cloudinary = require('../config/cloudinary');

async function handleFileUpload(req, res) {
  try {
    const file = req.file;
    console.log('file', file);

    // Convert buffer to base64 and prepend Data URI scheme
    const base64 = file.buffer.toString('base64');
    const dataURI = `data:${file.mimetype};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'raw',
    });
    console.log('result', result);
    const uploadedFile = await File.create({
      originalName: file.originalname,
      secureUrl: result.secure_url,
      signature: result.signature,
      createdBy: req.user._id,
      public_id: result.public_id,
    });
    console.log(uploadedFile);
    res.status(200).json({ url: result.secure_url, info: result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
}

async function handleallFiles(req, res) {
  try {
    const allFiles = await File.find({ createdBy: req.user._id });
    console.log(allFiles);
    res.status(200).json(allFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Files handling failed' });
  }
}

async function handleFileDownload(req, res) {
  try {
    console.log('params', req.params);
    const fileid = req.params.id;
    console.log('fileid', fileid);
    const file = await File.findById(fileid);
    if (!file) return res.status(404).json({ error: 'no file found' });
    if (file.createdBy != req.user._id) return res.status(401).json({ error: 'this is not your file' });
    res.redirect(file.secureUrl);
  } catch {
    res.status(500).json({ message: 'file download error' });
  }
}

async function handleFileDelete(req, res) {
  try {
    console.log('params', req.params);
    const fileid = req.params.id;
    console.log('fileid', fileid);
    console.log('11');
    const file = await File.findById(fileid);
    console.log('1');
    console.log(file);
    if (!file) return res.status(404).json({ error: 'no file found' });
    if (file.createdBy.toString() != req.user._id.toString()) return res.status(403).json({ error: 'this is not your file' });
    await File.findByIdAndDelete(fileid);
    const result = await cloudinary.uploader.destroy(file.public_id, {
      resource_type: 'raw',
    });
    console.log(result);
    res.status(200).json({ success: true, message: 'File deleted', cloudinaryResult: result });
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).json({ message: 'File deletion error' });
  }
}

async function handleFileShare(req, res) {
  try {
    console.log('params', req.params);
    const fileid = req.params.id;
    console.log('fileid', fileid);
    const file = await File.findById(fileid);
    console.log(file);
    if (!file) return res.status(404).json({ error: 'no file found' });
    if (file.createdBy.toString() != req.user._id.toString()) return res.status(403).json({ error: 'this is not your file' });
    const token = uuidv4();
    file.shareToken = token;
    file.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await file.save();

    res.status(200).json({ success: true, message: 'token generated', token });
  } catch (error) {
    console.error('Error generated token:', error);
    res.status(500).json({ message: 'Token generated failed.' });
  }
}

module.exports = {
  handleFileUpload,
  handleallFiles,
  handleFileDownload,
  handleFileDelete,
  handleFileShare,
};