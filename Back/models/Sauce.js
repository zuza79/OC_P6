//models - sauce
const mongoose = require('mongoose');
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true},
  name: {type: String, required: true, validate: {
        validator: function(value){
          return /^([a-zA-Z0-9\s,()]{5,30})$/.test(value);
        },
        message: "Utiliser que des lettres et des chiffres (entre 5 et 30 caractères)."
    }},
  manufacturer: { type: String,required: true, validate: {
        validator: function(value){
          return /^([a-zA-Z0-9\s,()]{5,50})$/.test(value);
        },
        message: "Utiliser que des lettres et des chiffres (entre 5 et 50 caractères)."
    }},
  description: {type: String, required: true, validate: {
        validator: function(value){
          return /^([a-zA-Z0-9\s,()]{15,100})$/.test(value);
        },
        message: "Utiliser que des lettres et des chiffres (entre 15 et 100 caractères)."
    }},
  mainPepper: { type: String, required: true, validate: {
        validator: function(value){
          return /^([a-zA-Z0-9\s,()]{5,30})$/.test(value);
        },
        message: "Utiliser que des lettres et des chiffres (entre 5 et 30 caractères)."
    }},
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: [String], required: false },
  usersDisliked: { type: [String], required: false },
});

module.exports = mongoose.model('sauce', sauceSchema);