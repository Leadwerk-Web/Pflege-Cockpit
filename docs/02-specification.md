# Phase 2 – funktionale Spezifikation

Stand: 28. September 2026
Status: implementierungsbereit, fachliche Konstanten vor Release erneut prüfen

## Ziel und Scope

Das Pflege-Cockpit bildet die Rechner der Referenzanwendung und deren unmittelbar
benötigtes Umfeld ab. Es ist keine Kopie von Registrierung oder Vermarktung.

Enthalten:

1. Dashboard und Auswahl der aktiven pflegebedürftigen Person
2. Pflegenetzwerk mit Personen, Versicherungs- und Dienstleisterdaten
3. Pflegegrad-Rechner einschließlich der nicht gewichteten Module 7 und 8
4. Pflegebudget-Optimierer
5. Verhinderungspflege-Rechner
6. Nachbarschaftshilfe-Rechner
7. Antrags-Generator
8. Pflege-Dokumente

Nicht enthalten:

- Registrierung, Login-Wiederherstellung und E-Mail-Verifizierung
- Onboarding und Testdaten-Schnellstart
- Community, Hilfe-/Feedback-Widget und Pflegebox-Bestellstrecke
- Abonnement, Bezahlschranke und künstliche Funktionssperren

## Dokumente

| Bereich | Spezifikation |
|---|---|
| Gemeinsame Daten und Regeln | [shared-domain.md](tools/shared-domain.md) |
| Dashboard | [dashboard.md](tools/dashboard.md) |
| Pflegenetzwerk | [pflegenetzwerk.md](tools/pflegenetzwerk.md) |
| Pflegegrad | [pflegegrad-rechner.md](tools/pflegegrad-rechner.md) |
| Pflegebudget | [pflegebudget-optimierer.md](tools/pflegebudget-optimierer.md) |
| Verhinderungspflege | [verhinderungspflege.md](tools/verhinderungspflege.md) |
| Nachbarschaftshilfe | [nachbarschaftshilfe.md](tools/nachbarschaftshilfe.md) |
| Anträge | [antrags-generator.md](tools/antrags-generator.md) |
| Dokumentablage | [pflege-dokumente.md](tools/pflege-dokumente.md) |
| Abnahmetests | [acceptance-tests.md](acceptance-tests.md) |

## Produktregeln

- Die Anwendung startet ohne Benutzerkonto direkt im Dashboard. Stammdaten werden
  lokal beziehungsweise in der später festgelegten Projekt-Datenbank gespeichert.
- Alle Geldbeträge werden intern als ganzzahlige Centwerte geführt. Anzeige ist
  deutsch formatiert; Rundung erfolgt kaufmännisch auf zwei Nachkommastellen.
- Leistungstabellen sind nach `validFrom`/`validTo` versioniert. Fachwerte dürfen
  nicht fest in UI-Komponenten stehen.
- Jede Berechnung speichert Eingabe, verwendete Regelversion und Ergebnis. Ein
  späteres Ändern von Konstanten verändert historische Ergebnisse nicht rückwirkend.
- Rechner liefern eine Orientierung, keine verbindliche Leistungsentscheidung.
  Dieser Hinweis steht am Ergebnis und in Exporten.

## Abweichungen zur beobachteten Referenz

Die Referenz enthält für 2025 zwar die erhöhten Monatswerte, rechnet
Verhinderungs- und Kurzzeitpflege aber weiterhin als getrennte Jahrestöpfe von
1.685 EUR und 1.854 EUR mit Übertragungslogik und 42 Tagen. Das wird **nicht**
übernommen. Seit 1. Juli 2025 gilt für Pflegegrade 2–5 ein gemeinsamer Jahresbetrag
von 3.539 EUR und eine Höchstdauer von bis zu acht Wochen. Der Rechenkern verwendet
daher die aktuelle Regel; die alte Variante darf höchstens als historische Regel
für Leistungszeiträume vor dem 1. Juli 2025 existieren.

## Verbindliche Fachquellen

- § 15 SGB XI: https://www.gesetze-im-internet.de/sgb_11/__15.html
- Anlagen 1 und 2 SGB XI: https://www.gesetze-im-internet.de/sgb_11/anlage_1.html und https://www.gesetze-im-internet.de/sgb_11/anlage_2.html
- BMG-Leistungsübersicht 2026: https://www.bundesgesundheitsministerium.de/fileadmin/Dateien/3_Downloads/P/Pflegeversicherung_Leistungsbeitraege/Uebersicht_Leistungsbetraege_2026_VA.pdf
- BMG zum gemeinsamen Jahresbetrag: https://www.bundesgesundheitsministerium.de/presse/pressemitteilungen/das-aendert-sich-zum-1-juli-in-der-pflege

Bei Widersprüchen haben Gesetz und aktuelle Richtlinien Vorrang vor der beobachteten
Referenzanwendung und vor diesem Dokument.
