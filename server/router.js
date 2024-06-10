'use strict';
const express = require('express');
const router = express.Router();
// const upload = require('./middleware/multer.js');
const {
  getMemories,
	createMemory,
  updateMemory,
  deleteMemory,
} = require('./controller.js');



router.get('/memories', getMemories);
// router.get('/memories/:id', getmemory); //getting single memory
router.post('/memories', createMemory);
router.put('/memories/:id', updateMemory);
router.delete('/memories/:id', deleteMemory);

//if I use multer
// router.post('/memories',upload.single('file'), createMemory)
// router.post('/memories', upload.array('files', 10), createMemory); // Allow up to 10 files


module.exports = router;