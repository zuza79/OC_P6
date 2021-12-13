const express = require('express');

const app = express();
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const stuffRoutes = require('./routes/stuff');

mongoose.connect('mongosh "mongodb+srv://zuzana79:seddik67@cluster0.pb8xx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

app.use('/api/auth', userRoutes);
app.use('/api/stuff', stuffRoutes);

module.exports = app;