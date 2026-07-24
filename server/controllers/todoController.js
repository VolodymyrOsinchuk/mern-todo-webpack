// controllers/todoController.js
const Todo = require("../models/Todo");
const asyncHandler = require("../middleware/asyncHandler");

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
exports.getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.status(200).json(todos);
});

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Public
exports.getTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.status(200).json(todo);
});

// @desc    Create new todo
// @route   POST /api/todos
// @access  Public
exports.createTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.create(req.body);
  res.status(201).json(todo);
});

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Public
exports.updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.status(200).json(todo);
});

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Public
exports.deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.status(200).json({ id: req.params.id });
});
