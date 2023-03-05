const router = require('express').Router();
const processPath = require('../lib/path');
const fs = require('fs');

router.get('/:path?', async (req, res) => {
    const { relativePath, absolutePath } = processPath(req.params.path);

    const dir = await fs.promises.opendir(absolutePath);
    let content = {
        files: [],
        directories: []
    }

    for await (const dirent of dir) {
        if (dirent.isDirectory()) {
            content.directories.push(dirent.name);
        } else {
            content.files.push(dirent.name);
        }
    }

    content.files = content.files.sort();
    content.directories = content.directories.sort();
    
    res.json({
        path: relativePath,
        content
    });
});

module.exports = router;