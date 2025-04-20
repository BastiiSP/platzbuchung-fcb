import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { de } from "date-fns/locale";
import { getEventColor } from "@/utils/getEventColor";
import { fetchEvents } from "@/utils/fetchEvents";

registerLocale("de", de);

type Props = {
  userId: string;
  supabase: any;
  setEvents: (events: any[]) => void;
  setSuccessMessage: (msg: string) => void;
  setErrorMessage: (msg: string) => void;
};

export default function Buchungsformular({
  userId,
  supabase,
  setEvents,
  setSuccessMessage,
  setErrorMessage,
}: Props) {
  const [platz, setPlatz] = useState("hauptplatz");
  const [platzanteil, setPlatzanteil] = useState("ganz");
  const [anlass, setAnlass] = useState("training");
  const [startzeit, setStartzeit] = useState<Date | null>(null);
  const [endzeit, setEndzeit] = useState<Date | null>(null);
  const [mannschaft, setMannschaft] = useState("");
  const [buchendePerson, setBuchendePerson] = useState("");
  const [bemerkung, setBemerkung] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!startzeit || !endzeit) {
      setErrorMessage("❌ Bitte Start- und Endzeit auswählen.");
      return;
    }

    const startISO = startzeit.toISOString();
    const endISO = endzeit.toISOString();

    // 🧠 Abfrage vorhandener Buchungen für denselben Platz mit Überschneidung
    const { data: existing, error: fetchError } = await supabase
      .from("buchungen")
      .select("startzeit, endzeit, platzanteil")
      .eq("platz", platz)
      .gte("endzeit", startISO)
      .lte("startzeit", endISO);

    if (fetchError) {
      setErrorMessage("❌ Fehler beim Abrufen bestehender Buchungen.");
      return;
    }

    const anteilWerte: Record<string, number> = {
      viertel: 0.25,
      halb: 0.5,
      ganz: 1,
    };

    // 📏 Gesamtbelegung im Zeitfenster berechnen
    let belegung = 0;
    for (const buchung of existing || []) {
      const startB = new Date(buchung.startzeit).getTime();
      const endB = new Date(buchung.endzeit).getTime();
      const startN = startzeit.getTime();
      const endN = endzeit.getTime();

      if (startN < endB && endN > startB) {
        belegung += anteilWerte[buchung.platzanteil] || 0;
      }
    }

    const neuerWert = anteilWerte[platzanteil];
    if (belegung + neuerWert > 1) {
      setErrorMessage("❌ Der Platz ist zu diesem Zeitpunkt bereits belegt.");
      return;
    }

    // ✅ Neue Buchung eintragen
    const { error: insertError } = await supabase.from("buchungen").insert({
      platz,
      platzanteil,
      anlass,
      startzeit: startISO,
      endzeit: endISO,
      mannschaft,
      buchende_person: buchendePerson,
      bemerkung,
      user_id: userId,
    });

    if (insertError) {
      setErrorMessage("❌ Fehler beim Speichern. Bitte versuche es erneut.");
      return;
    }

    // 🎉 Erfolg
    setMannschaft("");
    setBuchendePerson("");
    setBemerkung("");
    setStartzeit(null);
    setEndzeit(null);
    setErrorMessage("");
    setSuccessMessage("✅ Die Buchung wurde erfolgreich gespeichert.");

    // 🔁 Events neu laden für aktuelle Anzeige & Farben
    await fetchEvents(supabase, setEvents);
  };

  return (
    <>
      <h2 className="text-xl font-semibold mt-8 mb-2">➕ Neue Buchung</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4 flex-wrap">
          <select
            value={platz}
            onChange={(e) => setPlatz(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded text-black bg-white"
          >
            <option value="hauptplatz">Hauptplatz</option>
            <option value="nebenplatz">Nebenplatz</option>
          </select>

          <select
            value={platzanteil}
            onChange={(e) => setPlatzanteil(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded text-black bg-white"
          >
            <option value="viertel">1/4 Platz</option>
            <option value="halb">1/2 Platz</option>
            <option value="ganz">Ganzer Platz</option>
          </select>

          <select
            value={anlass}
            onChange={(e) => setAnlass(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded text-black bg-white"
          >
            <option value="training">Training</option>
            <option value="freundschaftsspiel">Freundschaftsspiel</option>
            <option value="punktspiel">Punktspiel</option>
            <option value="platzpflege">Platzpflege</option>
          </select>
        </div>

        <div className="flex gap-4 flex-wrap">
          <div>
            <label className="block text-sm font-medium mb-1">Startzeit</label>
            <DatePicker
              selected={startzeit} // Der aktuell gewählte Startzeitpunkt
              onChange={(date) => {
                if (date) {
                  setStartzeit(date); // ⏱️ Startzeit setzen

                  // 🧠 Wenn die Startzeit auch eine Uhrzeit enthält (nicht nur Datum) UND noch keine Endzeit gesetzt ist:
                  const hours = date.getHours();
                  const minutes = date.getMinutes();
                  const hatUhrzeit = hours !== 0 || minutes !== 0;

                  if (!endzeit && hatUhrzeit) {
                    // Setze Endzeit auf denselben Zeitpunkt wie Startzeit (für späteren Vergleich)
                    const sameTime = new Date(date.getTime());
                    setEndzeit(sameTime);
                  }
                }
              }}
              locale="de" // 🇩🇪 Deutschsprachiges Datumsformat
              showTimeSelect // 🕓 Zeitwahl im Kalender aktivieren
              timeFormat="HH:mm" // Zeit im 24-Stunden-Format anzeigen
              timeIntervals={15} // ⏱️ 15-Minuten-Schritte
              dateFormat="dd.MM.yyyy HH:mm" // 📅 Formatierung von Datum + Uhrzeit
              placeholderText="Startzeit wählen" // Platzhaltertext im Eingabefeld
              className="border border-gray-300 p-2 rounded text-black bg-white" // 💅 Styling
              popperPlacement="bottom-start" // 🧭 Wichtig: Popup öffnet sich unten links, um abgeschnittene Darstellung zu vermeiden
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Endzeit</label>
            <DatePicker
              selected={endzeit}
              onChange={(date) => setEndzeit(date)}
              locale="de"
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="dd.MM.yyyy HH:mm"
              placeholderText="Endzeit wählen"
              className="border border-gray-300 p-2 rounded text-black bg-white"
            />
          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            value={buchendePerson}
            onChange={(e) => setBuchendePerson(e.target.value)}
            placeholder="Name der buchenden Person"
            required
            className="border border-gray-300 p-2 rounded text-black bg-white w-full md:w-auto"
          />
          <input
            type="text"
            value={mannschaft}
            onChange={(e) => setMannschaft(e.target.value)}
            placeholder="Mannschaftsname"
            required
            className="border border-gray-300 p-2 rounded text-black bg-white w-full md:w-auto"
          />
        </div>

        <textarea
          value={bemerkung}
          onChange={(e) => setBemerkung(e.target.value)}
          placeholder="Weitere Informationen (optional)"
          className="border border-gray-300 p-2 rounded text-black bg-white w-full"
          rows={3}
        />

        <button
          type="submit"
          className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded"
        >
          Buchung speichern
        </button>
      </form>
    </>
  );
}
