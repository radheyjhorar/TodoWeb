import TodoItem from "./TodoItem"

const TodoList = ({ todos, onDelete, onToggle}) => {
  return (
    <ul>
      {
        todos && todos.map(todo => (
          <TodoItem key={todo._id} todo={todo} onDelete={onDelete} onToggle={onToggle} />
        ))
      }
    </ul>
  )
}

export default TodoList