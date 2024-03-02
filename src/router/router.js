import Home from '../pages/Home.vue';
import { createRouter, createWebHistory } from 'vue-router';
import RegisterForm from '../pages/RegisterForm.vue'
import MyLogin from '../pages/MyLogin.vue';
import MyTest from '../pages/MyTest.vue';
import PaymentPage from '../pages/PaymentPage.vue';


const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/registerForm',
        component: RegisterForm
    },
    {
        path: '/my-login',
        component: MyLogin
    },
    {
        path: '/my-test',
        component: MyTest
    },
    {
        path: '/payment-page',
        component: PaymentPage
    }
]

const router = createRouter( {
    routes,
    history: createWebHistory()
})

export default router;
