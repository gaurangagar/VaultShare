const Audit = require('../models/audit');

async function handleFileAudit(req, res) {
    try {
        const fileid = req.params.fileid;
        const audits = await Audit.find({ file: fileid }).sort({ timestamps: 1 });
        if (!audits) {
            return res.status(404).json({ message: 'No audit records found.' });
        }
        res.status(200).json(audits);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }   
}

async function handleUserAudit(req, res) {
    try {
    const userid = req.params.userid;
    const audits = await Audit.find({ user: userid }).sort({ createdAt: 1 });

    if (audits.length === 0) {
      return res.status(404).json({ message: 'No audit records found for this user.' });
    }
    res.status(200).json(audits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
    handleFileAudit,
    handleUserAudit
};