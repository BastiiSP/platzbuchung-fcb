import { EventApi } from "@fullcalendar/core";

type Props = {
  props: any;
  event: EventApi;
  userId: string | null;
  rolle: string | null;
  onEdit: () => void;
  onDelete: () => void;
};

export default function TooltipContent({
  props,
  event,
  userId,
  rolle,
  onEdit,
  onDelete,
}: Props) {
  const darfBearbeiten = rolle === "vorstand" || props.user_id === userId;

  return (
    <div className="text-sm space-y-1">
      <p>
        <span className="font-semibold">📍 Platz:</span>{" "}
        {props.platz.charAt(0).toUpperCase() + props.platz.slice(1)}
      </p>
      <p>
        <span className="font-semibold">📏 Platzanteil:</span>{" "}
        {props.platzanteil.charAt(0).toUpperCase() + props.platzanteil.slice(1)}
      </p>
      <p>
        <span className="font-semibold">🙋 Person:</span>{" "}
        {props.buchende_person}
      </p>
      <p>
        <span className="font-semibold">⏰ Zeit:</span>{" "}
        {new Date(event.start!).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
        –{" "}
        {new Date(event.end!).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      {darfBearbeiten && (
        <div className="flex gap-2 pt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="text-xs px-2 py-1 rounded 
                      bg-gray-800 text-black hover:bg-gray-700 
                      dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            ✏️ Bearbeiten
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-xs bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
          >
            🗑️ Löschen
          </button>
        </div>
      )}
    </div>
  );
}
