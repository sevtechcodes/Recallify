const Memory = require('./models/Memory');

const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find().sort({ date: -1 });
    res.json(memories);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const createMemory = async (req, res) => {
  const { title, media, mediaType, description, child, location, date, category } = req.body;

  try {
    // Create an object with the non-empty fields only
    const memoryData = {};
    if (title) memoryData.title = title;
    if (media) memoryData.media = media;
		if (mediaType) memoryData.mediaType = mediaType;
    if (description) memoryData.description = description;
    if (child) memoryData.child = child;
    if (location) memoryData.location = location;
    if (date) memoryData.date = date;
    if (category) memoryData.category = category;

    // Create the memory only if there is at least one field with non-empty value
    if (Object.keys(memoryData).length === 0) {
      return res.status(400).json({ error: 'No valid fields provided' });
    }

    const memory = new Memory(memoryData);
    await memory.save();
    
    res.status(201).json(memory);
  } catch (error) {
    console.log("Creating Error: ", error);
    res.status(500).json({ error: 'Server error' });
  }
};




const updateMemory = async (req, res) => {
	const { id } = req.params;
  const { title, media, mediaType, description, child, location, date, category } = req.body;
  try {
    const memory = await Memory.findByIdAndUpdate(id, { title,  media, mediaType, description, child, location, date, category }, 
			{ new: true });
    res.json(memory);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteMemory = async (req, res) => {
  try {
    await Memory.findByIdAndDelete(req.params.id);
    res.status(204).send({ message: 'Memory deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getMemories,
	createMemory,
  updateMemory,
  deleteMemory,
};