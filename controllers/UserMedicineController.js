const initController = require('./genericController');
const UserMedicine = require('../models/UserMedicineModel');

const userMedicineController = initController(UserMedicine, "UserMedicine", {}, [], ['user', 'medicine']);

module.exports = userMedicineController