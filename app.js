const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const placeRouters = require('./routes/place-router')
const userRouters = require('./routes/user-router')
const app = express();

app.use(bodyParser.json());
app.use('/api', placeRouters);
app.use('/api/user', userRouters); //High priority

app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'page not find' })
})

mongoose.connect("mongodb://Learn_db:learndb@cluster0-shard-00-00.z0oyc.mongodb.net:27017,cluster0-shard-00-01.z0oyc.mongodb.net:27017,cluster0-shard-00-02.z0oyc.mongodb.net:27017/place_user?ssl=true&replicaSet=atlas-sbpzih-shard-0&authSource=admin&retryWrites=true&w=majority")
    .then(() => {
        app.listen(3000);

    }).catch(error => {
        console.log(error)
    });
