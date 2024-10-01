const initController = require('./genericController');
const PillBox = require('../models/pillBoxModel');
const mongoose = require('mongoose'); // Import mongoose for ObjectId validation
const { authenticate, authorizeOwnerOrRole } = require('../middlewares/authenticationMiddleware');

const pillBoxController = initController(PillBox, "PillBox", {
  updatePillBox: [
    authenticate,
    authorizeOwnerOrRole(PillBox, "PillBox"), // Pass the correct model and name for authorization
    async (req, res) => {
      try {
        const pillBoxId = req.params.id; // Assuming the ID is passed as a URL parameter

        // Validate that the ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(pillBoxId)) {
          return res.status(400).json({ message: 'Invalid ID format' });
        }

        const updatedData = req.body; // Ensure this contains the updated weeks data

        const updatedPillBox = await PillBox.findByIdAndUpdate(
          pillBoxId,
          { weeks: updatedData.weeks }, // Update only the weeks field
          { new: true } // Return the updated document
        );

        if (!updatedPillBox) {
          return res.status(404).json({ message: 'Pill box not found' });
        }

        res.status(200).json({ message: 'Pill box updated successfully', updatedPillBox });
      } catch (error) {
        console.error('Error updating pill box:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  ]
}, []);

module.exports = pillBoxController;
