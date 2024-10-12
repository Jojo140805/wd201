const { createTodo, markAsCompleted, overdue, dueToday, dueLater, toDisplayableList } = require("../todo");

describe("Todo Tests", () => {
  test("should create a new todo", () => {
    const todoList = [];
    const newTodo = createTodo({ title: "Test Todo", dueDate: new Date(), completed: false });
    todoList.push(newTodo);
    expect(todoList.length).toBe(1);
    expect(todoList[0].title).toBe("Test Todo");
    expect(todoList[0].completed).toBe(false);
  });

  test("should mark a todo as completed", () => {
    const todoList = [{ title: "Incomplete Todo", completed: false }];
    markAsCompleted(todoList[0]);
    expect(todoList[0].completed).toBe(true);
  });

  test("should retrieve overdue items", () => {
    const today = new Date();
    const todoList = [
      { title: "Overdue Todo", dueDate: new Date(today.getTime() - 86400000), completed: false },
      { title: "Today's Todo", dueDate: today, completed: false },
    ];
    const overdueItems = overdue(todoList);
    expect(overdueItems.length).toBe(1);
    expect(overdueItems[0].title).toBe("Overdue Todo");
  });

  test("should retrieve due today items", () => {
    const today = new Date();
    const todoList = [
      { title: "Today's Todo", dueDate: today, completed: false },
      { title: "Future Todo", dueDate: new Date(today.getTime() + 86400000), completed: false },
    ];
    const dueTodayItems = dueToday(todoList);
    expect(dueTodayItems.length).toBe(1);
    expect(dueTodayItems[0].title).toBe("Today's Todo");
  });

  test("should retrieve due later items", () => {
    const today = new Date();
    const todoList = [
      { title: "Today's Todo", dueDate: today, completed: false },
      { title: "Future Todo", dueDate: new Date(today.getTime() + 86400000), completed: false },
    ];
    const dueLaterItems = dueLater(todoList);
    expect(dueLaterItems.length).toBe(1);
    expect(dueLaterItems[0].title).toBe("Future Todo");
  });

  test("should format todos for display", () => {
    const today = new Date();
    const todoList = [
      { title: "Overdue Todo", dueDate: new Date(today.getTime() - 86400000), completed: false },
      { title: "Today's Todo", dueDate: today, completed: true },
      { title: "Future Todo", dueDate: new Date(today.getTime() + 86400000), completed: false },
    ];
    const formattedList = toDisplayableList(todoList);
    expect(formattedList).toContain("Overdue Todo");
    expect(formattedList).toContain("Today's Todo");
    expect(formattedList).toContain("Future Todo");
  });
});
