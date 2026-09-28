# Pflege-Cockpit

Eine eigenständige, lokale Web-App zur Organisation häuslicher Pflege. Sie bündelt
Pflegegrad-Einschätzung, Budgetplanung, Verhinderungs- und Nachbarschaftshilfe,
Pflegenetzwerk, Anträge und Dokumente in einem responsiven Dashboard.

## Funktionen

- Pflegegrad-Rechner mit sechs gewichteten Modulen
- Pflegebudget-Optimierer mit Kombinationsleistung
- Verhinderungspflege mit gemeinsamem Jahresbetrag ab Juli 2025
- Nachbarschaftshilfe und Leistungsnachweise
- Pflegenetzwerk, druckbarer Antrags-Generator und Dokumentablage
- Browserbasierte Speicherung ohne Login oder Server

Registrierung, E-Mail-Verifizierung und Onboarding sind nicht Teil des Nachbaus. Der
Umfang konzentriert sich auf alle Rechner und die dafür benötigten Stamm-, Antrags-
und Dokumentfunktionen.

## Lokal starten

Voraussetzung: Node.js 20 oder neuer.

```bash
npm install
npm run dev
```

Vite zeigt anschließend die lokale Adresse an. Testdaten sind ausschließlich
fiktiv. Die Daten werden unter dem Schlüssel `pflege-cockpit-state-v1` im
`localStorage` des Browsers gespeichert.

## Qualitätssicherung

```bash
npm test
npm run build
```

## Deployment

Der Build erzeugt eine statische Anwendung im Ordner `dist/`. Durch die Hash-Routen
funktioniert sie ohne Serverkonfiguration auf GitHub Pages. Die Veröffentlichung
erfolgt in Phase 4.

## Projektdokumentation

- [Inventar](docs/01-inventory.md)
- [Funktionale Spezifikation](docs/02-specification.md)
- [Abnahmetests](docs/acceptance-tests.md)
- [Vollständigkeitsprüfung](docs/03-acceptance-audit.md)

Die Rechner dienen der Orientierung und ersetzen keine Begutachtung oder
Leistungsentscheidung durch Pflegekasse beziehungsweise Medizinischen Dienst.
