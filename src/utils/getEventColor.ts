export function getEventColor(platz: string): string {
  const platzKey = platz.toLowerCase();

  const farben: Record<string, string> = {
    hauptplatz: "#3b82f6", // kräftiges Blau
    nebenplatz: "#22c55e", // kräftiges Grün
  };

  return farben[platzKey] || "#999";
}
