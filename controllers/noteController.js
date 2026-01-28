// import dependencies, Note model
const Note = require('../models/Note');

//GET all notes
exports.getNotes = async (req, res) => {
    //try to find notes
    try {
        const notes = await Note.find({ user: req.user.id });
        res.status(200).json({ notes });
    } catch(err) {
        res.status(500).json({ message: 'Error fetching notes.' });
    }
};

//POST create note
exports.createNote = async (req, res) => {
    //grabbing title, content from front end
    const { title, content } = req.body;
    if(!title || !content) return res.status(400).json({ message: 'Fields cannot be empty.' });

    //try to create note
    try {
        const note = await Note.create({ title, content, user: req.user.id });
        res.status(200).json({ note });
    } catch(err) {
        res.status(500).json({ message: 'Error creating note.' });
    }
};

//PUT update note
exports.updateNote = async (req, res) => {
    //grabbing title, content from front end
    const { title, content } = req.body;
    if(!title || !content) return res.status(400).json({ message: 'Fields cannot be empty.' });

    //try to find the note
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({ message: 'No notes found.' });

        //ensure note belong to user
        if(note.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized.' });

        //change updated fields
        note.title = title || note.title;
        note.content = content || note.content;

        //save changes
        const updatedNote = await note.save();
        res.status(200).json(updatedNote);
    } catch(err) {
        res.status(500).json({ message: 'Error updating note.' });
    }
};

//DELETE note
exports.deleteNote = async (req, res) => {
    //try to find the note by id
    try {
        const note = await Note.findById(req.params.id);
        if(!note) return res.status(404).json({ message: 'No notes found.' });

        //ensure note belong to user
        if(note.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized.' });

        //remove note
        await Note.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch(err) {
        res.status(500).json({ message: 'Error deleting note.' });
    }
};
