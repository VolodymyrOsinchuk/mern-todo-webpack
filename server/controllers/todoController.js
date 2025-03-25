const Todo = require('../models/Todo')

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 })
    res.status(200).json(todos)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc    Get single todo
// @route   GET /api/todos/:id
// @access  Public
exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    res.status(200).json(todo)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc    Create new todo
// @route   POST /api/todos
// @access  Public
exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body)
    res.status(201).json(todo)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Update todo
// @route   PUT /api/todos/:id
// @access  Public
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    res.status(200).json(todo)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Delete todo
// @route   DELETE /api/todos/:id
// @access  Public
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id)

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    res.status(200).json({ id: req.params.id })
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}
