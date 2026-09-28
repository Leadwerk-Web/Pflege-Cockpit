<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { store, activePerson } from './lib/store'

const route = useRoute()
const menuOpen = ref(false)
const person = computed(() => activePerson())
const navigation = [
  ['/', 'Übersicht', 'grid'], ['/netzwerk', 'Pflegenetzwerk', 'people'],
  ['/pflegegrad', 'Pflegegrad-Rechner', 'pulse'], ['/budget', 'Pflegebudget', 'wallet'],
  ['/verhinderungspflege', 'Verhinderungspflege', 'clock'], ['/nachbarschaftshilfe', 'Nachbarschaftshilfe', 'hands'],
  ['/antraege', 'Anträge & Vollmachten', 'file'], ['/dokumente', 'Pflege-Dokumente', 'folder'],
]
function closeMenu() { menuOpen.value = false }
function handleEscape(event) { if (event.key === 'Escape') closeMenu() }
watch(() => route.fullPath, closeMenu)
watch(menuOpen, (open) => document.body.classList.toggle('menu-open', open))
onMounted(() => window.addEventListener('keydown', handleEscape))
onBeforeUnmount(() => { window.removeEventListener('keydown', handleEscape); document.body.classList.remove('menu-open') })
</script>

<template>
  <div class="app-shell">
    <a class="skip-link" href="#main-content">Zum Inhalt springen</a>
    <aside id="main-navigation" class="sidebar" :class="{ open: menuOpen }">
      <RouterLink class="brand" to="/" @click="closeMenu"><span class="brand-mark">+</span><span>Pflege-Cockpit</span></RouterLink>
      <nav aria-label="Hauptnavigation">
        <RouterLink v-for="item in navigation" :key="item[0]" :to="item[0]" @click="menuOpen = false">
          <span class="nav-icon" aria-hidden="true">{{ item[2] === 'grid' ? '⌂' : item[2] === 'people' ? '◎' : item[2] === 'pulse' ? '∿' : item[2] === 'wallet' ? '€' : item[2] === 'clock' ? '◷' : item[2] === 'hands' ? '◇' : item[2] === 'file' ? '▤' : '□' }}</span>
          {{ item[1] }}
        </RouterLink>
      </nav>
      <div class="privacy-note"><strong>Lokal & privat</strong><span>Alle Daten bleiben in diesem Browser.</span></div>
    </aside>
    <main id="main-content">
      <header class="topbar">
        <button class="menu-button" type="button" aria-controls="main-navigation" :aria-expanded="menuOpen" :aria-label="menuOpen ? 'Navigation schließen' : 'Navigation öffnen'" @click="menuOpen = !menuOpen">☰</button>
        <div><p class="eyebrow">{{ route.meta.title }}</p><h1>{{ route.meta.title }}</h1></div>
        <label class="person-switch"><span>Aktiver Pflegefall</span><select v-model="store.activePersonId"><option v-for="p in store.people" :key="p.id" :value="p.id">{{ p.firstName }} {{ p.lastName }} · PG {{ p.degree }}</option></select></label>
      </header>
      <section class="page"><RouterView :key="person?.id" /></section>
    </main>
    <button v-if="menuOpen" class="backdrop" type="button" aria-label="Navigation schließen" @click="closeMenu"></button>
  </div>
</template>
