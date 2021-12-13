//controllers - creation new sauce, display, modify and delete

const Sauce = require('../models/Sauce');
const fs = require('fs');  // fs = file system : give access to systems for different operation in files

//creation new sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    // creation new URL creation (server) image created by middleware "multer-config.js" 
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`   
  });
  sauce.save().then(() => {res.status(201).json({message: 'Objet enregistré!'});
    })
    .catch((error) => {res.status(400).json({error: error});
    }
  );
};

// Middleware display one sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then((sauce) => {res.status(200).json(sauce);
    })
  .catch((error) => {res.status(404).json({error: error});
    }
  );
};

// Middleware display all sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

//Modify one sauce 
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?     // Test - verification to find out if a file exists in the requete 
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`  // if there is one image, creation new URL creation (server) image created by middleware "multer-config.js"

    } : { ...req.body };             // if there is NOT image, put requete modify/update the post. 
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};

//delete one sauce 
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })   // find sauce by '_id' the same in requete.
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];  // split will find second element in URL (after image), name
      fs.unlink(`images/${filename}`, () => {                // 'unlink' will delete image the same filename returned
        Sauce.deleteOne({ _id: req.params.id })              
          .then(() => res.status(200).json({ message: 'Objet supprimé !' })) //'then' delete object in database 
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};