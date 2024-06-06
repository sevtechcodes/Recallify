const mongoose = require('mongoose');

// Define MemorySchema
const MemorySchema = new mongoose.Schema({
	title: {type: String},
	media: [ 
		{
			  file_path: {
			    type: String,
			  },
			  file_mimetype: {
			    type: String,
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



