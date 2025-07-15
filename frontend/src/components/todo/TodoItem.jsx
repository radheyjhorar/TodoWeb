import "./TodoItem.css";
import { MdOutlineDone, MdDelete } from "react-icons/md";
import { FaUndo } from 'react-icons/fa';

const TodoItem = ({ todos, handleDelete, handleToggle }) => {
  return (
    <ul className="todo-item-container">
        {todos && todos.map(({ _id, title, completed }, index) => (
            <li key={_id} style={completed ? {backgroundColor: "var(--primary-color)", color: "white"}: {}}>
              <span>{index+1}. {title}</span>
              <div className="flex ml-auto space-x-1">
                <button
                  onClick={() => handleToggle(_id, completed)}
                  className={completed ? "undo-btn" : "done-btn"}
                >
                  {completed ? <FaUndo />  : <MdOutlineDone/>}
                </button>
                <button
                  onClick={() => handleDelete(_id)}
                  className="delete-btn"
                >
                  <MdDelete />
                </button>
              </div>
            </li>
          ))}
      </ul>
  );
};

export default TodoItem;
