# Gemeinsame Domäne

## Aktiver Fall

Alle Rechner arbeiten auf genau einer `careRecipientId`. Ein dauerhaft sichtbarer
Fallumschalter zeigt Name und Pflegegrad. Fehlt ein Fall, öffnet „Person anlegen“
direkt das Stammdatenformular; es gibt kein Onboarding.

### Pflegebedürftige Person

Pflichtfelder: Vorname, Nachname, Geburtsdatum. Optional: Geschlecht/divers/keine
Angabe, Anschrift, Telefon, E-Mail, Kranken-/Pflegekasse, Versichertennummer,
Pflegegrad 0–5, Datum der Einstufung. Geburtsdatum darf nicht in der Zukunft liegen;
Versichertennummer wird als Text behandelt und nicht numerisch normalisiert.

### Kontakt und Dienstleister

Kontakt: Rolle, Name, Beziehung, Kontaktdaten, Anschrift, Zuordnung zu einem oder
mehreren Fällen. Dienstleister: Typ, Firma, Abteilung, Kontaktperson, Telefon,
E-Mail, Website und Anschrift. Typen: Alltagsbegleitung, Betreuungsdienst,
Pflegedienst, Ergo-/Physiotherapie, Haus-/Facharzt, Haushaltshilfe,
Kurzzeitpflege, Pflegeberatung, Tagespflege, Versicherung, §45a-Anbieter, sonstige.

## Versionierte Leistungstabelle

Gültig ab 1. Januar 2025, sofern nicht anders angegeben:

| Leistung | PG 1 | PG 2 | PG 3 | PG 4 | PG 5 | Periode |
|---|---:|---:|---:|---:|---:|---|
| Pflegegeld | 0 | 347 | 599 | 800 | 990 | Monat |
| Pflegesachleistung | 0 | 796 | 1.497 | 1.859 | 2.299 | Monat |
| Tages-/Nachtpflege | 0 | 721 | 1.357 | 1.685 | 2.085 | Monat |
| Entlastungsbetrag | 131 | 131 | 131 | 131 | 131 | Monat |
| Verbrauchspflegehilfsmittel | 42 | 42 | 42 | 42 | 42 | Monat |
| Wohnumfeldverbesserung | 4.180 | 4.180 | 4.180 | 4.180 | 4.180 | Maßnahme |

Ab 1. Juli 2025 gilt bei PG 2–5 zusätzlich ein gemeinsamer Jahresbetrag für
Verhinderungs- und Kurzzeitpflege von 3.539 EUR. Für nahe Angehörige oder Personen
im selben Haushalt ist die reine Ersatzpflegevergütung grundsätzlich auf das
Doppelte des monatlichen Pflegegelds begrenzt; nachgewiesene Fahrtkosten und
Verdienstausfall können bis zum verbleibenden gemeinsamen Jahresbetrag hinzukommen.

## Datenobjekte

- `Assessment`: Fall, Stichtag, Regelversion, Antworten, Roh-/Gewichtspunkte,
  Pflegegrad, Status Entwurf/abgeschlossen.
- `BudgetYear`: Fall, Kalenderjahr, Pflegegrad, Anfangssalden, Monatspläne,
  Ist-Ausgaben und Regelversion.
- `Expense`: Leistungsart, Datum/Zeitraum, Betrag, Anbieter/Person, Notiz, Beleg.
- `ApplicationDocument`: Typ, Fall, Erstellzeit, Formulardaten, Regelversion, Datei.
- `StoredDocument`: Fall, Kategorie, Dateiname, MIME-Typ, Größe, Datum, Tags, Notiz.

## Querschnittsvalidierung

- Geld: mindestens 0, maximal 999.999,99 EUR je Eingabe.
- Prozent: 0–100; Tage: ganzzahlig und innerhalb des Kalenderjahres.
- Beginn darf nicht nach Ende liegen; ein Zeitraum muss im gewählten Budgetjahr
  liegen oder eindeutig auf Jahre aufgeteilt werden.
- Ein Löschvorgang verlangt Bestätigung. Rechnerstände und Dokumente sind danach
  aus dem UI entfernt; die technische Aufbewahrung richtet sich nach dem späteren
  Datenschutzkonzept.
- Änderungen mit Auswirkung auf ein Ergebnis markieren es als „neu berechnen“.
