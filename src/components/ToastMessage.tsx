"use client";

// 🧾 Typdefinition für Toast-Komponente
type ToastProps = {
  message: string; // 🔤 Der anzuzeigende Text im Toast
  type: "success" | "error"; // ✅ Erfolgs- oder ❌ Fehlertyp
  onClose: () => void; // 🔁 Funktion zum Schließen
};

// 🚀 Hauptkomponente für visuelle Feedback-Nachrichten (Toast)
export default function ToastMessage({ message, type, onClose }: ToastProps) {
  // 🎨 Hintergrund- und Hoverfarbe je nach Toast-Typ bestimmen
  const bgColor = type === "success" ? "bg-green-700" : "bg-red-700";
  const hoverColor =
    type === "success" ? "hover:text-green-300" : "hover:text-red-300";

  return (
    // 📦 Positionierung oben mittig auf der Seite, mobilfreundlich
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div
        className={`relative ${bgColor} text-white px-6 py-3 rounded shadow-lg toast-animate`}
      >
        {/* 📝 Nachrichtentext */}
        {message}

        {/* ❌ Schließen-Button (oben rechts) */}
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
