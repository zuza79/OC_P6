const express = require('express');

const app = express();
const mongoose = require('mongoose');

const thing = require('./models/thing');

const userRoutes = require('./routes/user');

mongoose.connect('mongosh "mongodb+srv://zuzana79:seddik67@cluster0.pb8xx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new thing({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Avis enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});
module.exports = app;