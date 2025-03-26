"use client";

type ToastProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

export default function ToastMessage({ message, type, onClose }: ToastProps) {
  const bgColor = type === "success" ? "bg-green-700" : "bg-red-700";
  const hoverColor =
    type === "success" ? "hover:text-green-300" : "hover:text-red-300";

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div
        className={`relative ${bgColor} text-white px-6 py-3 rounded shadow-lg toast-animate`}
      >
        {message}
        <button
          onClick={onClose}
          className={`absolute top-1 right-3 text-white ${hoverColor} text-xl font-bold`}
          aria-label="Toast schließen"
        >
          ×
        </button>
      </div>
    </div>
  );
}
