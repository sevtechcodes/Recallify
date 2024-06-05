const Memory = require('./models/index');

const createMemory = async (req, res) => {
  const { title, description, child, location, date, category} = req.body;
	const media = req.file ? `/uploads/${req.file.filename}` : req.body.media;
  try {
    const memory = new Memory({ title, media, description, child, location, date, category });
    await memory.save();
    res.status(201).json(memory);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find().sort({ date: -1 });
    res.json(memories);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
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
};