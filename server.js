const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();


const mongo_uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

mongoose.connect(mongo_uri)

const connection = mongoose.connection

connection.once('open', async () => {
    const collection  = connection.db.collection("reurls");
    collection.find({}).toArray((err, data) => {
        data.forEach(element => {
            app.get(element.route, (req, res) => {
                res.redirect(element.link);
            });
        });
    });
});

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
