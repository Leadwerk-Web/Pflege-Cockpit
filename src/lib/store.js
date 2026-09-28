import { reactive, watch } from 'vue'

const defaultState = {
  people: [{ id: 'erika', firstName: 'Erika', lastName: 'Beispiel', birthday: '1948-04-12', degree: 2, insurer: 'Beispiel-Pflegekasse', insuranceNumber: 'TEST-4711', phone: '', email: '', street: '', zip: '', city: '' }],
  contacts: [],
  providers: [],
  activePersonId: 'erika',
  assessments: [],
  budgets: {},
  respiteEntries: [],
  neighborEntries: [],
  documents: [],
}

function load() {
  try { return { ...structuredClone(defaultState), ...JSON.parse(localStorage.getItem('pflege-cockpit-state-v1') || '{}') } }
  catch { return structuredClone(defaultState) }
}

export const store = reactive(load())
watch(store, (value) => localStorage.setItem('pflege-cockpit-state-v1', JSON.stringify(value)), { deep: true })
export function activePerson() { return store.people.find((person) => person.id === store.activePersonId) || store.people[0] }
export function uid(prefix = 'item') { return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}` }
