const initController = require('./genericController');
const Media = require('../models/mediaModel');

const mediaController = initController(Media, "Media", {}, [], ['']);

module.exports = mediaController;
