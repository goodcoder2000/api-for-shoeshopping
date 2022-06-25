const express = require("express");
const cors = require("cors");
const app = express();
const mongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");

app.use(express.json());

app.use(cors(
    {
        "origin":   "*"
    }
))

app.listen(process.env.PORT || 3001, () =>{
    console.log("Server is running at 3001");
})

let db;
let uri = "mongodb+srv://goodcoder2000:1082018mgmg@testing1.i6f65.mongodb.net/?retryWrites=true&w=majority";
mongoClient.connect(uri, (err, client) =>{
    if(err) throw err

    db = client.db("shoeshop");
})


// getting all users
app.get('/users', (req, res) =>{
    db.collection('users').find().toArray((err, result) =>{
        if(err){
            res.status(500).json({err: err})
        }
    
        res.status(200).json(result);
    })
    
})
// get single docs
app.get('users/:id', (req, res) =>{
    const useId = req.params.id;
    db.collection('users').findOne({_id: ObjectId(useId)})
    .then((result) =>{
        if(err){
            res.status(500).json({err: err})     
        }   
        res.status(200).json(result);
    })
})

// post 
app.post('/users', (req, res) =>{
    const data = req.body;
    db.collection('users').insertOne(data)
    .then((result) =>{
        if(err){
            res.status(500).json({err: err})     
        }
        res.status(201).json(result)
    })
})


// for nesked docs
app.patch('users/:id/:method', (req,res) =>{
    const userId = req.params.id;
    const method = req.params.method;
    const data = req.body;
     if(method ==="pull"){
        db.collection('users').updateOne({_id: ObjectId(userId)}, {$pull: {orderpost: data}})
        .then((result) =>{
            res.status(201).json(result);
        })
        } else if(method ==="push"){
            db.collection('users').updateOne({_id: ObjectId(userId)}, {$addToSet: {orderpost: data}})
            .then((result) =>{
                res.status(201).json(result);
            })
        }
})

// getting all shoesmenu

app.get('/shoesmenu', (req, res) =>{
    db.collection('shoesmenu').find().toArray((err, result) =>{
        if(err){
            res.status(500).json({err: err})
        }
    
        res.status(200).json(result);
    })
    
})
// get single docs
app.get('shoesmenu/:id', (req, res) =>{
    const useId = req.params.id;
    db.collection('shoesmenu').findOne({_id: ObjectId(useId)})
    .then((result) =>{
        if(err){
            res.status(500).json({err: err})     
        }
        res.status(200).json(result);
    })
})

// post 
app.post('/shoesmenu', (req, res) =>{
    const data = req.body;
    db.collection('shoesmenu').insertOne(data)
    .then((result) =>{
        if(err){
            res.status(500).json({err: err})     
        }
        res.status(201).json(result)
    })
})


