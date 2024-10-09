const todoList = require('../todo');
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList(); // Assuming these methods exist

describe("TodoList Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA")
    });
  });

  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA")
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

});
