const path = require('path');
require('dotenv').config();

const slash = process.platform === 'win32'? '\\' : '/';

const processPath = (urlPath) => {
    const relativePath  = urlPath ? urlPath.replace(/-/g, slash) : slash;
    const absolutePath = path.join(process.env.DISK_PATH, relativePath);
    return {
        relativePath,
        absolutePath
    };
}

module.exports = processPath;