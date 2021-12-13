//creation security, user, password and hash information
// security
const bcrypt = require ('bcrypt');
const User = require ('../models/User'); //creation token and verification
const jwt = require('jsonwebtoken');
const hash = require('hash.js');

const passwordValidator = require('password-validator');

const shemaPassValid = new passwordValidator();
shemaPassValid
.is().min(8)
.is().max(30)
.has().uppercase()
.has().lowercase()
.has().digits(1)
.has().not().spaces()
.is().not().oneOf(['Passw0rd', 'Password123']);

// singup and login of users 

// singup
exports.signup = (req, res, next) => {

  const regexEmail = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;   // validation of email format

  if (!regexEmail.test(req.body.email)) {    
      res.status(401).json({ error: "Rentrez un mail valide" })
      return false
  }  

  const emailHash = hash.sha256().update(req.body.email).digest('hex');   // If email is OK, it is updated and digested to be HEX encoded.

  if (!shemaPassValid.validate(req.body.password)) {
      res.status(401).json({message:"L'email exist déjà ET / OU Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre pour un minimum de 8 caractères"});

  } else {
    bcrypt.hash(req.body.password, 10)  //hash password 10x
    .then(hash => {
        const user = new User(
        {    
            email: emailHash,
            password: hash
        });

 //save USER
    user.save()   
        .then(() => res.status(201).json({ message: 'Nouveau utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
    }
    };
  

  // login
  exports.login = (req, res, next) => {
    console.log('Connecté en tant que : ' + req.body.email);
    const emailHash = hash.sha256().update(req.body.email).digest('hex');
    User.findOne({ email: emailHash}) //find user in database by email

        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !'});
            }

            bcrypt.compare(req.body.password, user.password)  // compare password with password hash in database
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !'});
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(  
                      
                      { userId: user._id },   // UserId creation token
                        'RANDOM_TOKEN_SECRET',   // Creation token with second argument - key secret
                        { expiresIn: '24h'}   
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};