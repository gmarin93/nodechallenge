const express = require('express');
const router = express.Router();
const indexControler = require('../controllers/indexController');



router.post('/',
    indexControler.loadFile
);


module.exports = router;