const todoList = require('../todo');

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList(); // Include all relevant methods

describe("Todolist Test Suite", () => {
  // Add a task before all tests are run
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10), // Today's date in YYYY-MM-DD format
    });
  });

  // Test case: Adding a new todo
  test("Should add new todo", () => {
    const todoItemsCount = all.length;
    add({
      title: "New Test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10), // Today's date
    });
    expect(all.length).toBe(todoItemsCount + 1); // Check if a new todo has been added
  });

  // Test case: Marking a todo as completed
  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false); // Initial state should be incomplete
    markAsComplete(0); // Mark the first todo as complete
    expect(all[0].completed).toBe(true); // Verify it's now marked as complete
  });

  // Test case: Retrieving overdue todos
  test("Should retrieve overdue todos", () => {
    add({
      title: "Overdue todo",
      completed: false,
      dueDate: new Date(Date.now() - 86400000).toISOString().slice(0, 10), // Yesterday's date
    });
    const overdueTodos = overdue();
    expect(overdueTodos.length).toBe(1); // Should find 1 overdue item
    expect(overdueTodos[0].title).toBe("Overdue todo"); // The title should match the overdue item
  });

  // Test case: Retrieving due today todos
  test("Should retrieve due today todos", () => {
    const todayTodos = dueToday();
    expect(todayTodos.length).toBeGreaterThan(0); // Should find at least one todo due today
    expect(todayTodos[0].dueDate).toBe(new Date().toISOString().slice(0, 10)); // Verify the due date matches today
  });

  // Test case: Retrieving due later todos
  test("Should retrieve due later todos", () => {
    add({
      title: "Due later todo",
      completed: false,
      dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10), // Tomorrow's date
    });
    const laterTodos = dueLater();
    expect(laterTodos.length).toBe(1); // Should find 1 due later item
    expect(laterTodos[0].title).toBe("Due later todo"); // The title should match the due later item
  });
});
