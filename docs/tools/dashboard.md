# Dashboard

Das Dashboard ist die Startseite und kein eigener Rechenkern.

## Inhalt

- Fallumschalter und Stammdaten-Kurzkarte
- Pflegegrad: letzter Wert, Gesamtpunkte, Datum, Abstand zur nächsten Stufe,
  „Berechnung fortsetzen“ oder „Neu berechnen“
- Budget für ausgewählten Monat: Pflegegeld, Sachleistung, Entlastungsbetrag,
  gemeinsamer Jahresbetrag mit Plan/Ist/Rest
- offene Aufgaben: unvollständige Berechnungen, fehlende Belege, vorbereitete aber
  nicht heruntergeladene Anträge
- letzte Dokumente und Schnellaktionen zu allen vier Rechnern

## Logik und Zustände

Das Jahr und der Monat sind wählbar. Summen werden ausschließlich aus den
gespeicherten Rechnerständen abgeleitet. Ohne Pflegegrad zeigt die Budgetkarte
keine geschätzten Ansprüche, sondern einen Link zum Pflegegrad-Rechner. Leere,
ladende und fehlerhafte Zustände werden je Karte dargestellt; ein Fehler blockiert
nicht das restliche Dashboard.
