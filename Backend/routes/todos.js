// routes/todos.js
const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({ message: 'Error fetching todos' });
    }
});

// Create a new todo
router.post('/', async (req, res) => {
    const { title, description } = req.body; // Ensure you are using title and description

    try {
        const newTodo = new Todo({
            title,
            description,
            completed: false,
        });
        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ message: 'Error creating todo' });
    }
});

// Update a todo
router.put('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        todo.completed = !todo.completed; // Toggle completion
        await todo.save();
        res.json(todo);
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({ message: 'Error updating todo' });
    }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully', deletedTodo });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({ message: 'Error deleting todo' });
    }
});

module.exports = router;
