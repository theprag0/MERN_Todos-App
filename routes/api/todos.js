const express = require('express'),
    router = express.Router(),
    Todo = require('../../models/Todo');

// @route GET /api/todos
// @desc Display all todos
// @access public
router.get('/', async (req, res) => {
    try{
        const foundTodos = await Todo.find().sort({date: -1});
        res.json(foundTodos);
    } catch(err) {
        console.log(err);
    }
});

// @route POST /api/todos
// @desc Create new Todo
// @access public
router.post('/', async (req, res) => {
    try{
        const newTodo = new Todo({
            todo: req.body.todo
        });
        const saveTodo = await newTodo.save();
        res.json(saveTodo);
    } catch(err) {
        console.log(err);
    }
});

// @route PUT /api/todos/:id
// @desc Edit a Todo
// @access public
router.put('/:id', async (req, res) => {
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
// @access public
router.delete('/:id', async (req, res) => {
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