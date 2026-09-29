const DeleteConfirmToast = ({ onConfirm, closeToast }) => (
  <div className="toast-content">
    <div className="toast-header d-flex justify-content-between">
      <div className="fw-bold"> Are you sure?</div>
    </div>
    <div className="toast-body mt-3">
      <p>Do you really want to delete this task?</p>
      <div className="d-flex gap-3 justify-content-center mt-3">
        <button className="btn btn-danger btn-sm" onClick={onConfirm}>
          Yes, Delete
        </button>
        <button className="btn btn-secondary btn-sm" onClick={closeToast}>
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default DeleteConfirmToast;
