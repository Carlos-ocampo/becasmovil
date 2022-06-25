import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import LoginView from '../views/LoginView.vue'
import ManagePaisView from '../views/ManagePaisView.vue'
import ManageUniversidaView from '../views/ManageUnivarsidades.vue'
import ManageBecasView from '../views/ManageBecasView.vue'
// import PaisesView from '../views/PaisesView.vue'
// import About from '../views/About.vue'
// import Dashboard from '../views/Dashboard.vue'

const routes = [
    {path: '/', name: 'Home', component: HomeView},
    {path: '/login', name: 'Login', component: LoginView},
    {path: '/paises', name: 'Paises', component: ManagePaisView},
    {path: '/universidades', name: 'universidades', component: ManageUniversidaView},
    {path: '/becas', name: 'becas', component: ManageBecasView},
    // {path: '/paises', name: 'Paises', component: PaisesView},
    // {path: '/about', name: 'About', component: About},
    // {path: '/dashboard', name: 'Dashboard', component: Dashboard}
]

// router
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router