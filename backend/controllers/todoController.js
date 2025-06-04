
const Todo = require('../models/Todo');

exports.getTodos = async (req, res) =>{
  const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(todos);
}

exports.createTodo = async (req, res) => {
  const { title } = req.body;
  const todo = await Todo.create({ title, user: req.user._id });
  res.status(201).json(todo);
}

exports.updateTodo = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate({ _id: req.params.id, user: req.user._id}, req.body, { new: true });
  res.status(200).json(todo);
}

exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete({_id: req.params.id, user: req.user._id });
  res.status(200).json({ message: 'Todo deleted' });
}