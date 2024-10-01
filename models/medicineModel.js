const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const applyToJSON = require('../middlewares/applyToJson');

const medicineSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  
  description: String,
  dosage: String,
  frequency: String,
  sideEffects: [String],
  quantityInBox: {
    type: Number,
    required: true,
  },
  media: { type: Schema.Types.ObjectId, ref: 'Media' },
}, { timestamps: true });

  
  const Medicine = mongoose.model('Medicine', medicineSchema);
  
  applyToJSON(medicineSchema);
  
  module.exports = Medicine;