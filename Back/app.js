//app

//import the express package
const express = require('express');

// Creating the API
const app = express();

//import route user and sauce
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

const bodyParser = require('body-parser'); 
const path = require('path');
//connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongosh "mongodb+srv://zuzana79:seddik67@cluster0.pb8xx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  app.use((req, res, next) => {    //middleware to use API
    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');  //Autorise special headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
    next();
  })

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

app.use('/api/auth', userRoutes);
app.use('/api/sauce', sauceRoutes);

app.use('/images', express.static(path.join(__dirname, 'images'))); 
app.use(bodyParser.json());


 

module.exports = app;