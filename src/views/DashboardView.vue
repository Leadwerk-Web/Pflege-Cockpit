<script setup>
import { computed } from 'vue'
import MetricCard from '../components/MetricCard.vue'
import { activePerson, store } from '../lib/store'
import { benefits, euro } from '../lib/calculations'

const person = computed(() => activePerson())
const rule = computed(() => benefits[person.value?.degree || 0])
const assessment = computed(() => store.assessments.filter((item) => item.personId === person.value?.id).at(-1))
const recentDocs = computed(() => store.documents.filter((item) => item.personId === person.value?.id).slice(-3).reverse())
</script>
<template>
  <div class="welcome-row">
    <div><p class="eyebrow coral">Guten Tag, {{ person.firstName }}</p><h2>Was steht heute an?</h2><p>Alle Ansprüche, Berechnungen und Unterlagen für {{ person.firstName }} {{ person.lastName }} an einem Ort.</p></div>
    <RouterLink class="button primary" to="/pflegegrad">Pflegegrad einschätzen <span>→</span></RouterLink>
  </div>
  <div class="metrics-grid">
    <MetricCard label="Aktueller Pflegegrad" :value="`Pflegegrad ${person.degree}`" :hint="assessment ? `${assessment.result.total} gewichtete Punkte` : 'aus den Stammdaten'" accent />
    <MetricCard label="Pflegegeld" :value="euro(rule.cash)" hint="pro Monat" />
    <MetricCard label="Entlastungsbetrag" :value="euro(rule.relief)" hint="pro Monat, ansparbar" />
    <MetricCard label="Gemeinsamer Jahresbetrag" :value="person.degree >= 2 ? euro(3539) : 'Kein Anspruch'" hint="Verhinderungs- & Kurzzeitpflege" />
  </div>
  <div class="dashboard-grid">
    <article class="panel progress-panel">
      <div class="panel-heading"><div><p class="eyebrow">Schnellzugriff</p><h3>Pflege organisieren</h3></div></div>
      <div class="action-list">
        <RouterLink to="/budget"><span class="action-number">01</span><span><strong>Jahresbudget planen</strong><small>Geld- und Sachleistungen kombinieren</small></span><b>→</b></RouterLink>
        <RouterLink to="/verhinderungspflege"><span class="action-number">02</span><span><strong>Vertretung abrechnen</strong><small>Erstattung und Restbudget berechnen</small></span><b>→</b></RouterLink>
        <RouterLink to="/antraege"><span class="action-number">03</span><span><strong>Antrag vorbereiten</strong><small>Druckfertiges Schreiben erstellen</small></span><b>→</b></RouterLink>
      </div>
    </article>
    <article class="panel">
      <div class="panel-heading"><div><p class="eyebrow">Ablage</p><h3>Letzte Dokumente</h3></div><RouterLink to="/dokumente">Alle anzeigen</RouterLink></div>
      <div v-if="recentDocs.length" class="document-list"><div v-for="doc in recentDocs" :key="doc.id"><span class="doc-icon">PDF</span><span><strong>{{ doc.name }}</strong><small>{{ doc.category }} · {{ doc.date }}</small></span></div></div>
      <div v-else class="empty"><span>□</span><strong>Noch keine Dokumente</strong><p>Erzeugte Anträge und hochgeladene Belege erscheinen hier.</p></div>
    </article>
  </div>
</template>
