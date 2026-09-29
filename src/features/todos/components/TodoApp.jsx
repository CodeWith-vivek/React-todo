import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { notifySuccess, notifyWarning } from "@/shared/lib/toast";
import { useTodos } from "../hooks/useTodos";
import TodoForm from "./TodoForm";
import TodoStats from "./TodoStats";
import TodoList from "./TodoList";
import EmptyState from "./EmptyState";
import DeleteConfirmToast from "./DeleteConfirmToast";

const TodoApp = () => {
  const {
    todos,
    stats,
    isDuplicate,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleTodo,
    reorderTodo,
  } = useTodos();

  const handleAdd = (input) => {
    const text = input.trim();
    if (!text) return false;

    if (isDuplicate(text)) {
      notifyWarning(" Task already exists!");
      return false;
    }

    addTodo(text);
    notifySuccess(" Task Added Successfully!");
    return true;
  };

  const handleDelete = (id) => {
    toast.info(
      ({ closeToast }) => (
        <DeleteConfirmToast
          closeToast={closeToast}
          onConfirm={() => {
            deleteTodo(id);
            toast.dismiss();
            notifySuccess(" Task deleted successfully!", {
              position: "top-center",
            });
          }}
        />
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        theme: "dark",
        className: "custom-toast",
        bodyClassName: "toast-body-custom",
      }
    );
  };

  const handleEdit = (id) => {
    const currentTodo = todos.find((todo) => todo.id === id);
    Swal.fire({
      title: "Edit your task",
      input: "text",
      inputValue: currentTodo?.text,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value.trim()) {
          return "Task cannot be empty!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        updateTodo(id, result.value.trim());
        notifySuccess(" Task Updated Successfully!");
      }
    });
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg rounded-4">
        <div className="card-body">
          <h1 className="text-center mb-4">
            <i className="fas fa-clipboard-list me-2"></i> Todo App
          </h1>
          <p className="text-center text-muted mb-4">
            Stay organized and boost your productivity!
          </p>

          <TodoForm onAdd={handleAdd} />
          <TodoStats {...stats} />

          {todos.length === 0 ? (
            <EmptyState />
          ) : (
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onEdit={handleEdit}
              onReorder={reorderTodo}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
