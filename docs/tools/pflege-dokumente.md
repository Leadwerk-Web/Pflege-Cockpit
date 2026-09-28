# Pflege-Dokumente

## Funktionen

- Dateien hochladen und vom Antrags-Generator erzeugte PDFs übernehmen
- Kategorien: Bescheid, Antrag, Abrechnung, Rechnung/Beleg, Gutachten, Vollmacht,
  Vertrag, medizinisch, sonstige
- Suche über Dateiname, Tags, Notiz und extrahierbaren Text
- Filter nach Fall, Kategorie und Datum; sortierbare Liste; Vorschau und Download
- Metadaten bearbeiten, neue Version hinzufügen und mit Bestätigung löschen

Erlaubte Formate: PDF, JPEG, PNG und WebP; Standardlimit 20 MB je Datei,
konfigurierbar. Dateityp wird anhand des Inhalts geprüft, nicht nur anhand der
Endung. Potenziell aktive Inhalte werden nicht ausgeführt. Doppelte Dateien werden
per Hash erkannt und nur nach Bestätigung erneut gespeichert.

Rechner können einen Beleg referenzieren, aber nicht besitzen: Das Löschen eines
referenzierten Dokuments warnt und entfernt die Verknüpfung, nicht die Buchung.
Personenbezogene Dokumente benötigen Zugriffsschutz, verschlüsselte Speicherung,
Auditprotokoll und ein später festzulegendes Lösch-/Exportkonzept.
