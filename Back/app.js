//app.js
const express = require('express');    
const bodyParser = require('body-parser');  
const mongoose = require('mongoose'); 
const path = require('path');  

//security - OWASP
const helmet = require("helmet"); //anti add to header
const dotenv = require ('dotenv');
const resul = dotenv.config();
 

//import routes
const routesSauce = require('./routes/sauce');   
const routesUsers = require('./routes/users');   

// connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGO_LOGIN}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// creating API
const app = express(); 

//access to API
app.use((req, res, next) => {    
    res.setHeader('Access-Control-Allow-Origin', '*');   
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');  
    next();
  });

//security helmet
app.use(helmet());  

//transform JSON 
app.use(bodyParser.json()) 

//path images
app.use('/images', express.static(path.join(__dirname, 'images')));  

// request routes to API
app.use('/api/sauces', routesSauce);   
app.use('/api/auth', routesUsers); 

module.exports = app 