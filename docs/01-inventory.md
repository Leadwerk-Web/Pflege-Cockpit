# Inventar der eingeloggten Pflege-App

Stand: 20. September 2026  
Prüfumgebung: kostenloser, verifizierter Basis-Account mit den von der App bereitgestellten Testdaten („Erika Mustermann“)  
Untersucht: ausschließlich `https://app.pflege-dschungel.de/` nach dem Login

## Statuslegende

- **Frei:** im kostenlosen Account erreichbar und bedienbar.
- **Teilweise frei:** Kernfunktion ist erreichbar, einzelne Unterfunktionen sind gesperrt.
- **Plus:** nur mit aktivem kostenpflichtigem Abonnement erreichbar.
- **Nicht Teil des Nachbaus:** innerhalb der App sichtbar, laut Aufgabenbeschreibung aber ausdrücklich ausgeschlossen oder ein Bestell-/Community-Angebot statt eines zu kopierenden Werkzeugs.

## Kurzfazit

Die eingeloggte App hat neun sichtbare Hauptbereiche in der Seitennavigation plus Konto-, Onboarding- und Hilfefunktionen. Der frei zugängliche Funktionsumfang weicht deutlich von der vorab genannten öffentlichen Funktionsliste ab:

1. Der Pflegegrad-Rechner ist im Kern frei, besitzt aber neben den sechs gewichteten Modulen auch die zusätzlichen Ansichten „Leistungsansprüche“, „Unterwegs“ und „Haushaltsführung“.
2. Verlauf/Versionen, Vergleich, KI-Prompt, PDF-Bericht und Potenzialanalyse des Pflegegrad-Rechners sind Plus-Funktionen.
3. Der Pflegebudget-Optimierer ist mit Planung, tatsächlichen Ausgaben und Eigenanteilen frei. Sein PDF-Export ist Plus.
4. Verhinderungs- und Nachbarschaftshilfe sind als integrierte Management-Werkzeuge vollständig Plus. Frei verfügbar sind lediglich Excel-Dateien (bei NBH zusätzlich Video-Anleitungen).
5. Der Antrags-Generator zeigt im kostenlosen Account nur fünf statt der erwarteten 13 Dokumenttypen.
6. Zusätzlich gefunden wurden eine Pflegebox-Konfiguration/-Verwaltung, eine Dokumentenablage, ein eingebettetes Hilfe-/Feedback-Widget und eine Community-Einwilligungsseite.

## 1. Onboarding und globale Navigation

**Status:** Frei

### Screens

- Registrierung und E-Mail-Verifizierung.
- Onboarding-Auswahl:
  - Einrichtung mit eigenen Daten.
  - Schnellstart mit Testdaten.
- Globale linke Navigation:
  - Start
  - Mein Team
  - Community
  - Auswahl der aktiven pflegebedürftigen Person
  - Liane Pflegebox
  - Pflegegrad Rechner
  - Pflegebudget Optimierer
  - VHP-Rechner
  - NBH-Rechner
  - Antrags-Generator
  - Pflege-Dokumente
- Profilmenü mit „Mein Konto“ und Logout.

### Bemerkungen

- Der Schnellstart legt einen vollständigen fiktiven Datensatz an; dadurch lassen sich die Werkzeuge ohne echte personenbezogene Daten untersuchen.
- Die aktive pflegebedürftige Person ist global und beeinflusst alle Rechner und Formulare.

## 2. Start / Dashboard

**Route:** `/dashboard`  
**Status:** Teilweise frei

### Beschreibung

Übersichtsseite mit Begrüßung, Verknüpfungen und Statuskarten zur aktuell ausgewählten pflegebedürftigen Person.

### Screens und Funktionen

- Begrüßungskarte.
- Pflegegrad-Karte mit aktuellem Punktestand, Pflegegrad, Distanz zur nächsten Stufe und Link zum Rechner.
- Pflegebox-Karte mit Beantragungsstatus und Link zur Konfiguration.
- Budget-Karte mit Pflegegeld und Entlastungsbetrag sowie Link zur Planung.
- VHP-Budgetkarte: sichtbar, aber mit Plus-Sperre überlagert.
- NBH-Budgetkarte: sichtbar, aber mit Plus-Sperre überlagert.
- Community-Vorschau mit Beispielbeiträgen.

