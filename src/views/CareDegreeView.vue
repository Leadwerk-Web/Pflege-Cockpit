<script setup>
import { computed, reactive, ref } from 'vue'
import { modules, therapyQuestions, outsideQuestions, householdQuestions } from '../data/questions'
import { calculateAssessment } from '../lib/calculations'
import { activePerson, store, uid } from '../lib/store'

const step = ref('m1')
const special = ref(false)
const saved = ref(false)
const answers = reactive(Object.fromEntries(modules.map((module) => [module.key, Array(module.questions.length).fill(null)])))
answers.m5 = therapyQuestions.map(() => ({ daily: 0, weekly: 0, monthly: 0 }))
answers.m5.push({ points: 0 })
answers.m7 = Array(outsideQuestions.length).fill(0)
answers.m8 = Array(householdQuestions.length).fill(0)
const person = computed(() => activePerson())
const child = computed(() => { if (!person.value?.birthday) return false; const born = new Date(person.value.birthday); const now = new Date(); return (now.getFullYear()-born.getFullYear())*12 + now.getMonth()-born.getMonth() < 18 })
const result = computed(() => calculateAssessment(answers, special.value, child.value))
const activeModule = computed(() => modules.find((module) => module.key === step.value))
const incomplete = computed(() => modules.some((module) => answers[module.key].some((answer) => answer === null)))
const completedCount = computed(() => modules.reduce((total, module) => total + answers[module.key].filter((a) => a !== null).length, 0))
const totalCount = modules.reduce((total, module) => total + module.questions.length, 0)
function save() { if (incomplete.value) return; store.assessments.push({ id: uid('assessment'), personId: person.value.id, date: new Date().toISOString().slice(0,10), answers: JSON.parse(JSON.stringify(answers)), special: special.value, result: result.value }); person.value.degree = result.value.degree; saved.value = true }
function fillZero() { modules.forEach((module) => answers[module.key].fill(0)); answers.m5.forEach((row) => Object.keys(row).forEach((key) => row[key] = 0)) }
</script>
<template>
  <div class="calculator-layout">
    <div class="calculator-main">
      <div class="section-heading"><div><p>Strukturierte Selbsteinschätzung</p><h2>Pflegegrad ermitteln</h2></div><button class="button ghost" @click="fillZero">Alle auf 0 setzen</button></div>
      <div class="step-tabs" role="tablist">
        <button v-for="module in modules.slice(0,4)" :key="module.key" :class="{ active: step===module.key }" @click="step=module.key"><span>{{ module.key.slice(1) }}</span>{{ module.short }}</button>
        <button :class="{ active: step==='m5' }" @click="step='m5'"><span>5</span>Therapie</button>
        <button v-for="module in modules.slice(4)" :key="module.key" :class="{ active: step===module.key }" @click="step=module.key"><span>{{ module.key.slice(1) }}</span>{{ module.short }}</button>
        <button :class="{ active: step==='extra' }" @click="step='extra'"><span>+</span>Unterwegs & Haushalt</button>
      </div>
      <article v-if="activeModule" class="panel questionnaire">
        <div class="panel-heading"><div><p class="eyebrow">{{ activeModule.questions.length }} Kriterien</p><h3>{{ activeModule.title }}</h3></div><span class="score-chip">{{ result.scores[activeModule.key] }} Punkte</span></div>
        <div v-for="(question,index) in activeModule.questions" :key="question.label" class="question-row">
          <div><small>{{ activeModule.key.slice(1) }}.{{ index+1 }}</small><strong>{{ question.label }}</strong></div>
          <select v-model="answers[activeModule.key][index]" :aria-label="question.label"><option :value="null" disabled>Bitte wählen</option><option v-for="option in question.options" :key="option.label" :value="option.value">{{ option.label }}</option></select>
        </div>
      </article>
      <article v-else-if="step==='m5'" class="panel questionnaire">
        <div class="panel-heading"><div><p class="eyebrow">Häufigkeiten</p><h3>5. Umgang mit Krankheit und Therapie</h3></div><span class="score-chip">{{ result.scores.m5 }} Punkte</span></div>
        <div class="therapy-head"><span>Maßnahme</span><span>täglich</span><span>wöchentlich</span><span>monatlich</span></div>
        <div v-for="(question,index) in therapyQuestions" :key="question" class="therapy-row"><strong>{{ question }}</strong><input v-model.number="answers.m5[index].daily" type="number" min="0" :disabled="index>=12" aria-label="täglich" /><input v-model.number="answers.m5[index].weekly" type="number" min="0" aria-label="wöchentlich" /><input v-model.number="answers.m5[index].monthly" type="number" min="0" aria-label="monatlich" /></div>
        <label class="field-full">Diät oder therapiebedingte Vorschriften<select v-model.number="answers.m5[16].points"><option :value="0">selbständig</option><option :value="1">überwiegend selbständig</option><option :value="2">überwiegend unselbständig</option><option :value="3">unselbständig</option></select></label>
      </article>
      <article v-else class="panel questionnaire"><div class="panel-heading"><div><p class="eyebrow">Nicht gewichtet</p><h3>Außerhäusliche Aktivitäten & Haushaltsführung</h3></div></div><h4>Außerhäusliche Aktivitäten</h4><div v-for="(question,index) in outsideQuestions" :key="question" class="question-row"><strong>{{ question }}</strong><select v-model.number="answers.m7[index]"><option :value="0">selbständig</option><option :value="1">mit Unterstützung</option><option :value="2">nur begleitet</option><option :value="3">nicht möglich</option></select></div><h4>Haushaltsführung</h4><div v-for="(question,index) in householdQuestions" :key="question" class="question-row"><strong>{{ question }}</strong><select v-model.number="answers.m8[index]"><option :value="0">selbständig</option><option :value="1">mit Unterstützung</option><option :value="2">überwiegend übernommen</option><option :value="3">vollständig übernommen</option></select></div></article>
    </div>
    <aside class="result-panel panel sticky">
      <p class="eyebrow">Aktuelle Einschätzung</p><div class="degree-orbit"><span>PG</span><strong>{{ result.degree }}</strong></div><h3>{{ result.degree ? `Pflegegrad ${result.degree}` : 'Noch kein Pflegegrad' }}</h3><p class="result-points">{{ result.total.toLocaleString('de-DE') }} <small>von 100 Punkten</small></p>
      <div class="progress"><span :style="{width:`${result.total}%`}"></span></div><p class="muted">{{ completedCount }} von {{ totalCount }} Auswahlfragen beantwortet</p>
      <label class="check-card"><input v-model="special" type="checkbox" /><span><strong>Besondere Bedarfskonstellation</strong><small>Beide Arme und Beine sind gebrauchsunfähig.</small></span></label>
      <dl class="score-list"><template v-for="module in modules.slice(0,4)" :key="module.key"><dt>{{ module.short }}</dt><dd>{{ result.scores[module.key] }}</dd></template><dt>Therapie</dt><dd>{{ result.scores.m5 }}</dd><template v-for="module in modules.slice(4)" :key="module.key"><dt>{{ module.short }}</dt><dd>{{ result.scores[module.key] }}</dd></template></dl>
      <button class="button primary full-width" :disabled="incomplete" @click="save">Berechnung speichern</button><p v-if="incomplete" class="validation">Bitte alle Auswahlfragen beantworten.</p><p v-if="saved" class="success">Gespeichert und in die Stammdaten übernommen.</p><small class="legal-note">Die Selbsteinschätzung ersetzt keine Begutachtung durch den Medizinischen Dienst.</small>
    </aside>
  </div>
</template>
