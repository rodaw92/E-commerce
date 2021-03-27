/* npm istall express-- use it as server 
node backend/server.js doesn't work because of compatibility issue 
so we install --  npm install @babel/cli @babel/core @babel/node @babel/preset-env nodemon --save-dev 
nodemon helps to start or stop the server whenever we have changed our code, automatically stop it and re-run it again*/

import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import bodyParser from 'body-parser';
import productRoute from './routes/productRoute';
import uploadRoute from './routes/uploadRoute';



dotenv.config();
const mongodbUrl =config.MONGODB_URL;
// connect to mongodb .. next three lines
mongoose.connect(mongodbUrl,{
    useNewUrlParser:true, // because i don't need any worrning in my console
    useUnifiedTopology: true,
    useCreateIndex:true
}).catch(error=> console.log(error.reason));

const app = express ();
app.use(bodyParser.json());
app.use('/api/uploads', uploadRoute);
app.use('/api/products/', productRoute);
app.use('/api/users', userRoute);

/*app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x=>x._id === productId);
    if(product)
       res.send(product);
       else
       res.status(404).send({msg: "Product Not Found."})
});

app.get("/api/products", (req, res) => {
    res.send(data.products);
});*/

app.listen (5000,() => console.log("server started at http://localhost:5000")); /* express js will start running and the first parameter for app.listen method is port number */