const router = require('express').Router();
const processPath = require('../lib/path');
const mime = require('mime-types');

router.get('/:path?', (req, res) => {
    const path = processPath(req.params.path).absolutePath;
    const mimetype = mime.lookup(path);

    res.setHeader('Content-Disposition', `attachment; filename=${path}`);
    res.setHeader('Content-Type', mimetype);
    res.download(path);
});

module.exports = router;