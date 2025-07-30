import { useState } from "react";

export const TodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAddTodo({
      id: Date.now(),
      content: inputValue,
      checked: false,
    });
    setInputValue("");
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Enter task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};
