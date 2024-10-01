const initController = require('./genericController');
const Medicine = require('../models/medicineModel');

const medicineController = initController(Medicine, "Medicine", {}, [], ['owner, media']);

module.exports = medicineController