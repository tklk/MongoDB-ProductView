const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const serverLogDir = path.join(__dirname, 'server', 'logs');
const app = express();

app.use(morgan('dev'));
app.use(helmet()); // protection
app.use(compression()); // asset compression
if (app.settings.env === "development" ) {
    const accessLogStream = fs.createWriteStream(path.join(serverLogDir, 'access.log'), { flags: 'a' });
    app.use(morgan({ stream: accessLogStream }));
}

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Security-Policy', "default-src *; img-src * 'self' data: https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src  'self' 'unsafe-inline' *");
    next();
});

// Create link to Angular build directory
const distDir = __dirname + "/client/dist/productlist/server/main";
// const distDir = __dirname + "/client/dist/productlist/browser";
app.use(express.static(distDir));

let router = express.Router();
router = require(path.join(__dirname, 'server', 'router.js'))(app);

app.use((err, req, res, next) => {
    if (app.settings.env === "development") {
        errorLogStream = fs.createWriteStream(path.join(serverLogDir, 'error.log'), { flags: 'a' });
        const meta = '[' + new Date() + '] ' + req.url + '\n';
        errorLogStream.write(meta + err.stack + '\n');
    }
});

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        const port = process.env.PORT || 8000;
        app.listen(port, () => {
            console.log(`[:: Server run] DB connect and Express server listening on port: ${port} in ${app.settings.env} mode`);
            console.log(`[:: Server run] Node Express server listening on http://localhost:${port}`);
        });
    } catch (err) {
        console.log('error: ' + err);
    }
})();


