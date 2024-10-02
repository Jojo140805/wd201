const todoList = () => {
    let all = [];
    
    const add = (todoItem) => {
      all.push(todoItem);
    };
    
    const markAsComplete = (index) => {
      all[index].completed = true;
    };
  
    const overdue = () => {
      const today = formattedDate(new Date());
      return all.filter(todo => todo.dueDate < today);
    };
  
    const dueToday = () => {
      const today = formattedDate(new Date());
      return all.filter(todo => todo.dueDate === today);
    };
  
    const dueLater = () => {
      const today = formattedDate(new Date());
      return all.filter(todo => todo.dueDate > today);
    };
  
    const toDisplayableList = (list) => {
      return list.map(todo => {
        const checkbox = todo.completed ? '[x]' : '[ ]';
        const displayDate = todo.dueDate === formattedDate(new Date()) ? '' : ` ${todo.dueDate}`;
        return `${checkbox} ${todo.title}${displayDate}`;
      }).join('\n');
    };
  
    return {
      all,
      add,
      markAsComplete,
      overdue,
      dueToday,
      dueLater,
      toDisplayableList
    };
  };
  
 module.exports=todoList;