## 3. Mein Team / Pflegenetzwerk

**Routen:** `/team`, `/team/new`, `/team/:uuid`, `/team/service-provider/new`, `/team/service-provider/:uuid`  
**Status:** Frei

### Beschreibung

Verwaltung der pflegebedürftigen Personen, betreuenden Personen und externen Dienstleister.

### Screens und Funktionen

- Netzwerk-Übersicht mit aufklappbarer Familien-/Pflegenetzwerk-Ansicht.
- Karte je pflegebedürftiger Person mit Pflegegrad, Geburtstag, Versicherungsnummer, Kasse, Adresse und zugeordneten Betreuungspersonen.
- Mitglieder-Tabelle mit Aktionen und Zuordnungen.
- Dienstleister-Tabelle.
- Neues Teammitglied:
  - optionales Profilbild
  - Kennzeichnung als pflegebedürftige Person
  - Zuordnung zu betreuten Personen
  - Vorname, Nachname, Geburtsdatum, E-Mail, Telefon, Mobiltelefon, Geschlecht
  - Straße, Hausnummer, Stadt, PLZ, Bundesland
- Teammitglied bearbeiten: dieselben Felder; die Login-E-Mail ist beim eigenen Profil nicht editierbar.
- Neuer Dienstleister – Typauswahl:
  - Alltagsbegleitung
  - Ambulanter Betreuungsdienst
  - Ambulanter Pflegedienst
  - Ergotherapeut
  - Facharzt
  - Hausarzt
  - Haushaltshilfe
  - Kurzzeitpflege
  - Pflegeberater/in
  - Physiotherapeut
  - Tagespflege
  - Versicherung
  - §45a-Dienstleister
- Dienstleister-Formular mit Firma, Abteilung, Kontaktperson, Kontaktwegen, Webseite und Adresse.

### Unklar

- Im Testprofil steht bei den Pflegebedürftigen „Alle Plätze belegt“, obwohl der Link zum Hinzufügen einer Person sichtbar bleibt. Die genaue Begrenzung des kostenlosen Tarifs muss in Schritt 2 separat getestet werden.

## 4. Community

**Route:** `/community`  
**Status:** Frei zugänglich, aber **nicht Teil des Nachbaus**

### Beschreibung

Vor dem Beitritt werden drei getrennte Einwilligungen verlangt:

- Verarbeitung der Daten zur Community-Bereitstellung.
- Sichtbarkeit von Beiträgen, Kommentaren und freiwilligen Profilangaben.
- Widerruf/Löschung und Kontaktaufnahme zu Community-Themen.

### Bemerkung

Die Community wurde nicht aktiviert und nicht weiter untersucht, weil Forenbeiträge laut Aufgabenbeschreibung ausdrücklich nicht zum Nachbau gehören.

## 5. Liane Pflegebox / Pflegehilfsmittel

**Routen:** `/pflegehilfsmittel`, `/liane-box/management`, `/liane-box/management/products`, `/liane-box/management/address`, `/liane-box/management/insurance`  
**Status:** Frei zugänglich, aber als Bestell-/Versorgungsangebot **nicht Teil des funktionalen Nachbaus**, sofern nicht anders entschieden

### Screens und Funktionen

- Konfiguration einer monatlichen Pflegehilfsmittelbox bis zum angezeigten Budget von 42 EUR.
- Produktauswahl, u. a. Handschuhe, Desinfektionsmittel/-tücher, Bettschutzauflagen, Masken, Schutzschürzen und Fingerlinge.
- Wiederverwendbare Bettschutzeinlage als zusätzliche Position.
- Mehrstufiger Ablauf „Konfiguration“ und „Antrag“.
- Verwaltungsübersicht:
  - Box-Inhalt
  - Lieferadresse und Empfänger
  - Versicherung und Pflegestatus
- Box-Inhalt anpassen.
- Lieferadresse bearbeiten.
- Versicherungsdaten bearbeiten: Pflegegrad 1–5, Krankenkasse, Versichertennummer.

### Nicht ausgeführt

Es wurde kein Antrag und keine Bestellung abgesendet.

## 6. Pflegegrad-Rechner

**Route:** `/pflegegrad`  
**Status:** Teilweise frei

