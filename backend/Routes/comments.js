const express = require('express');
const db = require('../mySqlDb');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        const [comments] = await db.getConnection().execute('SELECT * FROM comments WHERE post_id = ?', [req.query.post_id]);

        return res.send(comments);
    }catch (e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        if (!req.body.comment) {
            return res.status(400).send({message: 'Comment is required!'});
        }

        const comment = {
            post_id: req.body.post_id,
            author: req.body.author,
            comment: req.body.comment,
        }

        if(req.body.author){
            comment.author = req.body.author;
        }else{
            comment.author = 'Anonymous';
        }

        let query = 'INSERT INTO comments (post_id, author, comment) VALUES (?, ?, ?)';

        const [result] = await db.getConnection().execute(query, [
            comment.post_id,
            comment.author,
            comment.comment,
        ]);

        const id = result.insertId;

        const newComment = {
            id: id,
            post_id: comment.post_id,
            author: comment.author,
            comment: comment.comment,
        }

        return res.send(newComment);
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await db.getConnection().execute('DELETE FROM comments WHERE id = ?', [req.params.id]);

        return res.send({message: 'Delete comment by id: ' + req.params.id});
    } catch (e) {
        next(e);
    }
});

module.exports = router;

