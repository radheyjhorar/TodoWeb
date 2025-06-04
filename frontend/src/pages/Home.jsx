import { useEffect, useState } from "react";
// import TodoList from "../components/TodoList";
import todoService from "../services/todoService";
import { useNavigate } from "react-router-dom";

const Home = ({ user }) => {
  const [todos, setTodos] = useState();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const fetchTodos = async () => {
    try {
      const data = await todoService.getTodos(token);
      setTodos(data);
    } catch (err) {
      if(err.response?.status === 403) {
        // navigate('/login');
        window.location.href = '/login'; // Auto redirect on token expiry
      }
      console.error("Error fetching todos", err);
    }
  };

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

  const handleDelete = async (id) => {
    await todoService.deleteTodo(id, token);
    // fetchTodos();
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  const handleToggle = async (id, completed) => {
    await todoService.updateTodo(id, { completed: !completed });
    // fetchTodos();
    setTodos((prev)=>prev.map((todo)=>todo._id === id ? {...todo, completed: !completed}: todo))
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <form onSubmit={handleAdd}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new Todo"
        />
        <button>Add</button>
      </form>
      <ul>
        {todos && todos.map(({_id, title, completed}) =>(
           <li key={_id}>
            <span>{title}</span>
            <div className="space-x-2">
              <button 
                onClick={() => handleToggle(_id, completed)}
                className={`px-3 py-1 rounded ${completed?'bg-yellow-500':'bg-green-600'} text-white`}
                >
                  {completed ? 'Undo': 'Done'}
                </button>
                <button
                  onClick={() => handleDelete(_id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >Delete</button>
            </div>
            </li>
        )
        )}
      </ul>
      {/* {todos && (
        <TodoList
          todos={todos}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      )} */}
    </div>
  );
};

export default Home;
