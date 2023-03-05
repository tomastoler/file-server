const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const processPath = require('../lib/path');

router.post('/:path', (req, res) => {
    const { relativePath, absolutePath } = processPath(req.params.path);
    const dirName = req.body.dirName;

    const fullPath = path.join(absolutePath, dirName);

    fs.mkdir(fullPath, (err) => {
        if (err) {
            res.status(400).json({
                err
            });
        } else {
            res.status(200).json({
                message: "directory created successfully",
                path: relativePath,
            });
        }
    });
});

module.exports = router;