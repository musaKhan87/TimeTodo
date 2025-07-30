import { MdCheck, MdDeleteForever, MdEdit, MdSave } from "react-icons/md";
import { useState } from "react";

export const TodoList = ({
  data,
  checked,
  id,
  onHandleDeleteTodo,
  onHandleCheckedTodo,
  onHandleEditTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(data);

  const handleEditSubmit = () => {
    if (editValue.trim() !== "") {
      onHandleEditTodo(id, editValue);
      setIsEditing(false);
    }
  };

  return (
    <li className="todo-item">
      {isEditing ? (
        <>
          <input
            className="edit-input"
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <button className="check-btn" onClick={handleEditSubmit}>
            <MdSave />
          </button>
        </>
      ) : (
        <>
          <span className={checked ? "checkList" : "notCheckList"}>{data}</span>
          <button className="check-btn" onClick={() => onHandleCheckedTodo(id)}>
            <MdCheck />
          </button>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            <MdEdit />
          </button>
          <button className="delete-btn" onClick={() => onHandleDeleteTodo(id)}>
            <MdDeleteForever />
          </button>
        </>
      )}
    </li>
  );
};
