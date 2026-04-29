import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — AlpinChaser",
  description:
    "Datenschutzerklärung der AlpinChaser App und des zugehörigen Webauftritts.",
};

export default function PrivacyPage() {
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
        Datenschutzerklärung
      </h1>
      <p className="mb-2 text-sm" style={{ color: "#6B6B7A" }}>
        für die mobile Anwendung{" "}
        <strong style={{ color: "#C0C0CC" }}>AlpinChaser</strong>
      </p>
      <p className="mb-10 text-sm" style={{ color: "#6B6B7A" }}>
        Stand: April 2026
      </p>

      <p className="mb-10" style={{ color: "#C0C0CC", lineHeight: 1.75 }}>
        Diese Datenschutzerklärung erläutert, welche personenbezogenen Daten wir
        im Zusammenhang mit der AlpinChaser-App und diesem Webauftritt
        verarbeiten, zu welchen Zwecken und auf welcher Rechtsgrundlage. Für
        die Nutzung der App gilt die jeweils hier veröffentlichte Fassung zum
        Zeitpunkt der Nutzung.
      </p>

      <Section title="1. Verantwortlicher">
        <p>Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:</p>
        <p className="mt-3">
          <strong style={{ color: "#F0F0F5" }}>Christoph Larcher</strong>
          <br />
          AlpinChaser
          <br />
          E-Mail:{" "}
          <a
            href="mailto:support@alpinchaser.com"
            style={{ color: "#39FF14" }}
            className="hover:opacity-70 transition-opacity"
          >
            support@alpinchaser.com
          </a>
        </p>
        <p className="mt-3">
          Datenschutzbezogene Anfragen und die Ausübung deiner Rechte richtest
          du bitte an die genannte E-Mail-Adresse.
        </p>
      </Section>

      <Section title="2. Erhobene Daten">
        <p>Je nach Nutzung können insbesondere folgende Daten verarbeitet werden:</p>
        <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: "#C0C0CC" }}>
          <li>
            <strong style={{ color: "#F0F0F5" }}>E-Mail-Adresse</strong> (z.&nbsp;B.
            für Registrierung, Anmeldung und Kommunikation)
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Authentifizierungsdaten</strong>{" "}
            (z.&nbsp;B. technische Kennungen der Authentifizierungsdienste,
            Sitzungsinformationen)
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Geräteinformationen</strong>{" "}
            (z.&nbsp;B. Gerätetyp, Betriebssystem und -version, App-Version)
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Nutzungsdaten</strong>{" "}
            (z.&nbsp;B. Interaktionen mit Funktionen der App, gespeicherte Inhalte
            wie Pässe oder Touren, soweit du diese in der App anlegst)
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Standortdaten</strong> — nur, wenn
            du der standortbezogenen Verarbeitung auf deinem Gerät{" "}
            <strong style={{ color: "#F0F0F5" }}>ausdrücklich zugestimmt</strong>{" "}
            hast (siehe Abschnitt 7)
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Zahlungsinformationen</strong> —{" "}
            ausschließlich über die Plattformen{" "}
            <strong style={{ color: "#F0F0F5" }}>Apple</strong> bzw.{" "}
            <strong style={{ color: "#F0F0F5" }}>Google Play</strong>; wir
            verarbeiten keine vollständigen Kreditkartendaten selbst, sondern
            erhalten ggf. Statusinformationen zu Käufen und Abonnements über den
            Abonnement-Dienstleister
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Absturzberichte</strong> und
            technische Diagnosedaten zur Fehlerbehebung und Stabilität
          </li>
        </ul>
      </Section>

      <Section title="3. Zweck der Verarbeitung">
        <p>Wir verarbeiten die Daten zu folgenden Zwecken:</p>
        <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: "#C0C0CC" }}>
          <li>Bereitstellung, Betrieb und Verbesserung der AlpinChaser-App</li>
          <li>Führung und Absicherung von Nutzerkonten sowie Authentifizierung</li>
          <li>
            Speicherung und Synchronisation deiner in der App genutzten Inhalte
          </li>
          <li>
            Verwaltung von Premium-Funktionen und Abonnements (über App-Stores
            und Abonnement-Dienstleister)
          </li>
          <li>
            Bereitstellung standortbezogener Funktionen nach Einwilligung
          </li>
          <li>
            Gewährleistung der IT-Sicherheit, Fehleranalyse und Support
          </li>
          <li>Erfüllung gesetzlicher Pflichten, soweit einschlägig</li>
        </ul>
        <p className="mt-3">
          Eine Nutzung deiner Daten zu unverhältnismäßigem Tracking oder zum
          Verkauf an Dritte zu Werbezwecken erfolgt durch uns nicht.
        </p>
      </Section>

      <Section title="4. Rechtsgrundlagen nach Art. 6 DSGVO">
        <p>
          Die Verarbeitung personenbezogener Daten stützt sich je nach
          Sachverhalt auf folgende Rechtsgrundlagen:
        </p>
        <ul className="mt-3 space-y-3 list-disc list-inside" style={{ color: "#C0C0CC" }}>
          <li>
            <strong style={{ color: "#F0F0F5" }}>
              Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung)
            </strong>
            <br />
            soweit die Verarbeitung zur Erfüllung des mit dir über die Nutzung
            der App bestehenden Vertragsverhältnisses erforderlich ist —
            insbesondere für{" "}
            <strong style={{ color: "#F0F0F5" }}>Konto</strong>,{" "}
            <strong style={{ color: "#F0F0F5" }}>App-Funktionen</strong> und{" "}
            <strong style={{ color: "#F0F0F5" }}>Abo-Verwaltung</strong>
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>
              Art. 6 Abs. 1 lit. a DSGVO (Einwilligung)
            </strong>
            <br />
            für die Verarbeitung von{" "}
            <strong style={{ color: "#F0F0F5" }}>Standortdaten</strong>, soweit
            du hierfür in den Systemeinstellungen deines Geräts eine Einwilligung
            erteilt hast; der Widerruf der Einwilligung ist jederzeit möglich
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>
              Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse)
            </strong>
            <br />
            soweit wir ein berechtigtes Interesse haben und deine Interessen
            nicht überwiegen — insbesondere für{" "}
            <strong style={{ color: "#F0F0F5" }}>Stabilität</strong> der App,{" "}
            <strong style={{ color: "#F0F0F5" }}>Fehleranalyse</strong> und{" "}
            <strong style={{ color: "#F0F0F5" }}>Missbrauchsprävention</strong>
          </li>
        </ul>
        <p className="mt-3">
          Soweit wir zur Erfüllung rechtlicher Verpflichtungen verarbeiten, kann
          Art. 6 Abs. 1 lit. c DSGVO einschlägig sein.
        </p>
      </Section>

      <Section title="5. Weitergabe an Dritte">
        <p>
          Zur Bereitstellung der App setzen wir Dienstleister ein, die ggf.
          personenbezogene Daten in unserem Auftrag verarbeiten oder als
          eigenständig Verantwortliche eingebunden sind:
        </p>
        <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: "#C0C0CC" }}>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Google Firebase</strong> — Backend-
            und Infrastrukturdienste; Datenhaltung in der Region{" "}
            <strong style={{ color: "#F0F0F5" }}>eu-west3</strong>; mit Google
            ist ein <strong style={{ color: "#F0F0F5" }}>AVV abgeschlossen</strong>.
            Datenschutz:{" "}
            <ExternalLink href="https://firebase.google.com/support/privacy">
              firebase.google.com/support/privacy
            </ExternalLink>
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>RevenueCat</strong> — Verwaltung
            von In-App-Käufen und Abonnements;{" "}
            <strong style={{ color: "#F0F0F5" }}>AVV abgeschlossen</strong>.
            Datenschutz:{" "}
            <ExternalLink href="https://www.revenuecat.com/privacy">
              revenuecat.com/privacy
            </ExternalLink>
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Apple</strong> — App-Vertrieb und
            Zahlungsabwicklung über den App Store. Datenschutz:{" "}
            <ExternalLink href="https://www.apple.com/legal/privacy">
              apple.com/legal/privacy
            </ExternalLink>
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Google Play</strong> — Verteilung
            der Android-App und Zahlungsabwicklung. Datenschutz:{" "}
            <ExternalLink href="https://policies.google.com/privacy">
              policies.google.com/privacy
            </ExternalLink>
          </li>
        </ul>
        <p className="mt-3">
          Eine weitergehende Weitergabe erfolgt nur bei gesetzlicher Verpflichtung
          oder wenn eine andere gesetzliche Grundlage vorliegt.
        </p>
      </Section>

      <Section title="6. Auftragsverarbeitung">
        <p>
          Mit Dienstleistern, die in unserem Auftrag personenbezogene Daten
          verarbeiten, haben wir — soweit erforderlich —{" "}
          <strong style={{ color: "#F0F0F5" }}>
            Auftragsverarbeitungsverträge (AVV) gemäß Art. 28 DSGVO
          </strong>{" "}
          abgeschlossen. Insbesondere mit{" "}
          <strong style={{ color: "#F0F0F5" }}>Firebase</strong> und{" "}
          <strong style={{ color: "#F0F0F5" }}>RevenueCat</strong> liegen die
          erforderlichen AVV vor.
        </p>
        <p className="mt-3">
          Auftragsverarbeiter sind vertraglich zur Einhaltung datenschutzrechtlicher
          Vorgaben und zur Umsetzung geeigneter technischer und organisatorischer
          Maßnahmen verpflichtet.
        </p>
      </Section>

      <Section title="7. Standortdaten">
        <p>
          Standortbezogene Funktionen (z.&nbsp;B. Anzeige auf der Karte) werden
          nur aktiviert, wenn du der Erfassung und Nutzung des Standorts auf
          deinem Gerät <strong style={{ color: "#F0F0F5" }}>ausdrücklich
          zugestimmt</strong> hast. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO
          i. V. m. Art. 7 DSGVO.
        </p>
        <p className="mt-3">
          Standortdaten werden von uns{" "}
          <strong style={{ color: "#F0F0F5" }}>nicht dauerhaft gespeichert</strong>.
          Sie dienen der unmittelbaren Darstellung bzw. der damit verbundenen
          App-Funktion. Du kannst die Standortfreigabe jederzeit in den
          Einstellungen deines Betriebssystems widerrufen; dadurch können
          standortabhängige Funktionen entfallen.
        </p>
      </Section>

      <Section title="8. Datensicherheit">
        <p>
          Wir setzen angemessene technische und organisatorische Maßnahmen ein,
          um deine Daten zu schützen. Dazu gehören insbesondere:
        </p>
        <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: "#C0C0CC" }}>
          <li>
            Verschlüsselte Übertragung über{" "}
            <strong style={{ color: "#F0F0F5" }}>HTTPS/TLS</strong>
          </li>
          <li>
            Speicherung und Verarbeitung über{" "}
            <strong style={{ color: "#F0F0F5" }}>Firebase</strong> mit
            Verschlüsselungsmechanismen des Anbieters in{" "}
            <strong style={{ color: "#F0F0F5" }}>Rechenzentren in der EU</strong>{" "}
            (konfigurierte Region eu-west3)
          </li>
        </ul>
        <p className="mt-3">
          Ein absolutes Sicherheitsniveau kann im Internet nicht garantiert
          werden; wir streben jedoch ein dem Stand der Technik angemessenes
          Schutzniveau an.
        </p>
      </Section>

      <Section title="9. Speicherdauer">
        <ul className="mt-0 space-y-2 list-disc list-inside" style={{ color: "#C0C0CC" }}>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Kontodaten:</strong> bis zur
            Löschung deines Kontos bzw. bis zur vollständigen Abwicklung einer
            von dir verlangten Löschung, vorbehaltlich gesetzlicher
            Aufbewahrungspflichten
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Server-Logs:</strong> in der Regel
            höchstens <strong style={{ color: "#F0F0F5" }}>90 Tage</strong>
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Backups:</strong> in der Regel
            höchstens <strong style={{ color: "#F0F0F5" }}>180 Tage</strong>, danach
            Überschreibung bzw. Rotation, soweit keine längere Pflicht besteht
          </li>
        </ul>
      </Section>

      <Section title="10. KI-unterstützte Inhalte">
        <p>
          <strong style={{ color: "#F0F0F5" }}>Bildmaterial</strong> und{" "}
          <strong style={{ color: "#F0F0F5" }}>Beschreibungen</strong> in der App
          oder im Angebot können teilweise mit Unterstützung von{" "}
          <strong style={{ color: "#F0F0F5" }}>KI</strong> erstellt oder bearbeitet
          worden sein.
        </p>
        <p className="mt-3">
          Dabei übermitteln wir{" "}
          <strong style={{ color: "#F0F0F5" }}>
            keine personenbezogenen Daten
          </strong>{" "}
          an KI-Systeme zur Verarbeitung. Bitte beachte, dass KI-generierte oder
          KI-unterstützte Inhalte{" "}
          <strong style={{ color: "#F0F0F5" }}>unvollständig</strong>, vereinfacht
          oder sachlich ungenau sein können; sie ersetzen keine eigene Prüfung
          vor Ort oder fachliche Beratung.
        </p>
      </Section>

      <Section title="11. Minderjährige">
        <p>
          Die App richtet sich nicht an Personen unter{" "}
          <strong style={{ color: "#F0F0F5" }}>16 Jahren</strong>. Wir erheben
          wissentlich keine Daten von Minderjährigen unter diesem Alter. Solltest
          du dennoch annehmen, dass ein Kind uns Daten übermittelt hat, kontaktiere
          uns unter{" "}
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

      <Section title="12. Betroffenenrechte">
        <p>Dir stehen — vorbehaltlich der gesetzlichen Voraussetzungen — zu:</p>
        <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: "#C0C0CC" }}>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Art. 15 DSGVO</strong> — Auskunft
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Art. 16 DSGVO</strong> — Berichtigung
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Art. 17 DSGVO</strong> — Löschung
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Art. 18 DSGVO</strong> —
            Einschränkung der Verarbeitung
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Art. 20 DSGVO</strong> —
            Datenübertragbarkeit
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Art. 21 DSGVO</strong> — Widerspruch
          </li>
        </ul>
        <p className="mt-3">
          Außerdem hast du das Recht, dich bei einer Datenschutzaufsichtsbehörde zu
          beschweren. Für Österreich ist die{" "}
          <strong style={{ color: "#F0F0F5" }}>
            österreichische Datenschutzbehörde
          </strong>{" "}
          zuständig:{" "}
          <ExternalLink href="https://www.dsb.gv.at/">dsb.gv.at</ExternalLink>
        </p>
        <p className="mt-3">
          Zur Ausübung deiner Rechte:{" "}
          <a
            href="mailto:support@alpinchaser.com"
            style={{ color: "#39FF14" }}
            className="hover:opacity-70 transition-opacity"
          >
            support@alpinchaser.com
          </a>
        </p>
      </Section>

      <Section title="13. Konto löschen">
        <p>Du kannst die Löschung deines Kontos veranlassen:</p>
        <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: "#C0C0CC" }}>
          <li>
            <strong style={{ color: "#F0F0F5" }}>in der App</strong> unter den
            dafür vorgesehenen <strong style={{ color: "#F0F0F5" }}>Einstellungen</strong>
            , sofern die Funktion angeboten wird, oder
          </li>
          <li>
            per E-Mail an{" "}
            <a
              href="mailto:support@alpinchaser.com"
              style={{ color: "#39FF14" }}
              className="hover:opacity-70 transition-opacity"
            >
              support@alpinchaser.com
            </a>
          </li>
        </ul>
        <p className="mt-3">
          Nach Eingang einer wirksamen Löschungsanfrage werden die
          personenbezogenen Daten im Regelfall{" "}
          <strong style={{ color: "#F0F0F5" }}>binnen 30 Tagen</strong> gelöscht
          oder anonymisiert, soweit keine gesetzlichen Aufbewahrungspflichten
          entgegenstehen. Daten in Backups können gemäß Abschnitt 9 noch für die
          dort genannte Dauer technisch mitenthalten sein.
        </p>
      </Section>

      <Section title="14. Cookies">
        <p>
          Diese Website verwendet{" "}
          <strong style={{ color: "#F0F0F5" }}>keine Tracking-Cookies</strong>.
          Es können ausschließlich{" "}
          <strong style={{ color: "#F0F0F5" }}>
            technisch notwendige Session-Cookies
          </strong>{" "}
          oder vergleichbare Technologien zum Betrieb der Seite (z.&nbsp;B.
          Sitzungsverwaltung) zum Einsatz kommen.
        </p>
      </Section>

      <Section title="15. Änderungen">
        <p>
          Wir können diese Datenschutzerklärung anpassen, wenn sich Rechtslage,
          unsere Dienste oder eingesetzte Technik ändern. Die aktuelle Fassung
          ist auf dieser Seite abrufbar. Bei{" "}
          <strong style={{ color: "#F0F0F5" }}>wesentlichen Änderungen</strong>{" "}
          informieren wir registrierte Nutzer in geeigneter Weise (z.&nbsp;B. in
          der App oder per E-Mail), soweit dies gesetzlich oder vertraglich
          erforderlich ist.
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

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "#39FF14" }}
      className="hover:opacity-70 transition-opacity"
    >
      {children}
    </a>
  );
}
