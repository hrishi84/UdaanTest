const express = require('express')
const router = express.Router();

router.get('/',(req, res, next)=>{
    res.status(200).json({
        message: 'orders fetched'
    })
})

router.post('/',(req, res, next)=>{
    const order={
        productID: req.body.productID,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'orders created',
        order: order
    })
})

router.get('/:orderId',(req, res, next)=>{
    res.status(200).json({
        message: 'orders fetched',
        orderId : req.params.orderId
    })
})

router.delete('/:orderId',(req, res, next)=>{
    res.status(200).json({
        message: 'orders deleted',
        orderId: req.params.orderId
    })
})


module.exports = router;