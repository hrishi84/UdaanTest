const express = require('express')
const router = express.Router();
const Product = require('./models/product')
const Mongoose = require('mongoose')


router.get('/', (req,res,next)=>{

    Product.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
    
})

router.post('/', (req,res,next)=>{
    const product = new Product({
        _id : new Mongoose.Types.ObjectId(),
        name : req.body.name,
        price: req.body.price
    })
    product.save().then(res =>{
        console.log("cvdvvvdf",res)
    })
    .catch(err =>console.log(err)) 

    res.status(201).json({
        message: 'handling Post requets',
        createdProduct: product
    })
})

router.get('/:productId', (req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc =>{
            console.log("from db",doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({err})
        })
    
})

router.patch('/:productId', (req,res,next)=>{
    const id = req.params.productId;
    const updateOps ={}
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id : id}, { $set: updateOps})
        .exec()
        .then(result =>{
            console.log(result)
            res.status(200).json(result);
        })
        .catch(err =>{
            console.log(err)
            res.status(500).json({
                error: err
            })
        })

    
})

router.delete('/:productId', (req,res,next)=>{
    const id = req.params.productsId;
   Product.remove({_id : id})
    .exec()
    .then(result =>{
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })
    })

})

module.exports = router;