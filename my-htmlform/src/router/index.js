import {createRouter, createWebHistory} from 'vue-router'
import myForm from '../components/myForm.vue'
import MyLogin from '../components/myLogin.vue'

const routes = [
    {path: '/form', component: myForm},
    {path: '/', component: MyLogin},
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: routes,
    linkActiveClass: 'active'
})

export default router;