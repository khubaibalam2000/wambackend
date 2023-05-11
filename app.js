const { MongoClient } = require("mongodb");
const express = require('express');

const uri =
"mongodb+srv://wasif1060:wasif1050@cluster0.bzinu5s.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
// await client.connect();
const dbName = "mernproject";
const collectionName = "students";
const database = client.db(dbName);
const collection = database.collection(collectionName);
var port = process.env.PORT || 5000;
var cors = require('cors')
const app = express();
app.use(cors())
app.listen (port, () => console.log('Server is running on port: '+ port));

// trigger

app.use(express.json());

app.get('/getStudent', async (req, res)  => {
    result = await collection.find().toArray();
    res.send(result);
});

app.post('/postStudent', async (req, res)  => {
    console.log(req.body);
    data = req.body;
    data['createdat'] = new Date();
    result = await collection.insertOne(data);
    res.send(result);
});