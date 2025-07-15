import { useEffect, useState } from "react";
import todoService from "../services/todoService";
import { AddTodoForm, TodoItem } from "../components";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const token = localStorage.getItem("accessToken");

  const fetchTodos = async () => {
    const data = await todoService.getTodos(token);
    setTodos(data);
    // console.log("Data: ", data);
  };

  const handleDelete = async (id) => {
    await todoService.deleteTodo(id, token);
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  const handleToggle = async (id, completed) => {
    await todoService.updateTodo(id, { completed: !completed }, token);
    setTodos((prev) =>
      prev.map((todo) =>
        todo._id === id ? { ...todo, completed: !completed } : todo
      )
    );
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="home-container">
      <AddTodoForm todos={todos} setTodos={setTodos} />
      {todos && (
        <TodoItem
          todos={todos}
          handleDelete={handleDelete}
          handleToggle={handleToggle}
        />
      )}
    </div>
  );
};

export default Home;
