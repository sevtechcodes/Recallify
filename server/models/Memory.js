const mongoose = require('mongoose');

// Define MemorySchema
const MemorySchema = new mongoose.Schema({
	title: {type: String},
	media: {type: String
	},
	mediaType:{ type: String},

	description: {type: String},
	child: {type: String},
	location: {type: String},
	date: { type: String},
	category: {type: String},
});

const Memory = mongoose.model('Memory', MemorySchema);

module.exports = Memory;



