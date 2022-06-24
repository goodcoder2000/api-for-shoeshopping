const express = require('express');
const router = express.Router();
const mongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");

let db;

mongoClient.connect("mongodb+srv://goodcoder2000:1082018mgmg@testing1.i6f65.mongodb.net/?retryWrites=true&w=majority", (err, client) =>{
    if(err) throw err

    db = client.db("shoeshop");
})

router.get('/', (req, res) =>{
    db.collection('users').find().toArray((err, result) =>{
        if(err){
            res.status(500).json({err: err})
        }
    
        res.status(200).json(result);
    })
    
})
// get single docs
router.get('/:id', (req, res) =>{
    const useId = req.params.id;
    db.collection('users').findOne({_id: ObjectId(useId)})
    .then((result) =>{
        res.status(200).json(result);
    })
})

// post 
router.post('/', (req, res) =>{
    const data = req.body;
    db.collection('users').insertOne(data)
    .then((result) =>{
        res.status(201).json(result)
    })
})


// for nesked docs
router.patch('/:id/:method', (req,res) =>{
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

module.exports = router;