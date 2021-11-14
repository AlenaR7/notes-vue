import Vue from 'vue'
import VueRouter from 'vue-router'
import NotesUI from '../components/NotesUI.vue'
import ChangeNotesUI from '../components/ChangeNotesUI.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'NotesUI',
    component: NotesUI
  },
  {
    path: '/change/:id',
    name: 'ChangeNotesUI',
    component: ChangeNotesUI
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
