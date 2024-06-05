const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({
	title: {type: String},
	media: {type: String},
	description: {type: String},
	child: {type: String},
	location: {type: String},
	date: { type: Date},
	category: {type: String},
});

const Memory = mongoose.model('Memory', MemorySchema);

module.exports = Memory;
