let tasks = [];

function getAllTasks() {
  return tasks;
}

function getTaskById(id) {
  return tasks.find(task => task.id === id);
}

function addTask(task) {
  tasks.push(task);
}

function updateTask(id, updatedFields) {
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) return false;
  tasks[index] = { ...tasks[index], ...updatedFields };
  return true;
}

function deleteTask(id) {
  const initialLength = tasks.length;
  tasks = tasks.filter(task => task.id !== id);
  return tasks.length < initialLength;
}

function getSummary() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed);
  const avgPriority = pendingTasks.length === 0 ? 0 :
    pendingTasks.reduce((sum, t) => sum + t.priority, 0) / pendingTasks.length;

  return {
    total,
    completed,
    averagePriority: avgPriority
  };
}

module.exports = {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
  getSummary
};
