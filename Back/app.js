//app

//import the Express package
const express = require('express');

// Creating the API
const app = express();

//import route user and sauce
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');

//connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongosh "mongodb+srv://zuzana79:seddik67@cluster0.pb8xx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

app.use('/api/auth', userRoutes);
app.use('/api/sauce', sauceRoutes);

module.exports = app;