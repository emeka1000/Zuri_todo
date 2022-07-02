const Todo = require("../models/Todo");
const asyncHandler = require("express-async-handler");

createTodo = asyncHandler(async(req, res) => {
    const { title, description } = req.body;
    const noteChecker = await Todo.findOne({ title });

    if (!noteChecker) {
        const newTodo = new Todo({
            title: title,
            description: description,
        });
        newTodo.save();
        res.status(200).json(newTodo);
    } else {
        res.status(400);
        throw new Error("Note already exists");
    }
});

readTodo = asyncHandler(async(req, res) => {
    const selectedTodo = await Todo.findById(req.params.id);

    if (selectedTodo) {
        res.status(200).json(selectedTodo);
    } else {
        res.status(400).json("Todo doesnt exist");
    }
});

updateTodo = asyncHandler(async(req, res) => {
    const { title, description } = req.body;
    const selectedTodo = await Todo.findById(req.params.id);

    if (selectedTodo && title) {
        selectedTodo.title = title;
        selectedTodo.save();
        res.status(200).json(selectedTodo);
    } else if (selectedTodo && description) {
        selectedTodo.description = description;
        selectedTodo.save();
        res.status(200).json(selectedTodo);
    } else if (!title || !description) {
        res.status(200).json("No changes made");
    }
});

deleteTodo = asyncHandler(async(req, res) => {
    const selectedTodo = await Todo.findById(req.params.id);

    if (selectedTodo) {
        selectedTodo.delete();
        res.status(200).json("Todo deleted");
    } else {
        res.status(400).json("Todo doesnt exist");
    }
});

module.exports = { createTodo, readTodo, updateTodo, deleteTodo };