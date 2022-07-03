require('dotenv').config();
const express = require('express');
const { ObjectId } = require('mongodb');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

app.use(express.json());
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }));

app.listen(process.env.PORT, () =>{
    console.log('server is running', process.env.PORT)
})

let db;
let uri = "mongodb+srv://goodcoder2000:1082018mgmg@testing1.i6f65.mongodb.net/?retryWrites=true&w=majority"
MongoClient.connect(uri, (err, client) =>{
    if(err) throw err
    db = client.db('shoeshop')
})

app.get('/users', (req, res) =>{
    db.collection('users').find().toArray((err, result) =>{
        if(err) throw err
        res.status(200).json(result);
    })
})

app.get('/users/:id', (req,res) =>{
    const userId = req.params.id;
    db.collection('users').findOne({_id: ObjectId(userId)})
    .then((result) =>{
        res.status(200).json(result);
    })
})

app.post('/users', (req,res) =>{
    const data = req.body;
    db.collection('users').insertOne(data)
    .then((result) =>{
        res.status(201).json(result);
    })
})

app.patch('/users/:id/:method/:indexPoint', (req, res) =>{
    const method = req.params.method;
    const userId = req.params.id;
    const data = req.body;
    const indexPoint = req.params.indexPoint;
    if("push" === method){
        db.collection('users').updateOne({_id: ObjectId(userId)}, {$addToSet: {cartItems: data}})
        .then((result) =>{
            res.status(201).json(result)
        })
    } else if("pull" === method){
        db.collection('users').updateOne({_id: ObjectId(userId)}, {$pull: {cartItems: data}})
        .then((result) =>{
            res.status(201).json(result)
        })
    } else if("ordered" === method){
        db.collection('users').updateOne({_id: ObjectId(userId)}, {$push: {orderConformed: data}})
        .then((result) =>{
            res.status(201).json(result)
        })
    } 
})

// for menu collection

app.get('/shoesmenu', (req, res) =>{
    db.collection('shoesmenu').find().toArray((err, result) =>{
        if(err) throw err
        res.status(200).json(result);
    })
})

app.get('/shoesmenu/:id', (req, res) =>{
    const data = req.params.id;
    db.collection('shoesmenu').findOne({_id: ObjectId(data)})
    .then((result) =>{
        res.status(200).json(result);
    })
})

app.post('/shoesmenu', (req,res) =>{
    const data = req.body;
    db.collection('shoesmenu').insertOne(data)
    .then((result) =>{
        res.status(201).json(result);
    })
})

// admin

app.get('/admin/orderconform/api', (req, res) =>{
    db.collection('users').find().sort({time: 1}).toArray((err, result) =>{
        if(err) throw err
        res.status(200).json(result);
    })
})