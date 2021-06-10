const express = require('express'),
    router = express.Router(),
    auth = require('../../middleware/auth'),
    Todo = require('../../models/Todo'),
    User = require('../../models/User');

// @route GET /api/todos
// @desc Display all todos
// @access public
router.get('/:id', async (req, res) => {
    try{
        const foundTodos = await Todo.find({'author.id': req.params.id}).sort({date: -1});
        res.json(foundTodos);
    } catch(err) {
        console.log(err);
    }
});

// @route POST /api/todos
// @desc Create new Todo
// @access Private
router.post('/', auth, async (req, res) => {
    try{
        console.log(req.body.author);
        const newTodo = new Todo({
            todo: req.body.todo,
            author: req.body.author
        });
        const saveTodo = await newTodo.save();
        res.json(saveTodo);
    } catch(err) {
        console.log(err);
    }
});

// @route PUT /api/todos/:id
// @desc Edit a Todo
// @access Private
router.put('/:id', auth, async (req, res) => {
    try{
        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json({success: true, payload: updatedTodo});
    } catch(err) {
        res.status(404).json({success: false});
        console.log(err);
    }
});

// @route DELETE /api/todos/:id
// @desc Delete a Todo
// @access Private
router.delete('/:id', auth, async (req, res) => {
    try{
        const foundItem = await Todo.findById(req.params.id);
        const deletedItem = await foundItem.remove();
        res.json({success: true, payload: deletedItem});
    } catch(err) {
        res.status(404).json({success: false});
        console.log(err);
    }
});

module.exports = router;