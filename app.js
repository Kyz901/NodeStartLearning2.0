const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const config = require('./configs/config');
const router = require('./api/router');
const { SERVER_ERROR } = require("./configs/enums/error.codes.enum");

const app = express();
mongoose.set('debug', true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use(mainErrorHandler);

app.listen(config.APP_PORT, async () => {
    try {
        mongoose.set('strictQuery', true);
        const connection = await mongoose.connect(config.MONGO_DB_URL);

        if (connection) {
            console.log('Database successfully connected!');
        }
    } catch (err) {
        if (err) console.log(err);
        process.exit(1);
    }
    console.log(`Listening on port: ${config.APP_PORT}`);
});

function mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || SERVER_ERROR)
        .json({
            message: err.message || 'Unknown error'
        });
}
