const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

//Create the server
const app = express();

//Connect to DataBase
connectDB();

//App port
const port = process.env.PORT || 4000;

//Able CORS
app.use(cors());

//Able body json values, Body-Parser in express
app.use(express.json());

//App routes
app.use(`/api/index`,require(`./routes/index`));

//Run app
app.listen(port,'0.0.0.0',()=>{
    console.log('Server running in port: '+port);
});