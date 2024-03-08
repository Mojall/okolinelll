import Home from '../pages/Home.vue';
import { createRouter, createWebHistory } from 'vue-router';
import RegisterForm from '../pages/RegisterForm.vue'
import MyLogin from '../pages/MyLogin.vue';
import PaymentPage from '../pages/PaymentPage.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
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
        path: '/payment-page',
        component: PaymentPage
    }
]
});


export default router;
