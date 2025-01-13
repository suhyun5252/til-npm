import clsx from "clsx";

/* eslint-disable react/prop-types */
function Alert({ message, type }) {
  return (
    <div
      className={clsx(
        "p-4 m-4 rounded",
        type === "success" && "bg-green-200 text-green-700",
        type === "error" && "bg-red-200 text-red-700",
        type === "warning" && "bg-yellow-200 text-yellow-700",
      )}
    >
      {message}
    </div>
  );
}
export default Alert;
