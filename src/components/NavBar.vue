<template>
    <div class="container">
        <header class="header">
            <div class="left-btns">
                <button @click.self="toggleCollapse" class="menu-btn"></button>
                <a class="link logo" href="/" @click.stop>OKOLINE</a>
            </div>
            <div class="nav-btns">
                <el-button v-if="!isLoggedIn" class="form-btn" @click="registerForm">Регистрация</el-button>
                <el-button v-if="!isLoggedIn" class="form-btn" @click="isLoginForm">Вход</el-button>
            </div>
                <el-button v-if="isLoggedIn" class="form-btn" @click="logout">Выход</el-button>
        </header>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const isCollapse = ref(true);

const logout = () => {
    store.commit('setLoggedIn', false);
}
const registerForm = () => {
    router.push('/registerForm');
};

const isLoginForm = () => {
    router.push('/my-login');
};
const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value;
};

const isLoggedIn = computed(() => store.state.isLoggedIn);

</script>


<style lang="sass" scoped>
@import "src/assets/styles/main"

.container
    width: 100%
.header
    display: flex
    margin-top: 10px
    justify-content: space-between
    box-shadow: 0 4px 16px rgba(0,51,153,.04),0 2px 2px rgba(0,51,153,.08)

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

.logo
    margin: 0 0 8px 25px
    font-size: 22px

.nav-btns
    margin: 0 15px 10px

.logIn
    display: none

.form-btn
    border: none
    border-radius: 7px
    background-color: rgb(64, 158, 255)
    color: #ffffff
    cursor: pointer

    &:hover
        background-color: darken(rgb(64,158,255), 10%)
    &:active
        background-color: darken(rgb(64,158,255), 20%)
</style>
