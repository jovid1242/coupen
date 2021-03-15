const MongoClient = require("mongodb").MongoClient;
require('dotenv').config()
const url = process.env.DB_URL;

const mongoClient = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverSelectionTimeoutMS: 5000 });
mongoClient.connect(function (err, client) {
    if (err) {
        return console.log(err);
    }
    global.DB = client.db("republic")
    console.log('Mongodb started')
})
