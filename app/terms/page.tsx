import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nutzungsbedingungen — AlpinChaser",
  description: "Nutzungsbedingungen der AlpinChaser App.",
};

export default function TermsPage() {
  return (
    <main
      style={{ background: "#0A0A0B", minHeight: "100vh", color: "#F0F0F5" }}
      className="px-6 py-16 max-w-3xl mx-auto"
    >
      <Link
        href="/"
        style={{ color: "#39FF14", fontSize: 14, letterSpacing: "0.05em" }}
        className="uppercase font-semibold hover:opacity-70 transition-opacity"
      >
        ← Zurück
      </Link>

      <h1
        className="mt-8 mb-2 text-3xl font-bold tracking-tight"
        style={{ color: "#D4AF37" }}
      >
        Nutzungsbedingungen
      </h1>
      <p className="mb-10 text-sm" style={{ color: "#6B6B7A" }}>
        Stand: April 2026
      </p>

      <Section title="1. Geltungsbereich">
        <p>
          Diese Nutzungsbedingungen gelten für die Nutzung der App{" "}
          <strong style={{ color: "#F0F0F5" }}>AlpinChaser</strong> sowie der
          zugehörigen Website (alpinchaser.com). Mit der Installation oder
          Nutzung der App stimmst du diesen Bedingungen zu. Anbieter ist
          Christoph Larcher, erreichbar unter{" "}
          <a
            href="mailto:support@alpinchaser.com"
            style={{ color: "#39FF14" }}
            className="hover:opacity-70 transition-opacity"
          >
            support@alpinchaser.com
          </a>
          .
        </p>
      </Section>

      <Section title="2. Nutzung der App">
        <p>
          AlpinChaser ist eine Karten-App für Motorradfahrer und
          Outdoor-Enthusiasten, die Informationen zu Alpenpässen bereitstellt.
          Du darfst die App ausschließlich für private, nicht-kommerzielle Zwecke
          verwenden.
        </p>
        <p className="mt-3">Folgendes ist untersagt:</p>
        <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: "#C0C0CC" }}>
          <li>Kommerzielle Nutzung oder Weiterverkauf der App-Inhalte</li>
          <li>Reverse Engineering, Dekompilierung oder Modifikation der App</li>
          <li>Automatisiertes Auslesen von Daten (Scraping)</li>
          <li>Nutzung auf eine Art, die den Betrieb der App beeinträchtigt</li>
          <li>Hochladen von rechtswidrigen, beleidigenden oder falschen Inhalten</li>
        </ul>
      </Section>

      <Section title="3. Haftungsausschluss">
        <div
          className="rounded-xl p-5 mb-4"
          style={{
            background: "rgba(212,175,55,0.07)",
            border: "1.5px solid rgba(212,175,55,0.35)",
          }}
        >
          <p className="font-semibold" style={{ color: "#D4AF37" }}>
            Wichtiger Hinweis — Fahren auf eigene Gefahr
          </p>
          <p className="mt-2" style={{ color: "#C0C0CC" }}>
            AlpinChaser stellt Informationen zu Alpenpässen zu Planungs- und
            Informationszwecken bereit. Die in der App enthaltenen Daten (Öffnungszeiten,
            Straßenzustand, Passierbarkeit, Höhenangaben usw.) können veraltet,
            unvollständig oder fehlerhaft sein.
          </p>
          <p className="mt-2" style={{ color: "#C0C0CC" }}>
            <strong style={{ color: "#F0F0F5" }}>
              Wir übernehmen keinerlei Haftung für Unfälle, Schäden, Verletzungen
              oder sonstige Folgen, die sich aus der Nutzung der App oder dem
              Vertrauen auf die darin enthaltenen Informationen ergeben.
            </strong>{" "}
            Dies gilt insbesondere für Straßenzustände, Sperrungen, Wetterverhältnisse
            und die aktuelle Befahrbarkeit von Pässen.
          </p>
          <p className="mt-2" style={{ color: "#C0C0CC" }}>
            Jeder Nutzer fährt auf eigene Gefahr und ist selbst dafür
            verantwortlich, sich vor Fahrtantritt über aktuelle Straßen- und
            Wetterverhältnisse zu informieren.
          </p>
        </div>
        <p>
          Die Haftung für leichte Fahrlässigkeit ist im gesetzlich zulässigen
          Rahmen ausgeschlossen. Eine Haftung für Datenverlust, entgangenen Gewinn
          oder mittelbare Schäden ist ausgeschlossen, soweit gesetzlich zulässig.
        </p>
      </Section>

      <Section title="4. Nutzerinhalte">
        <p>
          Sofern die App die Möglichkeit bietet, eigene Inhalte (z. B.
          Bewertungen, Kommentare) hochzuladen, sicherst du zu, dass diese
          Inhalte rechtmäßig sind und keine Rechte Dritter verletzen. Du
          räumst uns das nicht-exklusive, weltweite, kostenlose Recht ein,
          diese Inhalte im Rahmen der App zu verwenden und anzuzeigen.
        </p>
        <p className="mt-3">
          Wir behalten uns vor, Inhalte zu entfernen, die gegen diese
          Bedingungen oder geltendes Recht verstoßen.
        </p>
      </Section>

      <Section title="5. Premium-Abonnement">
        <p>
          AlpinChaser bietet optionale Premium-Funktionen im Rahmen eines
          Abonnements an. Das Abonnement wird über den Apple App Store
          abgewickelt und verlängert sich automatisch zum jeweils gültigen
          Preis, sofern es nicht rechtzeitig gekündigt wird.
        </p>
        <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: "#C0C0CC" }}>
          <li>
            Die Kündigung muss spätestens{" "}
            <strong style={{ color: "#F0F0F5" }}>24 Stunden vor Ablauf</strong>{" "}
            des aktuellen Abrechnungszeitraums über die Apple-Abonnementverwaltung
            erfolgen.
          </li>
          <li>
            Die Kündigung kann in den iPhone-Einstellungen unter{" "}
            <strong style={{ color: "#F0F0F5" }}>Apple ID → Abonnements</strong>{" "}
            vorgenommen werden.
          </li>
          <li>
            Nach der Kündigung bleibt der Premium-Zugang bis zum Ende des
            bezahlten Zeitraums aktiv.
          </li>
          <li>
            Rückerstattungen werden ausschließlich gemäß den Apple-Richtlinien
            gewährt.
          </li>
        </ul>
      </Section>

      <Section title="6. Änderungen der Nutzungsbedingungen">
        <p>
          Wir behalten uns vor, diese Nutzungsbedingungen jederzeit anzupassen.
          Wesentliche Änderungen werden registrierten Nutzern mitgeteilt. Die
          weitere Nutzung der App nach Inkrafttreten geänderter Bedingungen gilt
          als Zustimmung zu den neuen Bedingungen.
        </p>
        <p className="mt-3">
          Die jeweils aktuelle Version ist stets in der App und auf dieser Seite
          verfügbar.
        </p>
      </Section>

      <Section title="7. Anwendbares Recht">
        <p>
          Für diese Nutzungsbedingungen und alle Streitigkeiten im Zusammenhang
          mit der App gilt{" "}
          <strong style={{ color: "#F0F0F5" }}>österreichisches Recht</strong>{" "}
          unter Ausschluss seiner Kollisionsnormen.
        </p>
        <p className="mt-3">
          Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz des Anbieters
          in Österreich. Verbraucher können auch am allgemeinen Gerichtsstand
          klagen.
        </p>
        <p className="mt-3">
          Die EU-Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
          bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#39FF14" }}
            className="hover:opacity-70 transition-opacity"
          >
            ec.europa.eu/consumers/odr
          </a>
          . Wir sind nicht verpflichtet und nicht bereit, an einem
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
      </Section>

      <div className="mt-12 pt-8 border-t" style={{ borderColor: "#1E1E26" }}>
        <Link
          href="/"
          style={{ color: "#39FF14", fontSize: 14, letterSpacing: "0.05em" }}
          className="uppercase font-semibold hover:opacity-70 transition-opacity"
        >
          ← Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2
        className="text-lg font-bold mb-4 tracking-wide"
        style={{ color: "#39FF14" }}
      >
        {title}
      </h2>
      <div style={{ color: "#C0C0CC", lineHeight: 1.75 }}>{children}</div>
    </section>
  );
}
