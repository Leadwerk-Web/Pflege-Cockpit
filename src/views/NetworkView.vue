<script setup>
import { reactive, ref } from 'vue'
import { store, uid } from '../lib/store'

const showPerson = ref(false)
const showContact = ref(false)
const personForm = reactive({ firstName: '', lastName: '', birthday: '', degree: 1, insurer: '', insuranceNumber: '', street: '', zip: '', city: '', phone: '', email: '' })
const contactForm = reactive({ name: '', role: 'Angehörige Pflegeperson', phone: '', email: '' })
function addPerson() { store.people.push({ id: uid('person'), ...personForm }); showPerson.value = false; Object.assign(personForm, { firstName: '', lastName: '', birthday: '', degree: 1, insurer: '', insuranceNumber: '', street: '', zip: '', city: '', phone: '', email: '' }) }
function addContact() { store.contacts.push({ id: uid('contact'), personId: store.activePersonId, ...contactForm }); showContact.value = false; Object.assign(contactForm, { name: '', role: 'Angehörige Pflegeperson', phone: '', email: '' }) }
function removePerson(id) { if (store.people.length < 2) return; if (confirm('Pflegefall und seine Zuordnung wirklich entfernen?')) { store.people = store.people.filter((p) => p.id !== id); if (store.activePersonId === id) store.activePersonId = store.people[0].id } }
</script>
<template>
  <div class="section-heading"><div><p>Personen, Rollen und Kontakte</p><h2>Ihr Pflegenetzwerk</h2></div><button class="button primary" @click="showPerson = !showPerson">+ Pflegefall anlegen</button></div>
  <form v-if="showPerson" class="panel form-grid" @submit.prevent="addPerson">
    <h3 class="full">Pflegebedürftige Person</h3>
    <label>Vorname<input v-model.trim="personForm.firstName" required /></label><label>Nachname<input v-model.trim="personForm.lastName" required /></label>
    <label>Geburtsdatum<input v-model="personForm.birthday" type="date" required /></label><label>Pflegegrad<select v-model.number="personForm.degree"><option v-for="n in 6" :key="n-1" :value="n-1">{{ n-1 }}</option></select></label>
    <label>Pflegekasse<input v-model.trim="personForm.insurer" /></label><label>Versichertennummer<input v-model.trim="personForm.insuranceNumber" /></label>
    <label>Straße<input v-model.trim="personForm.street" /></label><label>PLZ / Ort<span class="split"><input v-model.trim="personForm.zip" inputmode="numeric" /><input v-model.trim="personForm.city" /></span></label>
    <div class="full form-actions"><button class="button ghost" type="button" @click="showPerson=false">Abbrechen</button><button class="button primary">Speichern</button></div>
  </form>
  <div class="cards-grid">
    <article v-for="person in store.people" :key="person.id" class="panel person-card">
      <div class="avatar">{{ person.firstName[0] }}{{ person.lastName[0] }}</div><div class="person-main"><span class="pill">Pflegegrad {{ person.degree }}</span><h3>{{ person.firstName }} {{ person.lastName }}</h3><p>{{ person.birthday || 'Geburtsdatum offen' }} · {{ person.insurer || 'Pflegekasse offen' }}</p><p>{{ person.street }} {{ person.zip }} {{ person.city }}</p></div>
      <button class="icon-button" title="Als aktiven Fall wählen" @click="store.activePersonId=person.id">{{ store.activePersonId === person.id ? '✓' : '→' }}</button><button class="text-danger" :disabled="store.people.length < 2" @click="removePerson(person.id)">Entfernen</button>
    </article>
  </div>
  <div class="section-heading compact"><div><p>Zugeordnet zum aktiven Pflegefall</p><h2>Pflegepersonen & Kontakte</h2></div><button class="button secondary" @click="showContact=!showContact">+ Kontakt</button></div>
  <form v-if="showContact" class="panel inline-form" @submit.prevent="addContact"><label>Name<input v-model.trim="contactForm.name" required /></label><label>Rolle<select v-model="contactForm.role"><option>Angehörige Pflegeperson</option><option>Pflegedienst</option><option>Hausarzt</option><option>Pflegeberatung</option><option>Sonstige</option></select></label><label>Telefon<input v-model.trim="contactForm.phone" /></label><button class="button primary">Speichern</button></form>
  <div v-if="store.contacts.filter(c=>c.personId===store.activePersonId).length" class="table-wrap panel"><table><thead><tr><th>Name</th><th>Rolle</th><th>Telefon</th><th></th></tr></thead><tbody><tr v-for="contact in store.contacts.filter(c=>c.personId===store.activePersonId)" :key="contact.id"><td>{{ contact.name }}</td><td>{{ contact.role }}</td><td>{{ contact.phone || '—' }}</td><td><button class="text-danger" @click="store.contacts.splice(store.contacts.indexOf(contact),1)">Löschen</button></td></tr></tbody></table></div><div v-else class="empty panel"><span>◎</span><strong>Noch keine Kontakte</strong><p>Erfassen Sie Angehörige, Pflegedienste oder Beratungsstellen.</p></div>
</template>
