import { toast } from "react-toastify";

const DEFAULT_OPTIONS = {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
};

export const notifySuccess = (message, options) =>
  toast.success(message, { ...DEFAULT_OPTIONS, ...options });

export const notifyWarning = (message, options) =>
  toast.warn(message, { ...DEFAULT_OPTIONS, ...options });
