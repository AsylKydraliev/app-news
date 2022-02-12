const express = require('express');
const db = require('./mySqlDb');
const news = require('./Routes/posts');
const comments = require('./Routes/comments');
const cors = require('cors');

const app = express();

app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.static('public'));
app.use(express.json());
app.use('/news', news);
app.use('/comments', comments);

const port = 8000;

const run = async () => {
    await db.init();

    app.listen(port, () => {
        console.log("App listen on port " + port);
    });
};

run().catch(e => console.error(e));