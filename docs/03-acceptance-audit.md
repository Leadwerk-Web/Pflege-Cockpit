# Phase 4 – Abnahme- und Vollständigkeitsprüfung

Stand: 28. September 2026

Diese Prüfung gleicht den aktuellen Projektstand mit der ursprünglichen Aufgabe ab.
Sie trennt umgesetzte Funktionen von Punkten, für die noch kein belastbarer
Binnenvergleich mit der Referenzanwendung vorliegt.

## Erfüllt

| Anforderung | Nachweis |
|---|---|
| Eigenständiges privates Repository in `Leadwerk-Web` | `Leadwerk-Web/Pflege-Cockpit`, Sichtbarkeit `PRIVATE` |
| Kein Login, keine Registrierung, kein Onboarding | App öffnet direkt im Dashboard |
| Vue 3 und Vite | `package.json`, `vite.config.js` |
| Browserbasierte Speicherung | `src/lib/store.js`, versionierter localStorage-Schlüssel |
| Dashboard und Navigation | `src/App.vue`, `src/views/DashboardView.vue` |
| Pflegenetzwerk und mehrere Pflegefälle | `src/views/NetworkView.vue` |
| Pflegegrad-Rechner | `src/views/CareDegreeView.vue`, `src/lib/calculations.js` |
| Pflegebudget Plan/Ist und Kombinationsleistung | `src/views/BudgetView.vue` |
| Verhinderungspflege | `src/views/RespiteView.vue` |
| Nachbarschaftshilfe | `src/views/NeighborView.vue` |
| Fünf im Basis-Account sichtbare Dokumenttypen | `src/views/ApplicationsView.vue` |
| Druck-/PDF-Ausgabe | Druckansichten für Anträge, VHP, NBH und Budget |
| Dokumentablage | `src/views/DocumentsView.vue` |
| Deutsche Oberfläche, englische Bezeichner im Code | gesamter Quellcode |
| Responsive Darstellung | Breakpoints in `src/styles.css`, mobile Sichtprüfung |
| README mit Installation, Start, Tests und Deployment | `README.md` |
| Reproduzierbarer Build und Tests | `npm test`, `npm run build` |
| Automatisches GitHub-Pages-Deployment | `.github/workflows/deploy-pages.yml` |

## Bewusste Scope-Entscheidungen

- Registrierung, E-Mail-Verifizierung und Onboarding wurden auf ausdrücklichen
  Wunsch weggelassen.
- Community, Marketing, Blog, Pflegebox-Bestellstrecke und Hilfe-Widget sind nicht
  Bestandteil der Review-App.
- Der Projektname „Pflege-Cockpit“ wurde nach der späteren ausdrücklichen Vorgabe
  verwendet, obwohl die ursprüngliche Mail einen neutralen Arbeitstitel vorsah.
- Die seit 1. Juli 2025 geltende gemeinsame Jahresleistung von 3.539 EUR ersetzt
  die in Teilen der Referenz beobachtete ältere Zwei-Töpfe-Logik.

## Noch nicht vollständig belegbar

| Punkt | Status / Grund |
|---|---|
| Screenshots jedes Originalzustands | Nicht vorhanden. Die Inventur dokumentiert die Screens textlich; der damalige Screenshot-Export war blockiert. |
| Pixel- oder Textkopie des Originaldesigns | Nicht vorgesehen; laut Aufgabe muss das UI eigenständig sein. |
| Exakte Gleichheit aller Originalergebnisse | Kernschwellen, Leistungswerte, Kombination und gemeinsamer Jahresbetrag sind getestet. Für alle Alterskorrekturen bei Kindern, jede Frequenzkombination in Modul 5 und gesperrte Plus-Rechner fehlt ein vollständiger Referenzdatensatz. |
| Vollständige Plus-Funktionen | Nicht als Referenz verifizierbar, weil kein Plus-Abonnement gekauft werden durfte. VHP und NBH wurden anhand der zugänglichen Informationen und des geltenden Rechts eigenständig umgesetzt. |
| 13 ursprünglich erwartete Dokumente | Im geprüften Basis-Account waren nur fünf Typen sichtbar. Umgesetzt wurden diese fünf; keine nicht zugänglichen Vorlagen wurden als Originalfunktion ausgegeben. |
| Miro-Designvergleich | Die beschriebene Petrol-/Koralle-Designsprache wurde umgesetzt; ein dokumentierter visueller Vergleich mit dem privaten Board liegt nicht vor. |

## Automatische Prüfergebnisse

- 15 Berechnungstests bestanden.
- Produktions-Build ohne Fehler erstellt.
- Alle acht App-Routen in der lokalen Vorschau geöffnet.
- GitHub Pages führt bei jedem Push erst Tests und Build aus und veröffentlicht nur
  bei erfolgreichem Lauf.

## Abnahmefazit

Die Review-App und die statische Veröffentlichung sind funktionsfähig. Die Aussage
„jede Berechnung liefert für jeden Sonderfall exakt dasselbe Ergebnis wie das
Original“ wäre ohne die fehlenden Original-Screenshots, Referenzfälle und den
Zugriff auf Plus-Funktionen nicht seriös. Diese Punkte sind deshalb keine verdeckten
Fehler, sondern transparent dokumentierte Verifikationslücken.
