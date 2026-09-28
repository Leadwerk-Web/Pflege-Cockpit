const standard = [
  { label: 'selbständig', value: 0 }, { label: 'überwiegend selbständig', value: 1 },
  { label: 'überwiegend unselbständig', value: 2 }, { label: 'unselbständig', value: 3 },
]
const cognitive = [
  { label: 'vorhanden', value: 0 }, { label: 'größtenteils vorhanden', value: 1 },
  { label: 'in geringem Maß vorhanden', value: 2 }, { label: 'nicht vorhanden', value: 3 },
]
const frequency = [
  { label: 'nie oder sehr selten', value: 0 }, { label: 'selten', value: 1 },
  { label: 'häufig', value: 3 }, { label: 'täglich', value: 5 },
]

const make = (labels, options = standard, factors = null) => labels.map((label, index) => ({ id: index, label, options: factors ? options.map((option, i) => ({ ...option, value: factors[index]?.[i] ?? option.value })) : options }))

export const modules = [
  { key: 'm1', short: 'Mobilität', title: '1. Mobilität', questions: make(['Positionswechsel im Bett', 'Halten einer stabilen Sitzposition', 'Umsetzen', 'Fortbewegen innerhalb des Wohnbereichs', 'Treppensteigen']) },
  { key: 'm2', short: 'Kognition', title: '2. Kognitive und kommunikative Fähigkeiten', questions: make(['Erkennen von Personen aus näherem Umfeld', 'Örtliche Orientierung', 'Zeitliche Orientierung', 'Erinnern an wesentliche Ereignisse oder Beobachtungen', 'Steuern von mehrschrittigen Alltagshandlungen', 'Treffen von Entscheidungen im Alltagsleben', 'Verstehen von Sachverhalten und Informationen', 'Erkennen von Risiken und Gefahren', 'Mitteilen von elementaren Bedürfnissen', 'Verstehen von Aufforderungen', 'Beteiligen an einem Gespräch'], cognitive) },
  { key: 'm3', short: 'Verhalten', title: '3. Verhaltensweisen und psychische Problemlagen', questions: make(['Motorisch geprägte Verhaltensauffälligkeiten', 'Nächtliche Unruhe', 'Selbstschädigendes und autoaggressives Verhalten', 'Beschädigen von Gegenständen', 'Physisch aggressives Verhalten gegenüber anderen Personen', 'Verbale Aggression', 'Andere pflegerelevante vokale Auffälligkeiten', 'Abwehr pflegerischer und anderer unterstützender Maßnahmen', 'Wahnvorstellungen', 'Ängste', 'Antriebslosigkeit bei depressiver Stimmungslage', 'Sozial inadäquate Verhaltensweisen', 'Sonstige pflegerelevante inadäquate Handlungen'], frequency) },
  { key: 'm4', short: 'Selbstversorgung', title: '4. Selbstversorgung', questions: make(['Waschen des vorderen Oberkörpers', 'Körperpflege im Bereich des Kopfes', 'Waschen des Intimbereichs', 'Duschen und Baden einschließlich Haarewaschen', 'An- und Auskleiden des Oberkörpers', 'An- und Auskleiden des Unterkörpers', 'Mundgerechtes Zubereiten der Nahrung und Eingießen', 'Essen', 'Trinken', 'Benutzen einer Toilette oder eines Toilettenstuhls', 'Umgang mit Harninkontinenz, Dauerkatheter oder Urostoma', 'Umgang mit Stuhlinkontinenz oder Stoma', 'Parenterale oder Sondenernährung'], standard, [[0,1,2,3],[0,1,2,3],[0,1,2,3],[0,1,2,3],[0,1,2,3],[0,1,2,3],[0,1,2,3],[0,3,6,9],[0,2,4,6],[0,2,4,6],[0,1,2,3],[0,1,2,3],[0,0,6,3]]) },
  { key: 'm6', short: 'Alltag', title: '6. Gestaltung des Alltagslebens und sozialer Kontakte', questions: make(['Gestaltung des Tagesablaufs und Anpassung an Veränderungen', 'Ruhen und Schlafen', 'Sich beschäftigen', 'Vornehmen von in die Zukunft gerichteten Planungen', 'Interaktion mit Personen im direkten Kontakt', 'Kontaktpflege zu Personen außerhalb des direkten Umfelds']) },
]

export const therapyQuestions = ['Medikation', 'Injektionen', 'Versorgung intravenöser Zugänge', 'Absaugen und Sauerstoffgabe', 'Einreibungen sowie Kälte- und Wärmeanwendungen', 'Messung und Deutung von Körperzuständen', 'Körpernahe Hilfsmittel', 'Verbandwechsel und Wundversorgung', 'Versorgung mit Stoma', 'Einmalkatheterisierung und Abführmethoden', 'Therapiemaßnahmen in häuslicher Umgebung', 'Zeit- und technikintensive Maßnahmen', 'Arztbesuche', 'Besuche medizinischer oder therapeutischer Einrichtungen bis 3 Stunden', 'Besuche medizinischer oder therapeutischer Einrichtungen über 3 Stunden', 'Frühförderung von Kindern']

export const outsideQuestions = ['Wohnung oder Einrichtung verlassen', 'Fortbewegen außerhalb der Wohnung', 'Öffentliche Verkehrsmittel nutzen', 'In einem Kraftfahrzeug mitfahren', 'An kulturellen, religiösen oder sportlichen Veranstaltungen teilnehmen', 'Arbeitsplatz, Werkstatt oder Tagespflege besuchen', 'An sonstigen Aktivitäten mit anderen Menschen teilnehmen']
export const householdQuestions = ['Einkaufen für den täglichen Bedarf', 'Einfache Mahlzeiten zubereiten', 'Einfache Aufräum- und Reinigungsarbeiten', 'Aufwändige Reinigung und Wäschepflege', 'Dienstleistungen nutzen', 'Mit finanziellen Angelegenheiten umgehen', 'Mit Behördenangelegenheiten umgehen']
