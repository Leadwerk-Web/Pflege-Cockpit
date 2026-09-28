# Pflegebudget-Optimierer

## Zweck und Navigation

Jahresplanung mit zwölf Monaten und drei Ebenen: `Plan`, `Ist-Ausgaben` und
`Eigenanteil`. Der Pflegegrad kann monatsgenau wechseln; Standard ist der aktuelle
Pflegegrad des aktiven Falls.

## Monatliche Leistungen

- Pflegegeld
- Pflegesachleistung und Kombinationsleistung
- Umwandlungsanspruch bis höchstens 40 % der ungenutzten Sachleistung für nach
  Landesrecht anerkannte Angebote zur Unterstützung im Alltag
- Entlastungsbetrag einschließlich übertragener Beträge
- Tages-/Nachtpflege
- Verbrauchspflegehilfsmittel und Hausnotruf als getrennte Informationspositionen

Kombinationsformel: `Verbrauchsquote = (Ist-Sachleistung + eingesetzter
Umwandlungsanspruch) / Höchstbetrag`, begrenzt auf 0–1. `Pflegegeld =
Höchst-Pflegegeld × (1 − Verbrauchsquote)`. Bei exakt 40 % Gesamtverbrauch bleiben
60 % Pflegegeld. Werte werden erst am Ende auf Cent gerundet.

Der Entlastungsbetrag wächst monatlich um 131 EUR ab Anspruchsbeginn. Ausgaben
reduzieren zuerst den ältesten verfügbaren Anspruch. Ein Vorjahresrest ist als
eigene Eingabe mit Herkunftsjahr sichtbar; seine gesetzliche Verfallsfrist wird
als Warnung angezeigt und nicht frei erfunden.

## Jahresleistungen

Verhinderungs- und Kurzzeitpflege verwenden ab 1. Juli 2025 **einen** gemeinsamen
Topf von 3.539 EUR. Jede Ausgabe trägt Leistungsart, Datum, Betrag und optional
Beleg. `Rest = Anfangsanspruch − anerkannte Ist-Ausgaben`; der Wert kann nie unter
null fallen, Überschüsse werden als Eigenanteil ausgewiesen.

Bei tageweiser Verhinderungs- oder Kurzzeitpflege wird die Hälfte des bisherigen
(anteiligen) Pflegegelds bis zu acht Wochen fortgezahlt. Der erste und letzte Tag
eines zusammenhängenden Zeitraums bleiben bei der Kürzung unberücksichtigt. Bei
stundenweiser Verhinderung unter acht Stunden Abwesenheit der Pflegeperson erfolgt
keine Pflegegeldkürzung und keine Anrechnung auf die Acht-Wochen-Grenze.

## Validierung und Ausgabe

- Ist-Sachleistung über Höchstbetrag erzeugt Eigenanteil, aber keine negative
  Pflegegeldquote.
- Umwandlung plus reguläre Sachleistung darf 100 % des Sachleistungsanspruchs nicht
  überschreiten; Umwandlung allein höchstens 40 %.
- Doppelte beziehungsweise überlappende Zeiträume werden gewarnt.
- Monats- und Jahressummen zeigen Anspruch, geplant, tatsächlich, offen und privat.
- Export enthält Regelstand, Annahmen und alle Buchungen; CSV und PDF sind frei.
