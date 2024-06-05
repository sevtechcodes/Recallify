const mongoose = require('mongoose');

// Define MemorySchema
const MemorySchema = new mongoose.Schema({
	title: {type: String, required: true},
	media: [ 
		{
			  file_path: {
			    type: String,
			    required: true,
			  },
			  file_mimetype: {
			    type: String,
			    required: true,
			  },
			}
	], // for photos/videos/voice, text for text entries
	description: {type: String},
	child: {type: String},
	location: {type: String},
	date: { type: Date, default: Date.now },
	category: {type: String},
});

const Memory = mongoose.model('Memory', MemorySchema);

module.exports = Memory;



