const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
const db = require('../mySqlDb');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
    try{
        let query = 'SELECT * FROM posts';
        let [news] = await db.getConnection().execute(query);

        return res.send(news);
    }catch (e) {
        next(e);
    }
})

module.exports = router;