'use strict';
const express = require('express');
const router = express.Router();
const upload = require('./middleware/multer.js');
const {
  getMemories,
	createMemory,
  updateMemory,
  deleteMemory,
	uploadMedia,
} = require('./controller.js');



router.get('/memories', getMemories);
router.post('/memories',upload.single('file'), createMemory);
// router.post('/memories', upload.array('files', 10), createMemory); // Allow up to 10 files
router.put('/memories/:id', upload.single('file'), updateMemory);
router.delete('/memories/:id', deleteMemory);
router.post('/memories/uploads', upload.single('file'), uploadMedia), 


module.exports = router;