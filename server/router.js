'use strict';
const express = require('express');
const {
  getMemories,
	addNewMemory,
  updateMemory,
  deleteMemory,
} = require('./controller.js');

const router = express.Router();
router.get('/memories', getMemories);
router.post('/memories', addNewMemory);
router.put('/memories/:id', updateMemory);
router.delete('/memories/:id', deleteMemory);

module.exports = router;