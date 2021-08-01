const express = require("express");
const app = express();
const bodyParser = require('body-parser');

/*Port Config*/
const port = process.env.PORT || 3000;

/* .env file configuration */
require('dotenv').config({ path: `${__dirname}/.env` });

/*request config*/
app.use(bodyParser.json({ limit: '50mb' }));

app.use((req, res, next) => {
    next();
});

const stream = require('./controller/stream')
const auth = require('./middleware/auth');

app.get('/login/:userType', stream.login)
app.post('/stream', auth.validateToken, stream.stream)

app.listen(port, function (req, res) {
    console.log("Port :", port)
})

module.exports = app;







