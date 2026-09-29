import dayjs from "@/shared/lib/dayjs";

const TodoItem = ({ todo, onToggle, onEdit, onMoveUp, onMoveDown, onDelete }) => (
  <li className="list-group-item d-flex align-items-center justify-content-between flex-wrap">
    <div className="d-flex align-items-center gap-3">
      <div className="form-check">
        <input
          className="form-check-input rounded-circle custom-toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          id={`todo-${todo.id}`}
        />
      </div>

      <div className="text-section">
        <span
          className={`fw-bold ${
            todo.completed ? "text-decoration-line-through opacity-50" : ""
          }`}
        >
          {todo.text}
        </span>
        <div>
          <small className="text-muted">
            {dayjs(todo.createdAt).fromNow()}
          </small>
        </div>
      </div>
    </div>

    <div className="d-flex gap-2 mt-2 mt-md-0">
      <button
        className="btn btn-outline-success btn-sm"
        onClick={onEdit}
        disabled={todo.completed}
      >
        Edit
      </button>
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={onMoveUp}
        disabled={todo.completed}
      >
        Move Up
      </button>
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={onMoveDown}
        disabled={todo.completed}
      >
        Move Down
      </button>
      <button className="btn btn-outline-danger btn-sm" onClick={onDelete}>
        Delete
      </button>
    </div>
  </li>
);

export default TodoItem;
