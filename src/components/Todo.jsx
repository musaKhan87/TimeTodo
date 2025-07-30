import { useState, useEffect } from "react";
import "./Todo.css";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { TodoDate } from "./TodoDate";
import {
  getLocalStorageTodoData,
  setLocalStorageTodoData,
} from "./TodoLocalStorage";

export const Todo = () => {
  const [task, setTask] = useState(() => getLocalStorageTodoData());

  useEffect(() => {
    setLocalStorageTodoData(task);
  }, [task]);

  const handleFormSubmit = (inputValue) => {
    const { id, content, checked } = inputValue;
    if (!content || task.find((t) => t.content === content)) return;
    setTask((prevTask) => [...prevTask, { id, content, checked }]);
  };

  const handleDeleteTodo = (id) => {
    setTask(task.filter((t) => t.id !== id));
  };

  const handleClearTodoData = () => setTask([]);

  const handleCheckedTodo = (id) => {
    setTask(task.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t)));
  };

  const handleEditTodo = (id, newContent) => {
    setTask(task.map((t) => (t.id === id ? { ...t, content: newContent } : t)));
  };

  return (
    <section className="todo-container">
      <header>
        <h1>Todo List</h1>
        <TodoDate />
      </header>

      <TodoForm onAddTodo={handleFormSubmit} />

      <section className="myUnOrdList">
        <ul className="todo-list">
          {task.map((curTask) => (
            <TodoList
              key={curTask.id}
              id={curTask.id}
              data={curTask.content}
              checked={curTask.checked}
              onHandleDeleteTodo={handleDeleteTodo}
              onHandleCheckedTodo={handleCheckedTodo}
              onHandleEditTodo={handleEditTodo}
            />
          ))}
        </ul>
      </section>

      {task.length === 0 && (
        <div className="no-todo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No Task"
          />
          <p>No tasks yet. Add something to do! 🎯</p>
        </div>
      )}

      {task.length > 0 && (
        <button className="clear-btn" onClick={handleClearTodoData}>
          Clear all
        </button>
      )}
    </section>
  );
};
