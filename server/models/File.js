const mongoose = require('mongoose');

// Define FileSchema for individual files
const FileSchema = new mongoose.Schema({
  file_path: {
    type: String,
    required: true,
  },
  file_mimetype: {
    type: String,
    required: true,
  },
});

const File = mongoose.model('File', FileSchema);

module.exports = File;
