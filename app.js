const { MongoClient } = require("mongodb");
const express = require('express');

const uri =
"mongodb+srv://kukudb:kukudb@my-cluster.gdjpc4s.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);
// await client.connect();
const dbName = "My-Cluster";
const collectionName = "assets";
const database = client.db(dbName);
const collection = database.collection(collectionName);
var port = process.env.PORT || 3000;

const app = express();
app.listen (port, () => console.log('Server is running on port: '+ port));



app.use(express.json());

app.get('/getAsset', async (req, res)  => {
    result = await collection.find().toArray();
    res.send(result);
});

app.post('/postAsset', async (req, res)  => {
    console.log(req.body);
    data = req.body;
    data['createdat'] = new Date();
    result = await collection.insertOne(data);
    res.send(result);
});