### Freie Screens und Funktionen

- Start/Angaben mit Alter und Sonderfall „Gebrauchsunfähigkeit beider Arme und beider Beine“.
- Punkteskala und Pflegegrad-Schwellen: 12,5 / 27 / 47,5 / 70 / 90 Punkte.
- Modul 1 – Mobilität (5 Kriterien, Wertungen 0–3).
- Modul 2 – Kognitive und kommunikative Fähigkeiten (11 Kriterien, Wertungen 0–3).
- Modul 3 – Verhaltensweisen und psychische Problemlagen (13 Kriterien, Häufigkeitswerte 0/1/3/5).
- Modul 4 – Selbstversorgung (13 Kriterien, teils abweichende Punktreihen; Ernährung über Sonde als eigener Sonderfall).
- Modul 5 – Umgang mit krankheits- oder therapiebedingten Anforderungen (16 Hauptkriterien plus Kinder-Sonderzeile; tägliche, wöchentliche und monatliche Häufigkeiten).
- Modul 6 – Gestaltung des Alltagslebens und sozialer Kontakte (6 Kriterien).
- Leistungsansprüche mit den Kategorien Pflegegeld, Sachleistung, Verhinderungspflege, Entlastungsbetrag, Tagespflege, Kurzzeitpflege, Pflegehilfsmittel, Hausnotruf und Wohnumfeldverbesserung.
- Modul 7 – Außerhäusliche Aktivitäten (7 Kriterien). Dieses Modul ist dokumentativ, nicht Teil der gewichteten Pflegegradberechnung.
- Modul 8 – Haushaltsführung (7 Kriterien). Dieses Modul ist dokumentativ, nicht Teil der gewichteten Pflegegradberechnung.
- Je Kriterium aufklappbare Erläuterungen.
- Je Kriterium ein Tagebuch: Freitextnotiz kann erfasst und gespeichert werden.
- Anzeige von Brutto-/Nettopunkten und Distanz zur nächsten Stufe.

### Plus-Sperren

- **Versionen:** verschiedene Einschätzungen speichern, ansehen, wiederherstellen und Entwicklung verfolgen.
- **Vergleichsmodus:** zwei Einschätzungen vergleichen und Änderungen hervorheben.
- **KI-Prompt Generator:** individueller Prompt, Argumentationshilfen und Optimierungsvorschläge.
- **Ergebnis als PDF:** vollständiger Bericht für die Begutachtungsvorbereitung.
- **Potenzial- & Vergleichsanalyse:** Modulübersicht, Potenzial je Modul und Punkte bis zum nächsten Pflegegrad.

### Wichtige Abweichung von der Aufgabenannahme

Die Tagebuchfunktion ist frei; die eigentliche Verlaufs-/Versionsfunktion ist dagegen gesperrt.

## 7. Pflegebudget Optimierer

**Routen:** `/budget-optimizer/plan`, `/budget-optimizer/expenses`, `/budget-optimizer/copayment`  
**Status:** Teilweise frei

### Freie Screens und Funktionen

- Initialer Startscreen „Jetzt Budget optimieren“.
- **Budgetplanung** für 12 Monate, Pflegegrad separat je Monat wählbar.
- **Ausgaben** für tatsächliche Nutzung/Verbrauch.
- **Eigenanteil** für privat getragene Kosten.
- Kalenderjahr-Auswahl; im Test war 2026 aktiv.
- Leistungsarten:
  - Pflegegeld
  - Sachleistungs-Budget
  - Tagespflege
  - Verhinderungspflege
  - Kurzzeitpflege
  - Entlastungsbetrag
  - Pflegehilfsmittel
  - Hausnotruf
  - Wohnumfeldverbesserung
  - DiPA-Anwendung
  - DiPA-Unterstützung
- Umschalter für Erstattungen aus dem Entlastungsbetrag und die Umwandlung von bis zu 40 % der Sachleistung.
- Monatliche Verbrauchsfelder, Prozent-/Betragsdarstellung und Jahressummen.
- Eigenanteil-Kategorien:
  - Inkontinenzmaterial
  - Haut- und Hygienemittel
  - Medikamente und Hilfsmittel
  - Fahrt- und Transportkosten
  - Hauswirtschaftliche Unterstützung
  - Sonstige Pflegekosten
