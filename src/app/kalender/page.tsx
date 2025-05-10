"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { EventDropArg, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import { createClient } from "@supabase/supabase-js";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light-border.css";

import ThemeToggle from "@/components/ThemeToggle";
import ToastMessage from "@/components/ToastMessage";
import Buchungsformular from "@/components/Buchungsformular";
import LoeschenModal from "@/components/LoeschenModal";
import BearbeitenModal, { type Buchung } from "@/components/BearbeitenModal";
import TooltipContent from "@/components/TooltipContent";
import { fetchEvents } from "@/utils/fetchEvents";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function KalenderSeite() {
  // 🔁 States für User, Rollen und Events
  const [events, setEvents] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [rolle, setRolle] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ UI States: Meldungen, Modal, Tooltip
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loeschenModalOffen, setLoeschenModalOffen] = useState(false);
  const [zuLoeschendeId, setZuLoeschendeId] = useState<string | null>(null);
  const [zuLoeschendeMannschaft, setZuLoeschendeMannschaft] = useState<
    string | null
  >(null);
  const [bearbeiteBuchung, setBearbeiteBuchung] = useState<Buchung | null>(
    null
  );
  const [geoeffneterTooltipId, setGeoeffneterTooltipId] = useState<
    string | null
  >(null);

  // 🔐 Session prüfen und Rolle laden
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUserId(session.user.id);
        setIsLoggedIn(true);

        const { data: profile } = await supabase
          .from("profile")
          .select("rolle", { head: false }) // 🔧 Fehlervermeidung
          .eq("id", session.user.id)
          .single();

        if (profile?.rolle) setRolle(profile.rolle);

        fetchEvents(supabase, setEvents);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  // 🗑️ Termin löschen
  const handleLoeschen = async () => {
    if (!zuLoeschendeId) return;

    const { error } = await supabase
      .from("buchungen")
      .delete()
      .eq("id", zuLoeschendeId);

    if (error) {
      setErrorMessage("❌ Löschen fehlgeschlagen.");
    } else {
      setSuccessMessage("✅ Buchung erfolgreich gelöscht.");
      fetchEvents(supabase, setEvents);
    }

    setLoeschenModalOffen(false);
    setZuLoeschendeId(null);
    setZuLoeschendeMannschaft(null);
  };

  // 🟦 Drag & Drop Handler
  const handleEventDrop = async (info: EventDropArg) => {
    const event = info.event;
    const buchungId = event.id;

    const { error } = await supabase
      .from("buchungen")
      .update({
        startzeit: event.start?.toISOString(),
        endzeit: event.end?.toISOString(),
      })
      .eq("id", buchungId);

    if (error) {
      setErrorMessage("❌ Fehler beim Verschieben.");
    } else {
      setSuccessMessage("✅ Buchung erfolgreich verschoben.");
      fetchEvents(supabase, setEvents);
    }
  };

  return (
    <>
      {/* <ThemeToggle /> */}

      {/* ✅ Toast Meldungen */}
      {errorMessage && (
        <ToastMessage
          message={errorMessage}
          type="error"
          onClose={() => setErrorMessage("")}
        />
      )}
      {successMessage && (
        <ToastMessage
          message={successMessage}
          type="success"
          onClose={() => setSuccessMessage("")}
        />
      )}

      <main className="p-4 w-full overflow-x-auto bg-[var(--background)] text-[var(--foreground)]">
        <h1 className="text-2xl font-bold mb-4">📅 Platzbelegung</h1>

        {/* 🔒 Wenn nicht eingeloggt, Login-Hinweis */}
        {!isLoggedIn ? (
          <div className="text-center text-red-600 font-medium space-y-4">
            <p>
              Du bist nicht eingeloggt. Bitte logge dich ein, um die
              Platzbelegung zu sehen.
            </p>
            <a
              href="/login"
              className="inline-block bg-black hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded transition"
            >
              🔐 zum Login/zur Registrierung
            </a>
          </div>
        ) : (
          <>
            {/* 📆 Kalender */}
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
              locale="de"
              firstDay={1}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              slotMinTime="08:00:00"
              slotMaxTime="22:30:00"
              allDaySlot={false}
              height="auto"
              editable={true}
              eventDrop={async (info) => {
                const buchung = info.event.extendedProps as Buchung;
                const neuesStart = info.event.start;
                const neuesEnde = info.event.end;

                // Schutz gegen undefinierte Daten
                if (!neuesStart || !neuesEnde) return;

                const startISO = neuesStart.toISOString();
                const endISO = neuesEnde.toISOString();

                // Buchung nur aktualisieren, wenn sich Zeiten wirklich geändert haben
                if (
                  startISO === buchung.startzeit &&
                  endISO === buchung.endzeit
                ) {
                  return;
                }

                // 👮 Zugriffsrechte prüfen
                const darfAnpassen =
                  rolle === "vorstand" || buchung.user_id === userId;
                if (!darfAnpassen) {
                  info.revert(); // Zurückspringen
                  setErrorMessage(
                    "❌ Du darfst diese Buchung nicht verschieben."
                  );
                  return;
                }

                // 🔎 Bestehende Buchungen für denselben Platz abrufen
                const { data: existing, error } = await supabase
                  .from("buchungen")
                  .select("startzeit, endzeit, platzanteil")
                  .eq("platz", buchung.platz)
                  .neq("id", buchung.id) // Aktuelle Buchung ausschließen
                  .gte("endzeit", startISO)
                  .lte("startzeit", endISO);

                if (error) {
                  console.error("Fehler beim Abrufen:", error);
                  setErrorMessage(
                    "❌ Fehler bei der Überprüfung der Platzbelegung."
                  );
                  info.revert();
                  return;
                }

                const anteilsWerte: Record<string, number> = {
                  ganz: 1,
                  halb: 0.5,
                  viertel: 0.25,
                };

                let belegung = 0;
                for (const buchung of existing || []) {
                  const existingStart = new Date(buchung.startzeit).getTime();
                  const existingEnd = new Date(buchung.endzeit).getTime();
                  const newStart = neuesStart.getTime();
                  const newEnd = neuesEnde.getTime();

                  if (newStart < existingEnd && newEnd > existingStart) {
                    belegung += anteilsWerte[buchung.platzanteil] || 0;
                  }
                }

                const aktuellerWert = anteilsWerte[buchung.platzanteil] || 0;

                if (belegung + aktuellerWert > 1) {
                  setErrorMessage(
                    "❌ Der Platz ist zu diesem Zeitpunkt vollständig belegt."
                  );
                  info.revert();
                  return;
                }

                // ✅ Buchung mit neuen Zeiten speichern
                const { error: updateError } = await supabase
                  .from("buchungen")
                  .update({
                    startzeit: startISO,
                    endzeit: endISO,
                  })
                  .eq("id", buchung.id);

                if (updateError) {
                  setErrorMessage("❌ Fehler beim Speichern der neuen Zeiten.");
                  info.revert();
                  return;
                }

                setSuccessMessage("✅ Buchung erfolgreich verschoben.");
                await fetchEvents(supabase, setEvents); // neu laden
              }}
              events={events}
              eventContent={(arg) => {
                const props = arg.event.extendedProps as Buchung;
                const istGeoeffnet = geoeffneterTooltipId === arg.event.id;

                return (
                  <Tippy
                    visible={istGeoeffnet}
                    onClickOutside={() => setGeoeffneterTooltipId(null)}
                    content={
                      <TooltipContent
                        props={props}
                        event={arg.event}
                        userId={userId}
                        rolle={rolle}
                        onEdit={() => {
                          setBearbeiteBuchung(props);
                          setGeoeffneterTooltipId(null);
                        }}
                        onDelete={() => {
                          setZuLoeschendeId(props.id);
                          setZuLoeschendeMannschaft(props.mannschaft);
                          setLoeschenModalOffen(true);
                          setGeoeffneterTooltipId(null);
                        }}
                      />
                    }
                    interactive={true}
                    theme="light-border"
                    placement="top"
                    appendTo={document.body}
                    zIndex={9999}
                  >
                    <div
                      className="whitespace-pre-line px-1 text-sm cursor-pointer transition-all duration-150 transform hover:scale-101 hover:drop-shadow-md hover:brightness-70"
                      onClick={() =>
                        setGeoeffneterTooltipId((prev) =>
                          prev === arg.event.id ? null : arg.event.id
                        )
                      }
                    >
                      {arg.event.title}
                    </div>
                  </Tippy>
                );
              }}
            />

            {/* 🧾 Buchungsformular */}
            <Buchungsformular
              userId={userId!}
              supabase={supabase}
              setEvents={setEvents}
              setSuccessMessage={setSuccessMessage}
              setErrorMessage={setErrorMessage}
            />
          </>
        )}
      </main>

      {/* 🧨 Lösch-Bestätigung */}
      <LoeschenModal
        show={loeschenModalOffen}
        onClose={() => setLoeschenModalOffen(false)}
        onConfirm={handleLoeschen}
        mannschaft={zuLoeschendeMannschaft || ""}
      />

      {/* ✏️ Bearbeiten-Modal */}
      <BearbeitenModal
        show={!!bearbeiteBuchung}
        onClose={() => setBearbeiteBuchung(null)}
        supabase={supabase}
        initialData={bearbeiteBuchung!}
        onSave={() => {
          setBearbeiteBuchung(null);
          fetchEvents(supabase, setEvents);
        }}
      />
    </>
  );
}
