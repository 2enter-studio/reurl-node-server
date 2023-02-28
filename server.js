const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();


const mongo_uri = process.env.MONGO_URI;
const port = process.env.PORT || 3000;


const reurl_schema = new mongoose.Schema({
    route: String,
    link: String
});

const Reurl = mongoose.model('reurls', reurl_schema);


mongoose.connect(mongo_uri)

const connection = mongoose.connection

connection.once('open', async () => {
    const collection  = connection.db.collection("reurls");
    collection.find({}).toArray((err, data) => {
        console.log(data)
        data.forEach(element => {
            app.get(`/${element.route}`, (req, res) => {
                res.redirect(element.link);
            });
        });
    });
});

connection.on('error', (err) => {
    console.log(err)
})

const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
