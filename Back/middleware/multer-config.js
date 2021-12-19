//middleware - multer 

const multer = require('multer');

// file accept
const MIME_TYPES = {         
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
  };

const storage = multer.diskStorage({    
    destination: (req, file, callback) => {
      callback(null, 'images')
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(' ').join('_');  //  modify name of file, delete space and replese by "_".
      const extension = MIME_TYPES[file.mimetype];  
      callback(null, name + Date.now() + '.' + extension);   
    }
  });
  
  module.exports = multer({ storage }).single('image');  // refers to single file and only images