const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const applyToJSON = require('../middlewares/applyToJson');

// Define the schema for each day
const daySchema = new Schema({
  day: { 
    type: String, 
    enum: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'], 
    required: true 
  },
  time: {
    morning: [
      { type: Schema.Types.ObjectId, ref: 'Medicine', required: true }
    ],
    afternoon: [
      { type: Schema.Types.ObjectId, ref: 'Medicine', required: true }
    ],
    evening: [
      { type: Schema.Types.ObjectId, ref: 'Medicine', required: true }
    ],
  },
  __v: { type: Number, select: false },

});

const weekSchema = new Schema({
  weekNumber: { type: Number, required: true }, 
  days: [daySchema],
  __v: { type: Number, select: false },
});

const pillBoxSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  weeks: [weekSchema],
}, { timestamps: true });

applyToJSON(pillBoxSchema);

pillBoxSchema.index({ user: 1 });
pillBoxSchema.pre('save', function (next) {
  next();
});

const PillBox = mongoose.model('PillBox', pillBoxSchema);
module.exports = PillBox;
