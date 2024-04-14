<template>
    <div class="container">
        <header class="header">
            <div class="left-btns">
                <button @click="toggleCollapse" class="menu-btn"></button>
                <router-link class="link logo" to="/">OKOLINE</router-link>
            </div>
            <div class="nav-btns">
                <!--                <el-button v-if="!isLoggedIn"  class="form-btn" @click="registerForm"-->
                <!--                >Регистрация</el-button-->
                <!--                >-->
                <router-link to="/payment-page">
                    <el-button v-if="isLoggedIn" class="balance"><strong>{{ formatAmount(userTariff.amount) }}₽</strong></el-button>
                </router-link>
                <el-button v-if="!isLoggedIn" class="form-btn" @click="isLoginForm"
                >Вход
                </el-button
                >
                <el-button v-if="isLoggedIn" class="form-btn" @click="logout"
                >Выход
                </el-button
                >
            </div>
        </header>
    </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { isLoggedIn } from '../main.js';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { formatAmount } from '../utils/utils.js';

const { emit } = getCurrentInstance();
const router = useRouter();
const store = useStore();

const isCollapse = ref(true);

const token = Cookies.get('jwtToken');
const decodeToken = jwtDecode(token);
const { user_data } = decodeToken;
const userTariff = user_data;

const logout = () => {
    store.commit('setLoggedIn', false);
    Cookies.remove('jwtToken');
    Cookies.remove('refreshToken');
    router.push('/');
};
// Переход на форму регистрации
// const registerForm = () => {
//     router.push("/registerForm");
// };

const isLoginForm = () => {
    router.push('/my-login');
};
const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value;
    emit('toggleCollapse');
};
</script>

<style lang="sass" scoped>
@import "src/assets/styles/main"

.container
    width: 100%

.header
    display: flex
    margin-top: 10px
    justify-content: space-between
    box-shadow: 0 4px 16px rgba(0, 51, 153, .04), 0 2px 2px rgba(0, 51, 153, .08)

.left-btns
    display: flex
    align-items: center

.menu-btn
    background-image: url("../assets/logo.svg")
    background-color: #ffffff
    background-repeat: no-repeat
    background-position: 50%
    border: none
    width: 24px
    height: 24px
    cursor: pointer
    text-align: center
    margin: 2px 0 10px 20px

    &:hover
        background-color: inherit

.balance
    border: none
    outline: none
    background-color: #fffefe
    color: #409eff
    box-shadow: 0 4px 16px rgba(0, 51, 153, .04), 0 2px 2px rgba(0, 51, 153, .08)

    &:hover
        background-color: inherit
        transform: scale(1.1)

    &:active
        transform: scale(1.0)

.logo
    margin: 0 0 8px 25px
    font-size: 22px

.nav-btns
    display: flex
    margin: 0 15px 10px
    gap: 10px

.logIn
    display: none

.form-btn
    border: none
    border-radius: 7px
    background-color: rgb(64, 158, 255)
    color: #ffffff
    cursor: pointer

    &:hover
        background-color: darken(rgb(64, 158, 255), 10%)

    &:active
        background-color: darken(rgb(64, 158, 255), 20%)
</style>
