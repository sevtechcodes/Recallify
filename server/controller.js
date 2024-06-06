const Memory = require('./models/Memory');
const File = require('./models/File'); // Adjust the path to your File model

const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find().sort({ date: -1 });
    res.json(memories);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const createMemory = async (req, res) => {
  const { title, media, description, child, location, date, category } = req.body;

  try {
    // Create an object with the non-empty fields only
    const memoryData = {};
    if (title) memoryData.title = title;
    if (media) memoryData.media = media;
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








//for uploading media from my device
const uploadMedia = async (req, res) => {
  try {
    const { title, description, child, location, category } = req.body;
    const files = req.files.map(file => ({
      file_path: file.path,
      file_mimetype: file.mimetype,
    }));
    
    const memory = new Memory({
      title,
      media: files,
      description,
      child,
      location,
      category,
    });
    
    await memory.save();
    res.send('Media uploaded successfully.');
  } catch (error) {
    res.status(400).send('Error while uploading media. Try again later.');
  }
};



const updateMemory = async (req, res) => {
	const { id } = req.params;
  const { title, description, child, location, date, category } = req.body;
  const media = req.file ? `/uploads/${req.file.filename}` : req.body.media;
  try {
    const memory = await Memory.findByIdAndUpdate(id, { title,  media, description, child, location, date, category }, { new: true });
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
	uploadMedia,
};