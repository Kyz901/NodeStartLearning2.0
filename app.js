const express = require('express');
require('dotenv').config();
const config = require('./configs/config');
const mongoose = require('mongoose');
const router = require('./src/router');
const app = express();
mongoose.set('debug', true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

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
