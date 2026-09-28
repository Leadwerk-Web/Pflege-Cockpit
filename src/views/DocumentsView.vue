<script setup>
import { computed, ref } from 'vue'
import { activePerson, store, uid } from '../lib/store'
const category = ref('Alle')
const query = ref('')
const person = computed(() => activePerson())
const filtered = computed(() => store.documents.filter((doc) => doc.personId === person.value.id && (category.value==='Alle'||doc.category===category.value) && doc.name.toLowerCase().includes(query.value.toLowerCase())))
function upload(event) { for (const file of event.target.files) { if (file.size > 2_000_000) { alert(`${file.name} ist größer als 2 MB und kann in dieser lokalen Review-Version nicht gespeichert werden.`); continue } const reader = new FileReader(); reader.onload=()=>store.documents.push({ id:uid('doc'), personId:person.value.id, name:file.name, category:'Beleg', date:new Intl.DateTimeFormat('de-DE').format(new Date()), size:file.size, data:reader.result }); reader.readAsDataURL(file) } event.target.value='' }
function download(doc) { if (!doc.data) return alert('Für erzeugte Schreiben nutzen Sie die Druckansicht im Antrags-Generator.'); const link=document.createElement('a'); link.href=doc.data; link.download=doc.name; link.click() }
function remove(doc) { if(confirm('Dokument wirklich aus der lokalen Ablage löschen?')) store.documents.splice(store.documents.indexOf(doc),1) }
</script>
<template>
  <div class="section-heading"><div><p>Belege, Bescheide und Anträge</p><h2>Pflege-Dokumente</h2></div><label class="button primary upload">+ Datei hochladen<input type="file" accept="application/pdf,image/jpeg,image/png,image/webp" multiple @change="upload" /></label></div>
  <div class="toolbar panel"><label class="search">⌕<input v-model="query" placeholder="Dokumente durchsuchen" /></label><label>Kategorie<select v-model="category"><option>Alle</option><option>Antrag</option><option>Beleg</option><option>Bescheid</option><option>Gutachten</option><option>Vollmacht</option></select></label><span>{{ filtered.length }} Dokumente</span></div>
  <div v-if="filtered.length" class="document-grid"><article v-for="doc in filtered" :key="doc.id" class="panel document-card"><div class="file-type">{{ doc.name.split('.').pop().toUpperCase() }}</div><div><span class="pill">{{ doc.category }}</span><h3>{{ doc.name }}</h3><p>{{ doc.date }}<template v-if="doc.size"> · {{ Math.round(doc.size/1024) }} KB</template></p></div><div class="card-actions"><button class="button ghost" @click="download(doc)">Öffnen</button><button class="text-danger" @click="remove(doc)">Löschen</button></div></article></div>
  <div v-else class="empty panel large"><span>□</span><strong>Keine passenden Dokumente</strong><p>Laden Sie Belege hoch oder speichern Sie ein Schreiben aus dem Antrags-Generator.</p><RouterLink class="button secondary" to="/antraege">Antrag erstellen</RouterLink></div>
</template>
