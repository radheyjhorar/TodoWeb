import "./AddTodoForm.css";
import { useState } from "react";
import todoService from "../../services/todoService";
import { FaPlus } from 'react-icons/fa';

const AddTodoForm = ({todos, setTodos}) => {
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("accessToken");

  const handleAdd = async (e) => {
      e.preventDefault();
      if (!title.trim()) return;
      try {
        const newTodo = await todoService.createTodo({ title }, token);
        setTodos([newTodo, ...todos]);
        setTitle("");
      } catch (err) {
        console.error("Error adding todo", err);
      }
    };

  return (
    <form onSubmit={handleAdd} className="add-todo-form-container">
      <input
        type="text"
        name="todo-text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add new Todo"
      />
      <button className="todo-create-btn"><FaPlus/>Create</button>
    </form>
  );
};

export default AddTodoForm;
