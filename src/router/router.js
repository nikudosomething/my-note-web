import { createRouter, createWebHistory } from 'vue-router'
import AddNote from '../components/AddNote.vue'
import EditNote from '../components/EditNote.vue'
import NoteGrid from '../components/NoteGrid.vue'
import SearchNote from '../components/SearchNote.vue'

const routes = [
  { path: '/', name: 'home', component:NoteGrid },
  { path: '/addNote', name: 'AddNote', component:AddNote },
  { path: '/edit/:id', name: 'EditNote', component:EditNote },
  { path: '/search', name: 'search', component:SearchNote }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router