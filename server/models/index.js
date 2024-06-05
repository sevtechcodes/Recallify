const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({
	title: {type: String},
	media: {type: String}, // URL for photos/videos/voice, text for text entries
	description: {type: String}, //text
	child: {type: String},
	location: {type: String},
	date: { type: Date, default: Date.now },
	category: {type: String},
});

const Memory = mongoose.model('Memory', MemorySchema);

module.exports = Memory;
