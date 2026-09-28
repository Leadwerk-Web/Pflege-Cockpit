# Nachbarschaftshilfe-Rechner

## Ziel

Planung und Dokumentation anerkannter Angebote zur Unterstützung im Alltag. Da
Anerkennung, zulässige Tätigkeiten, Stundensätze und Anbieterregeln vom Bundesland
abhängen, darf der Rechner keine bundesweit einheitliche Erstattungsfähigkeit
behaupten.

## Eingaben

- Bundesland und gültiger Regelstand
- Helfer/Dienstleister aus dem Pflegenetzwerk, Anerkennungsstatus und Kennnummer
- Datum, Beginn/Ende oder Stunden, Tätigkeit, Stundensatz
- Fahrt-/Auslagen, Zahlungsstatus, Notiz und Beleg
- Finanzierungsquelle: Entlastungsbetrag oder Umwandlungsanspruch

## Berechnung

`Leistung = Dauer × anerkannter Stundensatz`; erstattungsfähige Nebenkosten werden
separat addiert. Je Monat werden verfügbarer Entlastungsbetrag, gegebenenfalls
freigegebener Umwandlungsbetrag, eingereichte Kosten, voraussichtliche Erstattung
und Eigenanteil gezeigt. Keine Ausgabe darf denselben Beleg beiden Quellen
zuordnen. Budgetverbrauch wird transaktional mit dem Budget-Optimierer synchronisiert.

Fehlt eine gepflegte Landesregel, liefert die App nur Stunden-/Kostenaufstellung
und kennzeichnet die Erstattung als „durch Pflegekasse/Anerkennungsstelle prüfen“.
Die Landesregeln gehören in eine versionierte Konfiguration mit Quelle und
Abrufdatum, nicht in Programmcode.

## Ausgabe

Monatsnachweis, Jahresübersicht, Helferabrechnung und CSV/PDF. Pflichtangaben vor
Export: Fall, Helfer, Leistungsdatum, Tätigkeit, Dauer/Betrag und Finanzierungsquelle.
