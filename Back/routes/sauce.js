//routes - sauce
const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

router.post('', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, multer, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('', auth, sauceCtrl.getAllSauces);

module.exports = router;