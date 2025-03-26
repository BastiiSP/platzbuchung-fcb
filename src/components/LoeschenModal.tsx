"use client";

import React from "react";

interface Props {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  mannschaft?: string;
}

export default function LoeschenModal({
  show,
  onClose,
  onConfirm,
  mannschaft,
}: Props) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white dark:bg-zinc-900 text-black dark:text-white p-6 rounded shadow-lg max-w-md w-full animate-fade-in">
        <h2 className="text-xl font-semibold mb-4">🗑️ Buchung löschen</h2>
        <p className="mb-4">
          Möchtest du die Buchung für{" "}
          <strong>{mannschaft || "diese Mannschaft"}</strong> wirklich löschen?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black font-semibold px-4 py-2 rounded"
          >
            Abbrechen
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
          >
            Ja, löschen
          </button>
        </div>
      </div>
    </div>
  );
}
