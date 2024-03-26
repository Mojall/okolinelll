<template>
    <div class="log_container">
        <button class="close-button" @click="closeForm"></button>
        <h2 class="log-title">Вход</h2>
        <form @submit.prevent="loginForm">
            <div class="form-group">
                <label for="email">Почта</label>
                <el-input size="large" v-model="form.email" type="email" id="email" />
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <el-input size="large" v-model="form.password"  type="password" id="password" />
            </div>
            <div class="form-group">
                <button type="submit">Войти</button>
            </div>
        </form>
        <p>Нет аккаунта? <router-link class="link" to="/RegisterForm">Зарегистрироваться</router-link> </p>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { ElNotification } from 'element-plus';
import { useRouter } from 'vue-router'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useStore } from 'vuex';

const router = useRouter();
const store = useStore();

const closeForm = () => {
    router.push('/')
}

const form = reactive({
    email: '',
    password: '',
});

const loginForm = async () => {
    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
        const user = userCredential.user;

        ElNotification({
            title: 'Успех',
            message: 'Вход выполнен успешно',
            type: 'success'
        });
        await router.push('/')
        store.commit('setLoggedIn', true)
    } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    ElNotification({
        title: 'Ошибка',
        message: 'Неверный email или пароль',
        type: 'error'
    });
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
    box-shadow: 0 4px 16px rgba(0,51,153,.9),0 2px 2px rgba(0,51,153,.08)

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
