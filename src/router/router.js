import Home from '../pages/Home.vue';
import { createRouter, createWebHistory } from 'vue-router';
// import RegisterForm from "../pages/RegisterForm.vue";
import MyLogin from '../pages/MyLogin.vue';
import PaymentPage from '../pages/PaymentPage.vue';
import AccountStatus from '../pages/AccountStatus.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        // {
        //     path: "/registerForm",
        //     component: RegisterForm,
        //     meta: {
        //         showNavBar: false,
        //         showSideBar: false,
        //     },
        // },
        {
            path: '/my-login',
            component: MyLogin,
            meta: {
                showNavBar: false,
                showSideBar: false,
                guest: true,
            },
        },
        {
            path: '/payment-page',
            component: PaymentPage,
            meta: {
                requiresAuth: true,
            },
        },
        {
            path: '/account-status',
            component: AccountStatus,
            meta: {
                requiresAuth: true,
            },
        },
    ],
});

export default router;
