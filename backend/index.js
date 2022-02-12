const express = require('express');

const app = express();

const port = 8000;

const run = async () => {
    // await db.init();

    app.listen(port, () => {
        console.log("App listen on port " + port);
    })
}

run().catch(e => console.error(e));