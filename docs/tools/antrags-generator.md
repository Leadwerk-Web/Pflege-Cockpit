# Antrags-Generator

## Dokumenttypen der ersten Ausbaustufe

1. formloser Erstantrag auf Leistungen der Pflegeversicherung
2. Höherstufungsantrag
3. Vollmacht gegenüber Kranken-/Pflegekasse
4. Antrag beziehungsweise Vorabinformation zur Verhinderungspflege
5. Abrechnung Verhinderungspflege
6. Antrag auf Umwandlung von bis zu 40 % der Pflegesachleistung
7. Erstattung von Entlastungsleistungen
8. Pflegehilfsmittel zum Verbrauch

Die Referenz zeigt im kostenlosen Konto nur fünf Kacheln. Die Spezifikation bildet
statt einer Tarifgrenze die fachlich benötigten Anträge der Rechner ab. Formulare
werden anhand aktueller Kassenanforderungen versioniert; ein generischer Brief ist
Fallback, falls eine Kasse kein standardisiertes Formular anbietet.

## Ablauf

Dokumenttyp wählen → Fall/Stammdaten übernehmen → fehlende Pflichtfelder ergänzen →
Vorschau → PDF erzeugen und optional in Pflege-Dokumente speichern. Es findet kein
automatischer Versand statt.

Jedes erzeugte Dokument enthält Absender, Empfänger/Kasse, Versichertennummer,
Betreff, fachabhängige Daten, Ort/Datum und Unterschriftsfeld. Nutzende können alle
übernommenen Werte vor der Erzeugung ändern; Änderungen fließen nur nach expliziter
Bestätigung in die Stammdaten zurück. Eine Dokumentvorlage speichert `templateId`,
Version und Erstellzeit.

Validierung: Pflichtfelder je Vorlage, plausibles Datum, positiver Betrag, keine
ungeklärten Platzhalter. Die Vorschau muss genau dem heruntergeladenen PDF entsprechen.
