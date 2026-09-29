import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggle, onEdit, onReorder, onDelete }) => (
  <ul className="list-group">
    {[...todos]
      .sort((a, b) => a.completed - b.completed)
      .map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onEdit={() => onEdit(todo.id)}
          onMoveUp={() => onReorder(index, "up")}
          onMoveDown={() => onReorder(index, "down")}
          onDelete={() => onDelete(todo.id)}
        />
      ))}
  </ul>
);

export default TodoList;
