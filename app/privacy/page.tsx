import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — AlpinChaser",
  description: "Datenschutzerklärung der AlpinChaser App.",
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
      <p className="mb-10 text-sm" style={{ color: "#6B6B7A" }}>
        Stand: April 2026
      </p>

      <Section title="1. Verantwortlicher">
        <p>
          Verantwortlicher im Sinne der DSGVO ist:
        </p>
        <p className="mt-3">
          Christoph Larcher
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
      </Section>

      <Section title="2. Welche Daten wir erheben">
        <p>Beim Verwenden der App können folgende Daten verarbeitet werden:</p>
        <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: "#C0C0CC" }}>
          <li>E-Mail-Adresse und Authentifizierungsdaten (bei Registrierung)</li>
          <li>Geräteinformationen (Betriebssystem, App-Version)</li>
          <li>Nutzungsdaten (aufgerufene Pässe, gespeicherte Routen)</li>
          <li>Standortdaten (nur bei ausdrücklicher Zustimmung, siehe Abschnitt 5)</li>
          <li>Zahlungsinformationen (ausschließlich über Apple In-App-Kauf, nicht direkt von uns verarbeitet)</li>
          <li>Anonymisierte Absturz- und Fehlerberichte</li>
        </ul>
      </Section>

      <Section title="3. Wofür wir die Daten nutzen">
        <p>Wir verwenden deine Daten ausschließlich für folgende Zwecke:</p>
        <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: "#C0C0CC" }}>
          <li>Bereitstellung und Verbesserung der App-Funktionen</li>
          <li>Verwaltung deines Nutzerkontos und deiner gespeicherten Pässe</li>
          <li>Verwaltung deines Premium-Abonnements</li>
          <li>Behebung von Fehlern und technischen Problemen</li>
          <li>Kommunikation bei Support-Anfragen</li>
        </ul>
        <p className="mt-3">
          Wir verkaufen deine Daten nicht und nutzen sie nicht für Werbezwecke.
        </p>
      </Section>

      <Section title="4. Weitergabe an Dritte">
        <p>
          Zur Bereitstellung der App setzen wir folgende Drittanbieter ein, die
          möglicherweise Zugriff auf personenbezogene Daten haben:
        </p>
        <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: "#C0C0CC" }}>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Google Firebase</strong> (Firestore, Authentication) —
            Datenspeicherung in der Region <strong style={{ color: "#F0F0F5" }}>eu-west3 (Frankfurt)</strong>.
            Datenschutzrichtlinie:{" "}
            <ExternalLink href="https://firebase.google.com/support/privacy">
              firebase.google.com/support/privacy
            </ExternalLink>
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>RevenueCat</strong> — Verwaltung von
            In-App-Käufen und Abonnements. Datenschutzrichtlinie:{" "}
            <ExternalLink href="https://www.revenuecat.com/privacy">
              revenuecat.com/privacy
            </ExternalLink>
          </li>
          <li>
            <strong style={{ color: "#F0F0F5" }}>Apple</strong> — Verarbeitung von
            In-App-Käufen über den App Store. Datenschutzrichtlinie:{" "}
            <ExternalLink href="https://www.apple.com/legal/privacy">
              apple.com/legal/privacy
            </ExternalLink>
          </li>
        </ul>
        <p className="mt-3">
          Eine Weitergabe an weitere Dritte erfolgt nur, wenn wir gesetzlich dazu
          verpflichtet sind.
        </p>
      </Section>

      <Section title="5. Standortdaten">
        <p>
          Die App kann deinen Standort verwenden, um deine Position auf der
          Karte anzuzeigen. Der Zugriff erfolgt nur, wenn du der Standortnutzung
          in den Systemeinstellungen deines Geräts ausdrücklich zugestimmt hast.
        </p>
        <p className="mt-3">
          Standortdaten werden nicht dauerhaft gespeichert und nicht an Dritte
          weitergegeben. Du kannst den Standortzugriff jederzeit in den
          Einstellungen deines Geräts widerrufen.
        </p>
      </Section>

      <Section title="6. Datensicherheit">
        <p>
          Wir setzen technische und organisatorische Maßnahmen ein, um deine
          Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu schützen.
          Die Übertragung erfolgt verschlüsselt über HTTPS/TLS. Firebase
          speichert Daten verschlüsselt in europäischen Rechenzentren.
        </p>
        <p className="mt-3">
          Trotz sorgfältiger Maßnahmen kann keine absolute Sicherheit bei der
          Datenübertragung über das Internet garantiert werden.
        </p>
      </Section>

      <Section title="7. Deine Rechte">
        <p>
          Du hast gemäß DSGVO folgende Rechte bezüglich deiner
          personenbezogenen Daten:
        </p>
        <ul className="mt-3 space-y-2 list-disc list-inside" style={{ color: "#C0C0CC" }}>
          <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
          <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
          <li>Recht auf Löschung (Art. 17 DSGVO)</li>
          <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
          <li>Beschwerderecht bei der zuständigen Datenschutzbehörde</li>
        </ul>
        <p className="mt-3">
          Zur Ausübung deiner Rechte wende dich an:{" "}
          <a
            href="mailto:support@alpinchaser.com"
            style={{ color: "#39FF14" }}
            className="hover:opacity-70 transition-opacity"
          >
            support@alpinchaser.com
          </a>
        </p>
      </Section>

      <Section title="8. Konto löschen">
        <p>
          Du kannst dein Konto und alle damit verbundenen Daten jederzeit
          löschen. Die Löschung kann direkt in der App unter{" "}
          <strong style={{ color: "#F0F0F5" }}>Einstellungen → Konto löschen</strong>{" "}
          vorgenommen werden oder per E-Mail-Anfrage an{" "}
          <a
            href="mailto:support@alpinchaser.com"
            style={{ color: "#39FF14" }}
            className="hover:opacity-70 transition-opacity"
          >
            support@alpinchaser.com
          </a>
          .
        </p>
        <p className="mt-3">
          Nach der Löschung werden alle personenbezogenen Daten innerhalb von
          30 Tagen unwiderruflich entfernt. Anonymisierte, nicht
          personenbezogene Nutzungsstatistiken können weiterhin gespeichert
          bleiben.
        </p>
      </Section>

      <Section title="9. Änderungen dieser Datenschutzerklärung">
        <p>
          Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf
          anzupassen, etwa bei Änderungen der App oder neuen gesetzlichen
          Anforderungen. Die aktuelle Version ist stets in der App und auf
          dieser Seite verfügbar. Bei wesentlichen Änderungen werden registrierte
          Nutzer informiert.
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
