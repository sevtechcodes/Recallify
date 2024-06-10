const mongoose = require('mongoose');

// Define MemorySchema
const MemorySchema = new mongoose.Schema({
	title: String,
	media: String,
	mediaType:String,
	description:String,
	child: String,
	location: String,
	date:String,
	category: String,
});

const Memory = mongoose.model('Memory', MemorySchema);

module.exports = Memory;



