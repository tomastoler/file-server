const router = require('express').Router();
const processPath = require('../lib/path');
const fs = require('fs');

router.get(':path?', (req, res) => {
    const path = processPath(req.params.path);

});

module.exports = router;