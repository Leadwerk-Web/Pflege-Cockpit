# Verhinderungspflege-Rechner

## Eingaben

- Kalenderjahr und Pflegegrad (Anspruch erst ab PG 2)
- Ersatzpflege: `nah/gleicher Haushalt` oder `sonstige/erwerbsmäßig`
- Zeitraum oder Einzeltag, Abwesenheit der Pflegeperson in Stunden
- Vergütung, Fahrtkosten, Verdienstausfall und sonstige nachgewiesene Aufwendungen
- bereits aus dem gemeinsamen Jahresbetrag verbrauchte Kurzzeitpflege

„Nah“ umfasst bis zum zweiten Grad verwandte oder verschwägerte Personen sowie
Personen im selben Haushalt. Diese Einordnung wird mit Beispielen erklärt.

## Logik ab 1. Juli 2025

- Gemeinsamer Jahresbetrag: 3.539 EUR für Verhinderungs- und Kurzzeitpflege.
- Keine sechsmonatige Vorpflegezeit.
- Tageweise Verhinderung: Pflegeperson mindestens acht Stunden verhindert; maximal
  acht Wochen im Kalenderjahr; hälftige Fortzahlung des bisherigen Pflegegelds.
- Stundenweise Verhinderung: unter acht Stunden; keine Kürzung des Pflegegelds und
  keine Anrechnung auf die Acht-Wochen-Grenze.
- Sonstige Ersatzpflege: erstattungsfähig bis zum Rest des gemeinsamen Topfs.
- Nahe Ersatzpflege: Vergütung bis zum Zweifachen des monatlichen Pflegegelds;
  notwendige Fahrtkosten/Verdienstausfall zusätzlich, zusammen höchstens Resttopf.

Ausgabe: erstattungsfähige Summe nach Kategorien, Eigenanteil, verbrauchte Tage,
Pflegegeldkürzung, gemeinsamer Resttopf und vollständige Abrechnungstabelle. Die
Berechnung kann als Ausgabe in den Budget-Optimierer übernommen und als
Abrechnungsnachweis exportiert werden.

Historische Fälle vor dem 1. Juli 2025 benötigen eine getrennte, datumsabhängige
Regelversion; neue Fälle dürfen nicht mit der in der Referenz sichtbaren alten
42-Tage-/Übertragungslogik berechnet werden.
