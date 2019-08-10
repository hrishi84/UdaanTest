const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(morgan('dev'))

const productRoutes = require('./router/api/products')
const orderRoutes = require('./router/api/order')


app.use('/api/products',productRoutes)

app.use('/api/orders', orderRoutes)

mongoose.connect('mongodb+srv://hash:hash123@cluster0-jnvmf.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser : true
});

app.use((req,res, next)=>{
    const error = new Error('Not found')
    error.status = 404;
    next(error)
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        message: error.message
    })
})

const port = process.env.port || 5500;

app.listen(port,() => console.log('server started on port ',port))