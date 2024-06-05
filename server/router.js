'use strict';
const express = require('express');
const router = express.Router();
const upload = require('./middleware/multer.js');
const {
  getMemories,
	createMemory,
  updateMemory,
  deleteMemory,
} = require('./controller.js');



router.get('/memories', getMemories);
router.post('/memories',upload.single('file'), createMemory);
router.put('/memories/:id', upload.single('file'), updateMemory);
router.delete('/memories/:id', deleteMemory);

module.exports = router;