const router = require('express').Router();
const processPath = require('../lib/path');
const fileUpload = require('express-fileupload');
const moveFile = require('../lib/mv');

router.use(fileUpload());

router.post('/:path?', async (req, res) => {
    const { relativePath, absolutePath } = processPath(req.params.path);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let files = req.files.file;

    if (!Array.isArray(files)) {
        files = [files];
    }

    try {
        for (const file of files) {
            await moveFile(file, absolutePath);
        }
    } catch (err) {
        return res.status(400).json({ error: err});
    }

    return res.status(200).json({
        message: 'Files moved.',
        path: relativePath,
    });
});

module.exports = router;