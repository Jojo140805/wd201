// todo.js
function createTodo({ title, dueDate, completed }) {
  return { title, dueDate, completed };
}

function markAsCompleted(todo) {
  todo.completed = true;
}

function overdue(todoList) {
  const today = new Date();
  return todoList.filter(todo => todo.dueDate < today && !todo.completed);
}

function dueToday(todoList) {
  const today = new Date().toDateString();
  return todoList.filter(todo => todo.dueDate.toDateString() === today);
}

function dueLater(todoList) {
  const today = new Date();
  return todoList.filter(todo => todo.dueDate > today);
}

function toDisplayableList(todoList) {
  const today = new Date().toISOString().split("T")[0];
  return todoList
    .map(todo => {
      const status = todo.completed ? "[x]" : "[ ]";
      const displayDate = todo.dueDate.toISOString().split("T")[0] === today ? "" : todo.dueDate.toISOString().split("T")[0];
      return `${status} ${todo.title} ${displayDate}`.trim();
    })
    .join("\n");
}

module.exports = { createTodo, markAsCompleted, overdue, dueToday, dueLater, toDisplayableList };
