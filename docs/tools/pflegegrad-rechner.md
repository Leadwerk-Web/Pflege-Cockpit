# Pflegegrad-Rechner

## Eingaben

Globale Eingaben: Stichtag, Geburtsdatum beziehungsweise Alter in Monaten sowie
„Gebrauchsunfähigkeit beider Arme und beider Beine“. Jede Bewertungsfrage ist eine
Pflichtauswahl; unbeantwortete Fragen sind nicht stillschweigend null.

### Bewertete Module

1. Mobilität: Positionswechsel im Bett; stabile Sitzposition; Umsetzen;
   Fortbewegen im Wohnbereich; Treppensteigen.
2. Kognitive/kommunikative Fähigkeiten: Personen erkennen; örtliche und zeitliche
   Orientierung; Erinnern; mehrschrittige Handlungen; Entscheidungen; Sachverhalte
   verstehen; Risiken erkennen; Bedürfnisse mitteilen; Aufforderungen verstehen;
   Gesprächsbeteiligung.
3. Verhalten/psychische Problemlagen: motorische Auffälligkeiten; nächtliche
   Unruhe; Selbstschädigung; Gegenstände beschädigen; körperliche/verbale
   Aggression; vokale Auffälligkeiten; Abwehr von Maßnahmen; Wahn; Ängste;
   Antriebslosigkeit; sozial inadäquates Verhalten; sonstige inadäquate Handlungen.
4. Selbstversorgung: Körper-/Kopf-/Intimpflege; Duschen/Baden; Ankleiden oben und
   unten; Nahrung zubereiten/eingießen; Essen; Trinken; Toilette; Harn-/
   Stuhlinkontinenz beziehungsweise Stoma; parenterale/Sondenernährung; besonderer
   Nahrungsaufnahmebedarf bei Kindern bis 18 Monate.
5. Krankheits-/therapiebedingte Anforderungen: Medikation; Injektionen; i.v.-Zugang;
   Absaugen/Sauerstoff; Einreibungen/Kälte/Wärme; Körperwerte messen/deuten;
   körpernahe Hilfsmittel; Verband/Wunde; Stoma; Katheter/Abführmethoden;
   häusliche Therapiemaßnahmen; zeit-/technikintensive Maßnahmen; Arztbesuche;
   medizinisch-therapeutische Besuche bis und über drei Stunden; Frühförderung;
   Diät/Verhaltensvorschriften.
6. Alltag und soziale Kontakte: Tagesablauf; Ruhen/Schlafen; Beschäftigung;
   Zukunftsplanung; direkte Interaktion; Kontakte außerhalb des direkten Umfelds.

Zusätzlich, ohne Einfluss auf den Pflegegrad: Modul 7 außerhäusliche Aktivitäten
und Modul 8 Haushaltsführung. Sie werden gespeichert und im Bericht angezeigt.

## Antwortskalen

- Module 1, 2, 4 und 6: selbständig 0, überwiegend selbständig 1, überwiegend
  unselbständig 2, unselbständig 3; einzelne gesetzlich definierte Kriterien haben
  abweichende Punktfaktoren.
- Modul 3: nie/selten 0, selten 1, häufig 3, täglich 5.
- Modul 5: Häufigkeiten je Tag, Woche oder Monat; die Eingabe wird nach Anlage 1
  SGB XI normalisiert und anschließend in drei Teilgruppen bepunktet.
- Kinderwerte werden abhängig vom Alter in Monaten nach Anlage 1 korrigiert.

## Rechenkern

Rohpunkte werden nach Anlage 2 in Gewichtspunkte übersetzt:

| Modul | Rohpunkte → Gewichtspunkte |
|---|---|
| 1 | 0–1→0; 2–3→2,5; 4–5→5; 6–9→7,5; 10–15→10 |
| 2 | 0–1→0; 2–5→3,75; 6–10→7,5; 11–16→11,25; 17–33→15 |
| 3 | 0→0; 1–2→3,75; 3–4→7,5; 5–6→11,25; 7–65→15 |
| 4 | 0–2→0; 3–7→10; 8–18→20; 19–36→30; 37–54→40 |
| 5 | 0→0; 1→5; 2–3→10; 4–5→15; 6–15→20 |
| 6 | 0→0; 1–3→3,75; 4–6→7,5; 7–11→11,25; 12–18→15 |

In die Summe gehen Modul 1, der höhere Wert aus Modul 2 oder 3, sowie Module 4,
5 und 6 ein. Ergebnis: unter 12,5 = kein Pflegegrad; 12,5 bis unter 27 = PG 1;
27 bis unter 47,5 = PG 2; 47,5 bis unter 70 = PG 3; 70 bis unter 90 = PG 4;
90–100 = PG 5. Bei Gebrauchsunfähigkeit beider Arme und Beine wird unabhängig von
der Summe PG 5 vergeben.

Kinder unter 18 Monaten: 12,5–<27 = PG 2, 27–<47,5 = PG 3,
47,5–<70 = PG 4, 70–100 = PG 5. Die Altersgrenze wird am Stichtag ermittelt.

## Ergebnis

Anzeige von Pflegegrad, Gesamtgewichtspunkten, Roh- und Gewichtspunkten je Modul,
berücksichtigtem Maximum aus Modul 2/3, Abstand zur nächsten Stufe und Hinweis auf
die unverbindliche Selbsteinschätzung. Speichern, neue Version, Vergleich zweier
Versionen und barrierearmer PDF-Bericht gehören zum Zielumfang.
