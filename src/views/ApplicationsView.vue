<script setup>
import { computed, reactive, ref } from 'vue'
import { activePerson, store, uid } from '../lib/store'
const types = [
  { id:'initial', title:'Erstantrag', text:'Leistungen der Pflegeversicherung fristwahrend beantragen.' },
  { id:'upgrade', title:'Höherstufungsantrag', text:'Eine erneute Begutachtung wegen verändertem Hilfebedarf anregen.' },
  { id:'power', title:'Vollmacht Pflegeversicherung', text:'Eine Vertrauensperson für Pflegekassenangelegenheiten bevollmächtigen.' },
  { id:'respite', title:'Verhinderungspflege', text:'Leistungen der Ersatzpflege ankündigen und Kostenerstattung beantragen.' },
  { id:'tools', title:'Pflegehilfsmittel', text:'Zum Verbrauch bestimmte Pflegehilfsmittel beantragen.' },
]
const selected = ref(types[0])
const person = computed(() => activePerson())
const form = reactive({ recipient: '', subject: '', details: '', representative: '', place: '' })
const today = new Intl.DateTimeFormat('de-DE').format(new Date())
const body = computed(() => ({ initial:`hiermit beantrage ich ab dem heutigen Tag Leistungen der Pflegeversicherung und bitte um eine zeitnahe Begutachtung.`, upgrade:`hiermit beantrage ich wegen einer wesentlichen Veränderung des Hilfebedarfs die Höherstufung des bestehenden Pflegegrades ${person.value.degree}.`, power:`hiermit bevollmächtige ich ${form.representative || '[Name der bevollmächtigten Person]'}, mich in Angelegenheiten der Pflegeversicherung zu vertreten, Auskünfte einzuholen und Erklärungen entgegenzunehmen.`, respite:`hiermit teile ich die Inanspruchnahme von Verhinderungspflege mit und beantrage die Erstattung der nachgewiesenen Aufwendungen aus dem gemeinsamen Jahresbetrag.`, tools:`hiermit beantrage ich die Versorgung mit zum Verbrauch bestimmten Pflegehilfsmitteln gemäß § 40 SGB XI.` }[selected.value.id]))
function choose(type) { selected.value = type; form.subject = type.title }
function save() { store.documents.push({ id:uid('doc'), personId:person.value.id, name:`${selected.value.title} ${today}.pdf`, category:'Antrag', date:today, generated:true }); alert('Der Antrag wurde in Pflege-Dokumente gespeichert. Nutzen Sie „Drucken / als PDF speichern“ für die Datei.') }
</script>
<template>
  <div class="section-heading no-print"><div><p>Stammdaten übernehmen und prüfen</p><h2>Antrag vorbereiten</h2></div><button class="button primary" @click="print()">Drucken / als PDF speichern</button></div>
  <div class="application-layout">
    <aside class="panel template-list no-print"><p class="eyebrow">Dokumenttyp</p><button v-for="type in types" :key="type.id" :class="{ active:selected.id===type.id }" @click="choose(type)"><strong>{{ type.title }}</strong><small>{{ type.text }}</small></button></aside>
    <div><form class="panel form-grid no-print" @submit.prevent><label>Empfänger / Pflegekasse<input v-model.trim="form.recipient" :placeholder="person.insurer || 'Name der Pflegekasse'" /></label><label>Ort<input v-model.trim="form.place" :placeholder="person.city || 'Ort'" /></label><label v-if="selected.id==='power'" class="full">Bevollmächtigte Person<input v-model.trim="form.representative" required /></label><label class="full">Betreff<input v-model.trim="form.subject" /></label><label class="full">Ergänzende Angaben<textarea v-model.trim="form.details" rows="3" placeholder="Optional"></textarea></label></form>
      <article class="letter panel" aria-label="Dokumentvorschau"><div class="letter-sender">{{ person.firstName }} {{ person.lastName }} · {{ person.street }} · {{ person.zip }} {{ person.city }}</div><address>{{ form.recipient || person.insurer || '[Pflegekasse]' }}<br /><br /></address><p class="letter-date">{{ form.place || person.city || '[Ort]' }}, {{ today }}</p><h2>{{ form.subject || selected.title }}</h2><p>Versicherte Person: {{ person.firstName }} {{ person.lastName }}<br />Versichertennummer: {{ person.insuranceNumber || '[bitte ergänzen]' }}</p><p>Sehr geehrte Damen und Herren,</p><p>{{ body }}</p><p v-if="form.details">{{ form.details }}</p><p>Bitte bestätigen Sie den Eingang und teilen Sie mir die weiteren Schritte mit.</p><p>Mit freundlichen Grüßen</p><div class="signature">Unterschrift {{ person.firstName }} {{ person.lastName }}</div></article><button class="button secondary full-width no-print" @click="save">In Pflege-Dokumente speichern</button>
    </div>
  </div>
</template>
