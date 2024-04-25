<template>
    <div class="wrapper">
        <div class="log_container">
            <h2 class="log-title">Вход</h2>
            <form @submit.prevent="submitForm">
                <div class="form-group">
                    <label for="login">Логин</label>
                    <el-input size="large" v-model="form.login" type="text" id="login"/>
                </div>
                <div class="form-group">
                    <label for="password">Пароль</label>
                    <el-input
                        size="large"
                        v-model="form.password"
                        type="password"
                        id="password"
                    />
                </div>
                <div class="form-group">
                    <button type="submit" :disabled="loading">
                        <span v-if="loading">
                            <i class="loading-icon el-icon-loading"></i> Загрузка...
                        </span>
                        <span v-else>Войти</span>
                    </button>
                </div>
            </form>
            <!--        <p>-->
            <!--            Нет аккаунта?-->
            <!--            <router-link class="link" to="/RegisterForm"-->
            <!--            >Зарегистрироваться</router-link-->
            <!--            >-->
            <!--        </p>-->
        </div>
    </div>
</template>

<script setup>
import { form, loginForm, refreshAccessToken, resetForm, setTokens } from '../api/auth.js';
import { useRouter } from 'vue-router';
import store from '../store/store.js';
import Cookies from 'js-cookie';
import { ref } from 'vue';

const router = useRouter();
const isSubmitting = ref(false);
const loading = ref(false);

const submitForm = async () => {
    if (isSubmitting.value) {
        return;
    }
    try {
        isSubmitting.value = true;

        loading.value = true;

        await loginForm();
        resetForm();
        store.commit('setLoggedIn', true);

        const jwtToken = Cookies.get('jwtToken');
        const refreshTokenValue = Cookies.get('refreshToken');
        if (jwtToken && refreshTokenValue) {
            refreshAccessToken(refreshTokenValue)
                .then((newToken) => {
                    setTokens(newToken, refreshTokenValue);
                })
                .catch((error) => {
                    console.error('Ошибка при обновлении токена:', error);
                });
        }
        await router.push('/');
    } catch (error) {
    } finally {
        isSubmitting.value = false;

        loading.value = false
    }
};
</script>
<style lang="sass" scoped>
@import "../assets/styles/main"
.log_container
    display: flex
    position: relative
    flex-direction: column
    justify-content: center
    margin: 150px auto
    align-items: center
    width: 458px
    height: 657px
    border-radius: 20px
    background-color: #ffffff
    box-shadow: 0 4px 16px rgba(0, 51, 153, .9), 0 2px 2px rgba(0, 51, 153, .08)

.form-group
    margin-bottom: 20px

label
    display: block
    margin-bottom: 5px
    color: rgba(64, 58, 75, 0.8)

input[type="email"],
input[type="password"]
    width: 273px
    height: 40px
    padding: 8px
    font-size: 16px
    border-radius: 7px
    border: none
    background-color: rgba(64, 158, 255, 0.1)

button[type="submit"]
    margin-top: 17px
    padding: 8px
    width: 273px
    height: 40px


.log-title
    font-size: 24px

.el-alert
    margin: 20px 0 0

.el-alert:first-child
    margin: 0
</style>
