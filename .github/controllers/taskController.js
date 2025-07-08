const taskModel = require('../models/taskModel');

exports.getAllTasks = (req, res) => {
  res.json(taskModel.getAllTasks());
};

exports.createTask = (req, res) => {
  const { id, title, description, completed, priority } = req.body;

  if (!id || !title || typeof completed !== 'boolean' || typeof priority !== 'number') {
    return res.status(400).json({ error: 'Datos inválidos o incompletos.' });
  }

  if (priority < 1 || priority > 5) {
    return res.status(400).json({ error: 'Priority debe estar entre 1 y 5.' });
  }

  if (taskModel.getTaskById(id)) {
    return res.status(400).json({ error: 'Ya existe una tarea con ese ID.' });
  }

  const newTask = { id, title, description, completed, priority };
  taskModel.addTask(newTask);
  res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Campo "completed" inválido.' });
  }

  const updated = taskModel.updateTask(id, { completed });
  if (!updated) {
    return res.status(404).json({ error: 'Tarea no encontrada.' });
  }

  const updatedTask = taskModel.getTaskById(id);
  res.json(updatedTask);
};


exports.deleteTask = (req, res) => {
  const { id } = req.params;

  const success = taskModel.deleteTask(id);
  if (!success) {
    return res.status(404).json({ error: 'Tarea no encontrada.' });
  }

  res.json({ message: 'Tarea eliminada con éxito.' });
};

exports.getSummary = (req, res) => {
  const summary = taskModel.getSummary();
  res.json(summary);
};
 

