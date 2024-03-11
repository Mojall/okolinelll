<template>
    <div class="register_container">
        <button class="close-button" @click="closeForm"></button>
        <h2 class="reg-title">Регистрация</h2>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="email">Почта</label>
                <el-input
                    size="large"
                    v-model="regForm.email"
                    type="email"
                    id="email"
                    clearable
                />
            </div>
            <div  class="form-group">
                <label for="username">Имя пользователя</label>
                <el-input
                    size="large"
                    minlength="6"
                    v-model="regForm.username"
                    type="text"
                    id="username"
                    clearable
                />
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <el-input
                    minlength="8"
                    size="large"
                    v-model="regForm.password"
                    show-password
                    type="password"
                    id="password"
                    clearable

                />
            </div>
            <div class="form-group">
                <label for="confirmPassword">Подтверждение пароля</label>
                <el-input
                    size="large"
                    v-model="regForm.confirmPassword"
                    show-password
                    type="password"
                    id="confirmPassword"
                    clearable
                />
            </div>
            <div class="form-group">
                <button type="submit">Зарегистрировать</button>
            </div>
            <div class="line"></div>
        </form>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, email, sameAs, helpers } from '@vuelidate/validators';
import { ElNotification } from 'element-plus';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import router from '../router/router.js';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'; useRouter()

const store = useStore()

const regForm = reactive({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
});

const rules = computed(() => {
    return {
        email: {
            required,
            email
        },
        username: {
            required,
            minLength:minLength(6)
        },
        password: {
            required,
            minLength: minLength(8)
        },
        confirmPassword: {
            required,
            sameAs: sameAs(regForm.password)
        }
    }
})

const closeForm = () => {
    router.push('/')
}

const v$ = useVuelidate(rules, regForm)

const submitForm = async () => {
    const  result = await v$.value.$validate();
    if (result) {
        try {
            const auth = getAuth()
            const userCredential = await createUserWithEmailAndPassword(auth, regForm.email, regForm.password);
            const user = userCredential.user;
        ElNotification({
            title: 'Успех',
            message: 'Спасибо за регистрацию',
            type: 'success'
        })
            await router.push('/');
            store.commit('setLoggedIn', true)
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
        }
    } else {
        ElNotification({
            title: 'Ошибка',
            message: 'Что-то пошло не так',
            type: 'error'
        });
    }
}
</script>

<style lang="sass" scoped>
@import "../assets/styles/main"

.register_container
    display: flex
    position: relative
    flex-direction: column
    justify-content: center
    margin: 150px auto
    align-items: center
    width: 458px
    height: 657px
    border-radius: 20px
    box-shadow: 0 4px 16px rgba(0,51,153,.9),0 2px 2px rgba(0,51,153,.08)


.form-group
    margin-bottom: 20px


label
    display: block
    margin-bottom: 5px
    color: rgba(64, 58, 75, 0.8)

.el-input__wrapper
    border-radius: 7px
    background-color: rgba(64, 158, 255, 0.1)

button[type="submit"]
    margin-top: 17px
    padding: 8px
    width: 273px
    height: 40px

.reg-title
    font-size: 24px

.line
    margin: 21px 0
    width: 273px
    height: 1px
    background-color: rgba(0, 0, 0, 0.5)

.google-button
    padding: 8px
    width: 273px
    height: 40px
    outline: 1px solid rgb(64, 158, 255)
    background-color: rgba(180, 212, 255, 0.1)
    color: #000000

    &:hover
        background-color: rgba(64, 158, 255, 0.1)
    &:active
        background-color: rgba(64, 158, 255, 0.3)






</style>
