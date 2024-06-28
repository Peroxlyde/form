import Vue from 'vue'
import Router from 'vue-router'
import myForm from './myForm.vue'
import MyLogin from './myLogin.vue'

Vue.use(Router)


export default new Router({
    routes:[
        {path:'/form', component: myForm },
        {path:'/login', component: MyLogin },
    ]
})