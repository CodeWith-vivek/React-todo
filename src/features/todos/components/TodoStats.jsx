const TodoStats = ({ total, active, completed }) => (
  <div className="mb-3 text-center fw-bold">
    Total Tasks: {total} | Active: {active} | Completed: {completed}
  </div>
);

export default TodoStats;
