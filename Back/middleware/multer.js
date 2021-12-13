//multer
const multer = require('multer');

//mine types accept
const MIME_TYPES = {       
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };

//local storage image - modification name file, creation mine type and expected output
const storage = multer.diskStorage({    
    destination: (req, file, callback) => {
      callback(null, 'images')
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');  
      const extension = MIME_TYPES[file.mimetype];  
      callback(null, name + Date.now() + '.' + extension); 
    }
  });
  
  // refers to single file and only images
  module.exports = multer({ storage }).single('image');  