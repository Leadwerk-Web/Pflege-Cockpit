import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import DashboardView from './views/DashboardView.vue'
import NetworkView from './views/NetworkView.vue'
import CareDegreeView from './views/CareDegreeView.vue'
import BudgetView from './views/BudgetView.vue'
import RespiteView from './views/RespiteView.vue'
import NeighborView from './views/NeighborView.vue'
import ApplicationsView from './views/ApplicationsView.vue'
import DocumentsView from './views/DocumentsView.vue'
import './styles.css'

const routes = [
  { path: '/', component: DashboardView, meta: { title: 'Übersicht' } },
  { path: '/netzwerk', component: NetworkView, meta: { title: 'Pflegenetzwerk' } },
  { path: '/pflegegrad', component: CareDegreeView, meta: { title: 'Pflegegrad-Rechner' } },
  { path: '/budget', component: BudgetView, meta: { title: 'Pflegebudget' } },
  { path: '/verhinderungspflege', component: RespiteView, meta: { title: 'Verhinderungspflege' } },
  { path: '/nachbarschaftshilfe', component: NeighborView, meta: { title: 'Nachbarschaftshilfe' } },
  { path: '/antraege', component: ApplicationsView, meta: { title: 'Anträge & Vollmachten' } },
  { path: '/dokumente', component: DocumentsView, meta: { title: 'Pflege-Dokumente' } },
]

const router = createRouter({ history: createWebHashHistory(), routes })
router.afterEach((route) => { document.title = `${route.meta.title} · Pflege-Cockpit` })

createApp(App).use(router).mount('#app')
