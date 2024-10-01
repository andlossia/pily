const express = require('express');
const createCrudRoutes = require('./crudRoutes');
const router = express.Router();

const authRoutes = require('./authRoute');
const mediaController = require('../controllers/mediaController');
const pillBoxController = require('../controllers/pillBoxController');
const medicineController = require('../controllers/medicineController');
const userMedicineController = require('../controllers/UserMedicineController');

router.use('/', authRoutes);
router.use('/media', createCrudRoutes(mediaController));
router.use('/pill-box', createCrudRoutes(pillBoxController));
router.put('/pill-box/:id', pillBoxController.updatePillBox); // Add this line
router.use('/medicine', createCrudRoutes(medicineController));
router.use('/user-medicine', createCrudRoutes(userMedicineController));

module.exports = router;