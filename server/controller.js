const Memory = require('./models/index');

const addNewMemory = async (req, res) => {
  const { title,  media, description, child, location, date, category} = req.body;
  try {
    const memory = new Memory({ title,  media, description, child, location, date, category });
    await memory.save();
    res.status(201).json(memory);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find();
    res.json(memories);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateMemory = async (req, res) => {
  const { title,  media, description, child, location, date, category } = req.body;
  try {
    const memory = await Memory.findByIdAndUpdate(req.params.id, { title,  media, description, child, location, date, category }, { new: true });
    res.json(memory);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteMemory = async (req, res) => {
  try {
    await Memory.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getMemories,
	addNewMemory,
  updateMemory,
  deleteMemory,
};