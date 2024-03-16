import Home from '../pages/Home.vue';
import { createRouter, createWebHistory } from 'vue-router';
import RegisterForm from '../pages/RegisterForm.vue'
import MyLogin from '../pages/MyLogin.vue';
import PaymentPage from '../pages/PaymentPage.vue';
import AccountStatus from '../pages/AccountStatus.vue';


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
        component: RegisterForm,
        meta: {
            showNavBar: false,
            showSideBar: false,
        },
    },
    {
        path: '/my-login',
        component: MyLogin,
        meta: {
            showNavBar: false,
            showSideBar: false,
        },
    },
    {
        path: '/payment-page',
        component: PaymentPage
    },
    {
        path: '/account-status',
        component: AccountStatus
    }
]
});


export default router;
