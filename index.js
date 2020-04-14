const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 4200

//Database
const MongoClient = require('mongodb').MongoClient;
const uri =  process.env.DB_PATH
let client = new MongoClient(uri, { useNewUrlParser: true });

const mongo = require('mongodb');


//Middleware
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => res.send('Server is running!'))

app.post('/department', (req, res) => {
    const items = req.body

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("doctors-portal").collection("department");
    collection.insert(items, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err})
            
        }
        else{
            res.send(result.ops[0])
        }
    })
    client.close();
    });
})

app.post('/appointment', (req, res) => {
    const items = req.body

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("doctors-portal").collection("appointment");
    collection.insertOne(items, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err})
            
        }
        else{
            res.send(result.ops[0])
        }
    })
    client.close();
    });
})


app.get('/department', (req, res) => {

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("doctors-portal").collection("department");
    collection.find().toArray((err, documents) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err})
            
        }
        else{
            res.send(documents)
        }
    })
    client.close();
    });
})

app.get('/appointment', (req, res) => {

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("doctors-portal").collection("appointment");
    collection.find().toArray((err, documents) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err})
            
        }
        else{
            res.send(documents)
        }
    })
    client.close();
    });
})

app.get('/prescription/:_id', (req, res) => {
    const theidID = req.params._id
    const mongo = require('mongodb');
    const o_id = new mongo.ObjectID(theidID);
    console.log(theidID)
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("doctors-portal").collection("appointment");
    collection.find({'_id': o_id}).toArray((err, documents) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err})
            
        }
        else{
            res.send(documents)
        }
    })
    //client.close();
    });
})

app.get('/getPrescription/:_id', (req, res) => {
    const theidID = req.params._id
    const mongo = require('mongodb');
    const o_id = new mongo.ObjectID(theidID);
    console.log(theidID)
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("doctors-portal").collection("prescription");
    collection.find({'_id': o_id}).toArray((err, documents) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err})
            
        }
        else{
            res.send(documents)
        }
    })
    //client.close();
    });
})

app.post('/updateAppointment/:_id', (req, res) => {
    const itemsKeys = req.body;
    const theidID = req.params._id
    const mongo = require('mongodb');
    const o_id = new mongo.ObjectID(theidID);
    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("doctors-portal").collection("appointment");
          collection.findOneAndUpdate({'_id' : o_id},
          {$set: itemsKeys}, (err, result) => {
            if(err){
                console.log(err);
                res.status(500).send({message:err})
            }
            else{
                res.send(result.value)
            }
        })
          
        //client.close();
      });
})

app.post('/prescription/:_id', (req, res) => {
    const prescription = req.body
    const theidID = req.params._id
    const mongo = require('mongodb');
    const p_id = new mongo.ObjectID(theidID);
    console.log(theidID)
    prescription._id = p_id

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("doctors-portal").collection("prescription");
    collection.insertOne(prescription, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err})
            
        }
        else{
            res.send(result.ops[0])
        }
    })
    client.close();
    });
})

app.listen(port, () => console.log(` Server listening at port: ${port}`))