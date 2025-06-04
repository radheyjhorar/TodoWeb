import { MdOutlineDone, MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const TodoItem = ({todo, onDelete, onToggle}) => {
  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      {todo.title}
      <button onClick={() => onToggle(todo)}>{ !todo.completed ? <MdOutlineDone />: <RxCross2 /> }</button>
      <button onClick={() => onDelete(todo._id)}><MdDelete /></button>
    </li>
  )
}

export default TodoItem