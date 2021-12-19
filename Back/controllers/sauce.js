/*controllers - creation new sauce, display, modify and delete 
make LIKE/DISLIKE*/

////////// SAUCE
const Sauce = require('../models/sauce');
const fs = require('fs');  // fs = file system 

// Middleware display one sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

// Middleware display of all sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

//Create new sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`   // creation du nouvel URL (cote server) de l'image qui a ete cree par le middleware "multer-config.js" 
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};

//Modify sauce 
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?     // Test if file exist in requete 
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  // Si il y a une image, On recré un nouvel URL (cote server) de l'image qui a ete cree par le middleware "multer-config.js"

    } : { ...req.body };             // if NOT file image, le put requete modify/update the post. 
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

//Delete sauce 
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })   
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];  
      fs.unlink(`images/${filename}`, () => {                
        Sauce.deleteOne({ _id: req.params.id })              // Delete sauce in database
          .then(() => res.status(200).json({ message: ' Sauce supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

/////////// LIKE/DISLIKE
//LIKE sauce 
exports.likeSauce = (req, res, next) => {
  switch (req.body.like) {
    case 0:    // default = 0  
      Sauce.findOne({ _id: req.params.id })    // find sauce by _id.
        .then((sauce) => {
          //LIKE
          if (sauce.usersLiked.find(user => user === req.body.userId)) {   
            Sauce.updateOne({ _id: req.params.id }, {
              $inc: { likes: -1 },           
              $pull: { usersLiked: req.body.userId },     // if user LIKE, the body make update and user can't make another LIKE 
              _id: req.params.id
            })
              .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte! Merci.' }); })
              .catch((error) => { res.status(400).json({ error: error }); });
            //DISLIKE
          } if (sauce.usersDisliked.find(user => user === req.body.userId)) {      
            Sauce.updateOne({ _id: req.params.id }, {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },      
              _id: req.params.id
            })
              .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte! Merci.' }); })
              .catch((error) => { res.status(400).json({ error: error }); }); 
          }
        })
        .catch((error) => { res.status(404).json({ error: error }); });
      break;

      //update LIKE
    case 1:
      Sauce.updateOne({ _id: req.params.id }, {
        $inc: { likes: 1 },
        $push: { usersLiked: req.body.userId },
        _id: req.params.id
      })
        .then(() => { res.status(201).json({ message: 'Ton like a été pris en compte! Merci.' }); })
        .catch((error) => { res.status(400).json({ error: error }); });
      break;

      // update DISLIKE
    case -1:
      Sauce.updateOne({ _id: req.params.id }, {
        $inc: { dislikes: +1 },
        $push: { usersDisliked: req.body.userId },
        _id: req.params.id
      })
        .then(() => { res.status(201).json({ message: 'Ton dislike a été pris en compte!' }); })
        .catch((error) => { res.status(400).json({ error: error }); });
      break;
      default:
  }
};