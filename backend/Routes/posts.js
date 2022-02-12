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
});

router.post('/', upload.single('image'), async (req, res, next) => {
    try {
        if (!req.body.title || !req.body.content) {
            return res.status(400).send({message: 'Title and news content are required!'});
        }

        const news = {
            title: req.body.title,
            content: req.body.content,
            image: null,
            date: new Date(),
        }

        if (req.file) {
            news.image = req.file.filename;
        }

        let query = 'INSERT INTO posts (title, content, image, date) VALUES (?, ?, ?, ?)';

        const [result] = await db.getConnection().execute(query, [
            news.title,
            news.content,
            news.image,
            news.date
        ]);

        const id = result.insertId;

        const newNews = {
            id: id,
            content: news.content,
            image: news.image,
            date: news.date,
        }

        return res.send(newNews);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const [news] = await db.getConnection().execute('SELECT * FROM posts WHERE id = ?', [req.params.id]);
        const post = news[0];

        if(!post) {
            return  res.status(400).send({message: 'No such element'})
        }

        return res.send(post);
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await db.getConnection().execute('DELETE FROM posts WHERE id = ?', [req.params.id]);

        return res.send({message: 'Delete news by id: ' + req.params.id});
    } catch (e) {
        next(e);
    }
});

module.exports = router;