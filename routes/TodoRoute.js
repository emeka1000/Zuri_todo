const express = require("express");
const {
    createTodo,
    readTodo,
    updateTodo,
    deleteTodo,
} = require("../controllers/TodoController");
const router = express.Router();

router.route("/create").post(createTodo);
router.route("/read/:id").post(readTodo);
router.route("/update/:id").post(updateTodo);
router.route("/delete/:id").post(deleteTodo);

module.exports = router;