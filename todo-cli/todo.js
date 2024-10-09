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
      title: "Another Test todo",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA")
    });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should retrieve overdue items", () => {
    add({
      title: "Overdue todo",
      completed: false,
      dueDate: new Date(Date.now() - 86400000).toLocaleDateString("en-CA") // Yesterday's date
    });
    const overdueItems = overdue();
    expect(overdueItems.length).toBe(1); // Expecting one overdue item
    expect(overdueItems[0].title).toBe("Overdue todo");
  });

  test("Should retrieve due today items", () => {
    const todayItems = dueToday();
    expect(todayItems.length).toBeGreaterThan(0); // At least one item is due today
    expect(todayItems[0].dueDate).toBe(new Date().toLocaleDateString("en-CA"));
  });

  test("Should retrieve due later items", () => {
    add({
      title: "Future todo",
      completed: false,
      dueDate: new Date(Date.now() + 86400000).toLocaleDateString("en-CA") // Tomorrow's date
    });
    const dueLaterItems = dueLater();
    expect(dueLaterItems.length).toBe(1); // Expecting one item due later
    expect(dueLaterItems[0].title).toBe("Future todo");
  });
});