- Kompakte/erweiterte Ansicht über „Ansicht“.

### Plus-Sperre

- PDF-Export der Budgetplanung bzw. des Eigenanteils.

### Technische Besonderheit

Die ältere Route `/pflege-budget-planner` leitet auf den aktuellen Planungsbereich um und ist kein zusätzliches Werkzeug.

## 8. Verhinderungspflege-Management (VHP)

**Routen:** `/respite-care` und `/respite-care/landing`  
**Status:** Integriertes Management **Plus**, Excel-Dateien frei

### Plus-Funktionen laut gesperrtem Screen

- Monatliche Dokumentation und Abrechnung.
- Mehrere Ersatzpflegepersonen.
- Favoritensystem und schnelle Einsatz-Erfassung.
- Budgetberechnung/-ausschöpfung.
- Abrechnungsunterlagen für die Pflegekasse.

### Frei

- Downloadbare „VHP-Rechner 2025“-Excel-Datei.
- Downloadbare Anleitung.
- Hinweis auf das seit Juli 2025 zusammengeführte Jahresbudget von bis zu 3.539 EUR.

### Zugriffstest

Die eigentliche Managementroute trägt im Router ausdrücklich `requiresSubscription`; der kostenlose Account wird auf die Landingpage umgeleitet.

## 9. Nachbarschaftshilfe-Management (NBH)

**Routen:** `/neighborhood-support` und `/neighborhood-support/landing`  
**Status:** Integriertes Management **Plus**, Excel-Datei/Anleitungen frei

### Plus-Funktionen laut gesperrtem Screen

- Monatliche Dokumentation und Abrechnung.
- Mehrere Nachbarschaftshelfer/innen.
- Automatische Umwandlung von bis zu 40 % der Pflegesachleistung.
- Ermittlung des nutzbaren Budgets und von Kombinationen.
- Druck-/PDF-Abrechnung für die Pflegekasse.

### Frei

- Downloadbare „NBH-Rechner 2025“-Excel-Datei.
- Drei kurze Video-Anleitungen werden angekündigt.

### Zugriffstest

Die eigentliche Managementroute trägt im Router ausdrücklich `requiresSubscription`; der kostenlose Account wird auf die Landingpage umgeleitet.

## 10. Antrags-Generator

**Route:** `/document-generator`  
**Status:** Frei, aber nur fünf Dokumenttypen sichtbar

### Verfügbare Dokumente

1. Erstantrag.
2. Pflegehilfsmittel-Antrag; führt in den Pflegebox-Antragsprozess.
3. Vollmacht für die Pflegeversicherung.
4. Höherstufungsantrag.
5. Antrag auf Verhinderungspflege.

### Ablauf

- Suche und Typfilter.
- „Jetzt Generieren“ öffnet eine Auswahl:
  - nur herunterladen
  - in „Pflege-Dokumente“ speichern und herunterladen
  - abbrechen

### Erwartet, aber im kostenlosen Account nicht vorhanden

- Änderung der Leistungsart.
- Kurzzeitpflege.
- Tagespflege.
- Wohnumfeldverbesserung.
- Pflegezeit.
- Hausnotruf.
- Vorsorgevollmacht.
- Patientenverfügung.
- Betreuungsverfügung.

Ob diese acht Typen Plus-Funktionen, noch nicht implementiert oder anderweitig ausgeblendet sind, ist im freien Account nicht erkennbar.

## 11. Pflege-Dokumente

**Route:** `/documents`  
**Status:** Frei

### Screens und Funktionen

- Dokumentenliste mit Name, Typ, Größe, Upload-Datum, hochladender Person und Aktionen.
- Filter.
- Dokument hochladen.
- Pagination/Seitengröße.
- Leerer Zustand „Noch keine Dokumente“.
- Vom Antrags-Generator erzeugte Dokumente können hier gespeichert werden.

## 12. Benutzerkonto

**Route:** `/account`  
**Status:** Frei

### Screens und Funktionen

- Anzeige der Konto-E-Mail.
- Link zum persönlichen Teammitglied-Profil.
- Hinweis auf fehlendes Plus-Abonnement und Link zu den Plänen.
- Funktion „Mein COCKPIT löschen“.

