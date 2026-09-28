<script setup>
import { computed, reactive, watch } from 'vue'
import { activePerson, store } from '../lib/store'
import { benefits, combination, euro } from '../lib/calculations'

const months = ['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember']
const year = new Date().getFullYear()
const person = computed(() => activePerson())
const key = computed(() => `${person.value.id}-${year}`)
const createMonths = () => months.map(() => ({ degree: person.value.degree, plannedInKind: 0, inKind: 0, conversion: 0, reliefSpent: 0, dayCare: 0 }))
if (!store.budgets[key.value]) store.budgets[key.value] = createMonths()
const plan = computed(() => store.budgets[key.value])
watch(() => person.value.id, () => { if (!store.budgets[key.value]) store.budgets[key.value] = createMonths() })
const results = computed(() => plan.value.map((row) => ({ ...combination(row.degree, row.inKind, row.conversion), rule: benefits[row.degree] })))
const totals = computed(() => results.value.reduce((sum,row,index) => ({ cash: sum.cash+row.cash, planned: sum.planned+Number(plan.value[index].plannedInKind||0), inKind: sum.inKind+Number(plan.value[index].inKind||0), relief: sum.relief+row.rule.relief-Number(plan.value[index].reliefSpent||0) }), { cash:0,planned:0,inKind:0,relief:0 }))
</script>
<template>
  <div class="section-heading"><div><p>Plan und tatsächliche Ausgaben · {{ year }}</p><h2>Pflegebudget optimieren</h2></div><button class="button ghost" @click="print()">Jahresübersicht drucken</button></div>
  <div class="metrics-grid three"><article class="metric-card accent"><span>Pflegegeld im Jahr</span><strong>{{ euro(totals.cash) }}</strong><small>nach tatsächlicher Kombinationsleistung</small></article><article class="metric-card"><span>Sachleistung Plan / Ist</span><strong>{{ euro(totals.planned) }} / {{ euro(totals.inKind) }}</strong><small>Summe aller Monate</small></article><article class="metric-card"><span>Entlastungsbetrag rechnerisch</span><strong>{{ euro(Math.max(0,totals.relief)) }}</strong><small>vor Übertrag und Verfallsprüfung</small></article></div>
  <article class="panel budget-table"><div class="panel-heading"><div><p class="eyebrow">Monatsplanung</p><h3>Geld- und Sachleistungen kombinieren</h3></div><span class="pill">Automatisch gespeichert</span></div>
    <div class="table-wrap desktop-budget-table"><table><thead><tr><th>Monat</th><th>PG</th><th>Sachleistung Plan</th><th>Sachleistung Ist</th><th>Umwandlung Ist</th><th>Pflegegeld</th><th>Quote</th><th>Entlastung ausgegeben</th></tr></thead><tbody><tr v-for="(row,index) in plan" :key="months[index]"><td><strong>{{ months[index] }}</strong></td><td><select v-model.number="row.degree"><option v-for="n in 6" :key="n-1" :value="n-1">{{ n-1 }}</option></select></td><td><div class="money-input"><span>€</span><input v-model.number="row.plannedInKind" type="number" min="0" :max="results[index].rule.inKind" step="0.01" /></div><small>max. {{ euro(results[index].rule.inKind) }}</small></td><td><div class="money-input"><span>€</span><input v-model.number="row.inKind" type="number" min="0" step="0.01" /></div><small v-if="results[index].ownCost" class="danger">inkl. {{ euro(results[index].ownCost) }} privat</small></td><td><div class="money-input"><span>€</span><input v-model.number="row.conversion" type="number" min="0" :max="results[index].conversionMax" step="0.01" /></div><small>max. {{ euro(results[index].conversionMax) }}</small></td><td><strong>{{ euro(results[index].cash) }}</strong></td><td><span class="usage"><i :style="{width:`${Math.min(100,results[index].ratio)}%`}"></i></span><small>{{ results[index].ratio }} %</small></td><td><div class="money-input"><span>€</span><input v-model.number="row.reliefSpent" type="number" min="0" step="0.01" /></div></td></tr></tbody></table></div>
    <div class="budget-mobile-list">
      <details v-for="(row,index) in plan" :key="`mobile-${months[index]}`" :open="index === 0">
        <summary><span><small>Monat</small><strong>{{ months[index] }}</strong></span><span><small>Pflegegeld</small><strong>{{ euro(results[index].cash) }}</strong></span></summary>
        <div class="budget-card-grid">
          <label>Pflegegrad<select v-model.number="row.degree"><option v-for="n in 6" :key="n-1" :value="n-1">{{ n-1 }}</option></select></label>
          <label>Sachleistung geplant<div class="money-input"><span>€</span><input v-model.number="row.plannedInKind" type="number" min="0" :max="results[index].rule.inKind" step="0.01" /></div><small>Bis {{ euro(results[index].rule.inKind) }}</small></label>
          <label>Sachleistung tatsächlich<div class="money-input"><span>€</span><input v-model.number="row.inKind" type="number" min="0" step="0.01" /></div><small v-if="results[index].ownCost" class="danger">{{ euro(results[index].ownCost) }} privat</small></label>
          <label>Umwandlung tatsächlich<div class="money-input"><span>€</span><input v-model.number="row.conversion" type="number" min="0" :max="results[index].conversionMax" step="0.01" /></div><small>Bis {{ euro(results[index].conversionMax) }}</small></label>
          <label>Entlastungsbetrag ausgegeben<div class="money-input"><span>€</span><input v-model.number="row.reliefSpent" type="number" min="0" step="0.01" /></div></label>
          <div class="budget-card-result"><span><small>Verbrauchsquote</small><strong>{{ results[index].ratio }} %</strong></span><span><small>Pflegegeld</small><strong>{{ euro(results[index].cash) }}</strong></span></div>
        </div>
      </details>
    </div>
  </article>
  <div class="info-banner"><strong>Gemeinsamer Jahresbetrag: {{ euro(3539) }}</strong><span>Verhinderungs- und Kurzzeitpflege greifen auf denselben Jahrestopf zu. Buchungen werden im Rechner für Verhinderungspflege erfasst.</span><RouterLink to="/verhinderungspflege">Öffnen →</RouterLink></div>
</template>
