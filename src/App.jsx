import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

dayjs.extend(relativeTime);

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTodo = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    if (
      todos.some(
        (todo) => todo.text.toLowerCase() === trimmedInput.toLowerCase()
      )
    ) {
      toast.warn(" Task already exists!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: trimmedInput,
      createdAt: new Date(),
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInput("");

    toast.success(" Task Added Successfully!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const handleDeleteTodo = (id) => {
    toast.info(
      ({ closeToast }) => (
        <div className="toast-content">
          <div className="toast-header d-flex justify-content-between">
            <div className="fw-bold"> Are you sure?</div>
          </div>
          <div className="toast-body mt-3">
            <p>Do you really want to delete this task?</p>
            <div className="d-flex gap-3 justify-content-center mt-3">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => {
                  setTodos((prev) => prev.filter((todo) => todo.id !== id));
                  toast.dismiss();
                  toast.success(" Task deleted successfully!", {
                    position: "top-center",
                    autoClose: 1500,
                    theme: "colored",
                  });
                }}
              >
                Yes, Delete
              </button>
              <button className="btn btn-secondary btn-sm" onClick={closeToast}>
                Cancel
              </button>
            </div>
          </div>
        </div>
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

  const handleEditTodo = (id) => {
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
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, text: result.value.trim() } : todo
          )
        );

        toast.success(" Task Updated Successfully!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
      }
    });
  };

  const handleReorder = (index, move) => {
    const newTodos = [...todos];
    if (move === "up" && index > 0) {
      [newTodos[index], newTodos[index - 1]] = [
        newTodos[index - 1],
        newTodos[index],
      ];
    }
    if (move === "down" && index < newTodos.length - 1) {
      [newTodos[index], newTodos[index + 1]] = [
        newTodos[index + 1],
        newTodos[index],
      ];
    }
    setTodos(newTodos);
  };

  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const totalTasks = todos.length;
  const completedTasks = todos.filter((todo) => todo.completed).length;
  const activeTasks = totalTasks - completedTasks;

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

          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
            />
            <button className="btn btn-dark" onClick={handleAddTodo}>
              Add
            </button>
          </div>

          <div className="mb-3 text-center fw-bold">
            Total Tasks: {totalTasks} | Active: {activeTasks} | Completed:{" "}
            {completedTasks}
          </div>

          {todos.length === 0 ? (
            <div className="text-center text-muted py-5">
              <i className="fas fa-tasks fa-3x mb-3"></i>
              <p className="fs-5">No tasks added yet!</p>
              <p>Add your first task using the form above</p>
            </div>
          ) : (
            <ul className="list-group">
              {[...todos].sort((a,b)=>a.completed-b.completed).map((todo, index) => (
                <li
                  key={todo.id}
                  className={`list-group-item d-flex align-items-center justify-content-between flex-wrap`}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="form-check">
                      <input
                        className="form-check-input rounded-circle custom-toggle"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleComplete(todo.id)}
                        id={`todo-${todo.id}`}
                      />
                    </div>

                    <div className="text-section">
                      <span
                        className={`fw-bold ${
                          todo.completed
                            ? "text-decoration-line-through opacity-50"
                            : ""
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
                      onClick={() => handleEditTodo(todo.id)}
                      disabled={todo.completed}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleReorder(index, "up")}
                      disabled={todo.completed}
                    >
                      Move Up
                    </button>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => handleReorder(index, "down")}
                      disabled={todo.completed}
                    >
                      Move Down
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default TodoApp;