### Nicht ausgeführt

- Es wurde kein Abo geöffnet oder gekauft.
- Das Konto wurde nicht gelöscht.

## 13. Hilfe und Feedback

**Quelle:** eingebettetes Widget von `beratungs-cockpit.de`  
**Status:** Frei; zusätzlicher Fund

### Screens und Funktionen

- Themenauswahl:
  - allgemeine Frage zur App
  - Pflegegrad-Rechner
  - Verhinderungspflege-Rechner
  - Nachbarschaftshilfe-Rechner
  - Pflegebox
- Aufklappbarer Tutorial-Bereich.
- Anschließende Kontakt-/Feedback-Strecke wurde nicht abgesendet.

## 14. Nicht als eigenes Werkzeug gewertete Routen

- `/pflege-budget-planner`: Weiterleitung zum aktuellen Budget-Optimierer.
- `/dtpb`: Weiterleitung auf eine Registrierung mit Referrer; nicht Teil des eingeloggten Cockpits.
- `/beratung-37`: separate Beratungsstrecke im einfachen Layout, nicht in der eingeloggten Navigation.
- `/liane-activate`: Aktivierungsstrecke der Pflegebox, nicht als eigenständiges Cockpit-Werkzeug gewertet.
- Subscription-Erfolgs-/Abbruchseiten: nur Teil des Bezahlvorgangs; nicht geöffnet.

## 15. Screenshot-Nachweis

Während der Prüfung wurden visuelle Aufnahmen aller oben beschriebenen Haupt- und Sperrzustände erzeugt: Onboarding, Dashboard, Team, Teammitglied, Dienstleisterauswahl/-formular, Community-Einwilligung, Pflegebox, alle Pflegegrad-Module, Tagebuch, Leistungsansprüche, sämtliche Plus-Sperrdialoge, Budgetplanung, Ausgaben, Eigenanteil, VHP/NBH-Landingpages und Excel-Bereiche, Antrags-Generator, Dokumentenablage, Konto, Pflegebox-Verwaltung und Hilfe-Widget.

**Offener technischer Punkt:** Die aktuelle Browser-Automation stellt die Aufnahmen im Prüfprotokoll dar, bietet aber keinen zulässigen Exportpfad in den lokalen Workspace. Deshalb enthält diese Datei noch keine verlinkten PNG-Dateien. Vor Freigabe von Schritt 1 müssen die Aufnahmen entweder manuell aus dem Prüfprotokoll exportiert oder mit einem Browser-Exportzugang erneut gespeichert werden. Inhalte und Zustände sind oben vollständig dokumentiert.

## 16. Offene Punkte für die Freigabe

1. Soll die Pflegebox als Bestellprozess nachgebaut werden oder nur als außerhalb des Projektumfangs liegende Zusatzfunktion dokumentiert bleiben?
2. Sollen die frei downloadbaren VHP-/NBH-Excel-Dateien in Schritt 2 als Referenzwerkzeuge analysiert werden, obwohl das integrierte Management Plus ist?
3. Wie sind die acht fehlenden Dokumenttypen zu behandeln: vorerst als „nicht zugänglich“ markieren oder nach Plus-Freischaltung erneut prüfen?
4. Soll das Hilfe-/Feedback-Widget im Nachbau nur als einfache Hilfeseite ersetzt oder vollständig ausgelassen werden?
5. Der Screenshot-Dateiexport ist noch offen (siehe Abschnitt 15).

## 17. Umfangsempfehlung für Schritt 2

Nach Freigabe des Inventars sollten zuerst diese frei zugänglichen Kernbereiche spezifiziert werden:

1. Pflegegrad-Rechner einschließlich Tagebuch und der ungewichteten Module 7/8.
2. Pflegebudget-Optimierer mit Planung, Ausgaben und Eigenanteilen.
3. Mein Team/Pflegenetzwerk und Dienstleister.
4. Die fünf sichtbaren Dokumentgenerator-Typen sowie die Dokumentenablage.
5. Dashboard und globale Navigation.

VHP/NBH-Management, Pflegegrad-Versionierung/-vergleich/-PDF/-KI und Budget-PDF bleiben bis zu einer ausdrücklichen Plus-Freischaltung als gesperrt dokumentiert.
