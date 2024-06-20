const express = require('express');
const app = express();
const mongoose = require('mongoose');

// configuration of  dov env 
require('dotenv/config');
// calling the endpoint that i declare in the .env file
const api = process.env.API_URL;


// middleware  && logging our the http request
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const morgan = require('morgan');
app.use(morgan('tiny'));

const Product = require('./models/product');

// routers
const productsRouter = require('./routes/products');
app.use(`${api}/products`, productsRouter);
const categoryRouter = require('./routes/categories');
app.use(`${api}/categories`, categoryRouter);



mongoose.connect("mongodb://localhost:27017/eshop").then(() => {
    console.log('Database connection is ready ....');
}).catch((error) => {
    console.log(error);
})
app.listen(3000, () => {
    console.log(api);
    console.log('server listening on port http://localhost:3000');
})