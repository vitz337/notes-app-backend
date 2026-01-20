// import dependencies, router, controller, middleware
const express = require('express');
const router = express.Router();
const protect = require('../middleware/protect');
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/noteController');

//GET all notes
router.get('/', protect, getNotes);

//POST create note
router.post('/', protect, createNote);

//PUT update note
router.put('/:id', protect, updateNote);

//DELETE note
router.delete('/:id', protect, deleteNote);

//exports
module.exports = router;