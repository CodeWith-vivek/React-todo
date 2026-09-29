import { useState } from "react";

const TodoForm = ({ onAdd }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (onAdd(input)) setInput("");
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Enter your task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
      <button className="btn btn-dark" onClick={handleSubmit}>
        Add
      </button>
    </div>
  );
};

export default TodoForm;
