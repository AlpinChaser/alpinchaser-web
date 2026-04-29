import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nutzungsbedingungen — AlpinChaser",
  description: "Nutzungsbedingungen der AlpinChaser App und Website.",
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

      <p className="mb-10" style={{ color: "#C0C0CC", lineHeight: 1.75 }}>
        Mit Installation, Registrierung oder Nutzung der mobilen Anwendung
        AlpinChaser sowie des Webauftritts erklärst du dich mit diesen
        Nutzungsbedingungen einverstanden. Widersprichst du ihnen, darfst du die
        App und die Website nicht nutzen.
      </p>

      <Section title="1. Geltungsbereich">
        <p>
          Diese Nutzungsbedingungen gelten für die mobile Anwendung{" "}
          <strong style={{ color: "#F0F0F5" }}>AlpinChaser</strong> sowie die
          zugehörige <strong style={{ color: "#F0F0F5" }}>Website</strong>{" "}
          (alpinchaser.com und Unterseiten), soweit dort nicht abweichendes
          Recht gilt.
        </p>
        <p className="mt-3">
          Anbieter und Vertragspartner ist{" "}
          <strong style={{ color: "#F0F0F5" }}>Christoph Larcher</strong>. Kontakt:{" "}
          <a
            href="mailto:support@alpinchaser.com"
            style={{ color: "#39FF14" }}
            className="hover:opacity-70 transition-opacity"
          >
            support@alpinchaser.com
          </a>
        </p>
      </Section>

      <Section title="2. Nutzung der App">
        <p>
          Die App und die Website dürfen ausschließlich zu{" "}
          <strong style={{ color: "#F0F0F5" }}>privaten, nicht-kommerziellen</strong>{" "}
          Zwecken genutzt werden.
        </p>
        <p className="mt-3">Untersagt ist insbesondere:</p>
        <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: "#C0C0CC" }}>
          <li>
            jede <strong style={{ color: "#F0F0F5" }}>kommerzielle</strong> Nutzung,
            Weiterverwertung oder Vermarktung von App-, Karten- oder Datenbeständen
            ohne vorherige schriftliche Zustimmung
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Reverse Engineering</strong>,{" "}
            Dekompilierung, Entschlüsselung, Umgehung technischer Schutzmaßnahmen
            oder sonstige Manipulation des Programmcodes oder der APIs
          </li>
          <li>
            automatisiertes oder systematisches Auslesen von Daten (
            <strong style={{ color: "#F0F0F5" }}>Scraping</strong>, Crawling),
            soweit nicht ausdrücklich erlaubt
          </li>
          <li>
            das Bereitstellen oder Verbreiten von{" "}
            <strong style={{ color: "#F0F0F5" }}>rechtswidrigen</strong>, diffamierenden,
            diskriminierenden oder sonst rechts- oder sittenwidrigen Inhalten
          </li>
          <li>
            Nutzungshandlungen, die den sicheren oder störungsfreien Betrieb der
            Dienste beeinträchtigen oder andere Nutzer unzumutbar belasten
          </li>
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
            AlpinChaser dient der Information und Planung rund um Alpenpässe.{" "}
            <strong style={{ color: "#F0F0F5" }}>
              Du fährst stets auf eigene Gefahr
            </strong>
            . Angaben in der App (z.&nbsp;B. zu Strecken, Öffnungszeiten,
            Passierbarkeit, Höhenlagen, touristischen Beschreibungen) können{" "}
            <strong style={{ color: "#F0F0F5" }}>veraltet, unvollständig oder fehlerhaft</strong>{" "}
            sein.
          </p>
          <p className="mt-2" style={{ color: "#C0C0CC" }}>
            <strong style={{ color: "#F0F0F5" }}>
              Wir haften nicht für Unfälle, Personen- oder Sachschäden,
              Gesundheitsschäden oder sonstige Nachteile
            </strong>
            , die im Zusammenhang mit der Nutzung der App, der Website oder dem
            Vertrauen auf die dargestellten Informationen entstehen — unabhängig
            von Straßenzustand, Wetter, Sperren oder Verkehrsführung.
          </p>
          <p className="mt-2" style={{ color: "#C0C0CC" }}>
            Die App{" "}
            <strong style={{ color: "#F0F0F5" }}>
              ersetzt keine amtlichen Verkehrs- oder Wetterinformationen
            </strong>{" "}
            und keine behördlichen Verlautbarungen.{" "}
            <strong style={{ color: "#F0F0F5" }}>
              Maßgeblich sind stets die örtlichen Verkehrszeichen, Wegweisungen
              und behördlichen Anordnungen
            </strong>{" "}
            vor Ort.
          </p>
        </div>
        <p>
          Im übrigen gelten gesetzliche Haftungsbeschränkungen. Eine Haftung für
          leichte Fahrlässigkeit, mittelbare Schäden oder entgangenen Gewinn ist
          ausgeschlossen, soweit dem nicht zwingendes Recht entgegensteht.
        </p>
      </Section>

      <Section title="4. KI-unterstützte Inhalte">
        <p>
          Bestimmte <strong style={{ color: "#F0F0F5" }}>Beschreibungen</strong> und{" "}
          <strong style={{ color: "#F0F0F5" }}>Bildmaterial</strong> können mit
          Unterstützung von KI-Systemen erstellt oder bearbeitet worden sein.
        </p>
        <p className="mt-3">
          Solche Inhalte stellen{" "}
          <strong style={{ color: "#F0F0F5" }}>
            keine verbindlichen, behördlichen oder amtlichen Informationen
          </strong>{" "}
          dar. Trotz sorgfältiger redaktioneller Prüfung können sie{" "}
          <strong style={{ color: "#F0F0F5" }}>Fehler, Ungenauigkeiten oder Lücken</strong>{" "}
          enthalten. Du hast eigenverantwortlich vor jeder Fahrt die aktuelle
          Lage vor Ort zu klären.
        </p>
      </Section>

      <Section title="5. Verfügbarkeit">
        <p>
          Ein Anspruch auf <strong style={{ color: "#F0F0F5" }}>ununterbrochenen</strong>{" "}
          oder fehlerfreien Betrieb der App oder der Website besteht nicht.
          Wartungsarbeiten, Updates, technische Störungen, Ausfälle von
          Drittanbietern (z.&nbsp;B. Hosting, App-Stores) oder höhere Gewalt
          können zu zeitweisen Einschränkungen oder Ausfällen führen.
        </p>
      </Section>

      <Section title="6. Nutzerinhalte">
        <p>
          Sofern die App Funktionen für{" "}
          <strong style={{ color: "#F0F0F5" }}>Bewertungen, Kommentare</strong> oder
          vergleichbare Nutzerinhalte bietet, versicherst du, dass deine
          Eingaben <strong style={{ color: "#F0F0F5" }}>rechtmäßig</strong> sind,
          wahrheitsgemäß im Rahmen deiner Kenntnis bleiben und keine Rechte
          Dritter (z.&nbsp;B. Urheber-, Marken-, Persönlichkeitsrechte) verletzen.
        </p>
        <p className="mt-3">
          Du räumst uns ein{" "}
          <strong style={{ color: "#F0F0F5" }}>
            einfaches, nicht-exklusives, zeitlich und räumlich unbeschränktes
            Nutzungsrecht
          </strong>{" "}
          ein, diese Inhalte im Rahmen von AlpinChaser zu speichern, anzuzeigen,
          zu bearbeiten (z.&nbsp;B. Formatierung) und technisch für den Betrieb
          der Dienste zu vervielfältigen.
        </p>
        <p className="mt-3">
          Wir können Nutzerinhalte{" "}
          <strong style={{ color: "#F0F0F5" }}>entfernen oder sperren</strong>, wenn
          ein Verstoß gegen diese Bedingungen, gegen geltendes Recht oder gegen
          berechtigte Interessen anderer Nutzer oder Dritter vorliegt.
        </p>
      </Section>

      <Section title="7. Premium-Abonnement (iOS)">
        <p>
          Premium-Funktionen können über ein kostenpflichtiges Abonnement im{" "}
          <strong style={{ color: "#F0F0F5" }}>Apple App Store</strong> erworben
          werden. Das Abonnement{" "}
          <strong style={{ color: "#F0F0F5" }}>verlängert sich automatisch</strong>{" "}
          zum jeweils gültigen Preis und der gewählten Laufzeit, sofern es nicht
          fristgerecht gekündigt wird.
        </p>
        <p className="mt-3">
          Die <strong style={{ color: "#F0F0F5" }}>Kündigung</strong> erfolgt durch
          dich spätestens{" "}
          <strong style={{ color: "#F0F0F5" }}>24 Stunden vor Ablauf</strong> des
          laufenden Abrechnungszeitraums über die{" "}
          <strong style={{ color: "#F0F0F5" }}>Apple-ID-Einstellungen</strong>{" "}
          (Abonnements / Subscriptions). Nach Kündigung bleibt der Premium-Zugang
          bis zum Ende des bereits bezahlten Zeitraums bestehen.
        </p>
        <p className="mt-3">
          <strong style={{ color: "#F0F0F5" }}>Rückerstattungen</strong> richten sich
          ausschließlich nach den jeweils geltenden{" "}
          <strong style={{ color: "#F0F0F5" }}>Apple-Richtlinien</strong>; wir sind
          hierzu nicht vertraglich verpflichtet, soweit Apple als
          Zahlungsabwickler auftritt.
        </p>
      </Section>

      <Section title="8. Premium-Abonnement (Android)">
        <p>
          Premium-Funktionen können über ein kostenpflichtiges Abonnement über{" "}
          <strong style={{ color: "#F0F0F5" }}>Google Play</strong> erworben
          werden. Das Abonnement{" "}
          <strong style={{ color: "#F0F0F5" }}>verlängert sich automatisch</strong>,
          sofern es nicht über Google Play gekündigt wird.
        </p>
        <p className="mt-3">
          Die <strong style={{ color: "#F0F0F5" }}>Kündigung</strong> nimmst du in den
          Google-Play-Kontoeinstellungen unter Abonnements vor. Es gelten die
          Bedingungen und Fristen von Google.
        </p>
        <p className="mt-3">
          <strong style={{ color: "#F0F0F5" }}>Rückerstattungen</strong> richten sich
          ausschließlich nach den jeweils geltenden{" "}
          <strong style={{ color: "#F0F0F5" }}>Google-Richtlinien</strong>.
        </p>
      </Section>

      <Section title="9. Lifetime-Kauf">
        <p>
          Sofern angeboten, kann ein <strong style={{ color: "#F0F0F5" }}>Lifetime-Kauf</strong>{" "}
          als <strong style={{ color: "#F0F0F5" }}>einmaliger Kauf</strong> ohne
          laufende Abonnementgebühr erworben werden. Es handelt sich nicht um ein
          Abonnement im Sinne der Abschnitte 7 und 8.
        </p>
        <p className="mt-3">
          Bei digitalen Inhalten, die nicht auf einem körperlichen Datenträger
          bereitgestellt werden, entfällt das gesetzliche{" "}
          <strong style={{ color: "#F0F0F5" }}>Widerrufsrecht</strong>, wenn du
          ausdrücklich zugestimmt hast, dass mit der Ausführung des Vertrags{" "}
          <strong style={{ color: "#F0F0F5" }}>sofort begonnen wird</strong>, und du
          deine Kenntnis davon bestätigt hast, dass du dadurch dein Widerrufsrecht
          verlierst (vgl. Art. 16 Abs. 1 lit. m i. V. m. Art. 11 Abs. 1 lit. 2
          FAGG i. V. m. Art. 18 Abs. 1 Z. 11 FAGG für Verbraucher in Österreich).
        </p>
        <p className="mt-3">
          Mit Abschluss eines Lifetime-Kaufs erklärst du dich{" "}
          <strong style={{ color: "#F0F0F5" }}>ausdrücklich damit einverstanden</strong>,
          dass die Bereitstellung der gekauften digitalen Premium-Funktionen{" "}
          <strong style={{ color: "#F0F0F5" }}>unverzüglich beginnt</strong>.
        </p>
      </Section>

      <Section title="10. Widerrufsrecht (digitale Inhalte / Abo)">
        <p>
          Für Verbraucher in der EU kann ein Widerrufsrecht für Fernabsatzverträge
          bestehen. Bei <strong style={{ color: "#F0F0F5" }}>digitalen Inhalten</strong>{" "}
          erlischt das Widerrufsrecht, wenn du ausdrücklich verlangt hast, dass
          die Ausführung vor Ende der Widerrufsfrist beginnt, und du bestätigt
          hast, dein Widerrufsrecht bei vollständiger Vertragserfüllung durch uns
          zu verlieren.
        </p>
        <p className="mt-3">
          Durch den Kauf eines Premium-Abonnements oder vergleichbarer digitaler
          Leistungen erklärst du,{" "}
          <strong style={{ color: "#F0F0F5" }}>
            ausdrücklich zuzustimmen, dass die Premium-Funktionen sofort
            bereitgestellt werden
          </strong>
          . Mit Beginn der Bereitstellung kann das Widerrufsrecht entfallen,
          soweit gesetzlich zulässig. Abrechnung und ggf. gesonderte
          Widerrufsbelehrungen der App-Stores (Apple / Google) bleiben vorbehalten.
        </p>
      </Section>

      <Section title="11. Kein kostenloser Testzeitraum">
        <p>
          Sofern beim jeweiligen Produkt in den App-Stores oder in der App{" "}
          <strong style={{ color: "#F0F0F5" }}>nicht ausdrücklich</strong> etwas
          anderes angegeben ist, beinhaltet das Abonnement{" "}
          <strong style={{ color: "#F0F0F5" }}>keine kostenlose Testphase</strong>.
        </p>
      </Section>

      <Section title="12. Kontosperrung">
        <p>
          Wir können Nutzerkonten bei schwerwiegenden oder wiederholten{" "}
          <strong style={{ color: "#F0F0F5" }}>Verstößen gegen diese Bedingungen</strong>,
          gegen geltendes Recht oder zum Schutz anderer Nutzer und Systeme{" "}
          <strong style={{ color: "#F0F0F5" }}>sperren oder löschen</strong>. Eine
          vorherige Abmahnung erfolgt nur, soweit gesetzlich erforderlich oder
          zumutbar.
        </p>
      </Section>

      <Section title="13. Urheberrecht">
        <p>
          Sämtliche Inhalte von AlpinChaser — einschließlich der{" "}
          <strong style={{ color: "#F0F0F5" }}>Pass-Daten</strong>,{" "}
          <strong style={{ color: "#F0F0F5" }}>Polylinien</strong>, Texte,{" "}
          <strong style={{ color: "#F0F0F5" }}>Beschreibungen</strong>, Grafiken,
          Software, Datenbanken und sonstiger Elemente der App und Website — sind
          urheberrechtlich geschützt oder unterliegen sonstigen Schutzrechten.
        </p>
        <p className="mt-3">
          Eine <strong style={{ color: "#F0F0F5" }}>Weitergabe, Vervielfältigung,
          öffentliche Zugänglichmachung oder gewerbliche Nutzung</strong> ohne
          unsere vorherige <strong style={{ color: "#F0F0F5" }}>schriftliche
          Zustimmung</strong> ist untersagt. Die bloße Nutzung im Rahmen dieser
          Bedingungen bleibt unberührt.
        </p>
      </Section>

      <Section title="14. Änderungen der Nutzungsbedingungen">
        <p>
          Wir behalten uns vor, diese Nutzungsbedingungen zu ändern, wenn sich
          unsere Leistungen, die Rechtslage oder technische Rahmenbedingungen
          ändern. Bei <strong style={{ color: "#F0F0F5" }}>wesentlichen Änderungen</strong>{" "}
          informieren wir registrierte Nutzer in geeigneter Form (z.&nbsp;B. in
          der App oder per E-Mail), soweit erforderlich.
        </p>
        <p className="mt-3">
          Die jeweils aktuelle Fassung ist in der App und auf dieser Seite
          abrufbar. Die <strong style={{ color: "#F0F0F5" }}>weitere Nutzung</strong>{" "}
          nach Mitteilung oder nach Bereitstellung der neuen Fassung gilt — soweit
          gesetzlich zulässig — als{" "}
          <strong style={{ color: "#F0F0F5" }}>Zustimmung</strong> zu den geänderten
          Bedingungen. Widersprichst du wesentlichen Änderungen, endet dein
          Nutzungsrecht; gesetzliche Rechte bleiben unberührt.
        </p>
      </Section>

      <Section title="15. Anwendbares Recht">
        <p>
          Es gilt <strong style={{ color: "#F0F0F5" }}>österreichisches Recht</strong>{" "}
          unter Ausschluss der Kollisionsnormen des internationalen Privatrechts,
          soweit zwingendes Verbraucherschutzrecht des Staates, in dem du deinen
          gewöhnlichen Aufenthalt hast, Vorrang behält.
        </p>
        <p className="mt-3">
          <strong style={{ color: "#F0F0F5" }}>Gerichtsstand</strong> für alle
          Streitigkeiten aus oder im Zusammenhang mit diesen Bedingungen ist —
          soweit gesetzlich zulässig —{" "}
          <strong style={{ color: "#F0F0F5" }}>Österreich</strong>. Zwingende
          Gerichtsstände für Verbraucher bleiben unberührt.
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
          . Wir sind <strong style={{ color: "#F0F0F5" }}>nicht verpflichtet</strong>{" "}
          und <strong style={{ color: "#F0F0F5" }}>nicht bereit</strong>, an einem
          Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
          teilzunehmen.
        </p>
        <p className="mt-3" style={{ color: "#6B6B7A" }}>
          Stand: April 2026
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
