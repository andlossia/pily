const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const applyToJSON = require('../middlewares/applyToJson');


const userMedicineSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    medicineId: {
      type: Schema.Types.ObjectId,
      ref: 'Medicine', 
      required: true,
    },
    startDate: {
      type: Date,
      required: false,
    },
    endDate: {
      type: Date,
      required: false,
    },
    expiryDate: {
        type: Date,
        required: true,
      },
    remainingQuantity: {
      type: Number,
      required: true,
    },
    nextBoxRenewal: {
      type: Date,
      required: false,
    },
    prescriptionRenewal: {
      type: Date,
      required: false,
    }
  }, { timestamps: true });
  
  const UserMedicine = mongoose.model('UserMedicine', userMedicineSchema);
  
  applyToJSON(userMedicineSchema);
  module.exports = UserMedicine;
  