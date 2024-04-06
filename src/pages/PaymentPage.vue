<template>
    <div class="container">
        <div class="balance">
            <p>
                Баланс: <strong>{{ balance }} ₽</strong>
            </p>
            <el-button class="btn btn-balance">Пополнить</el-button>
        </div>
        <div v-if="isLoading" class="loader"></div>
        <div class="payments" v-else-if="paymentsToShow.length > 0">
            <h2>История пополнений</h2>
            <ul class="payment-list">
                <li class="payment-item"
                    v-for="payment in paymentsToShow"
                    :key="payment['@id']"
                >
                    <p>Дата: {{ formatDate(payment.date) }}</p>
                    <p>Сумма: {{ formatAmount(payment.amount) }}</p>
                    <p>Тип оплаты: {{ payment.cashTypeValue }}</p>
                </li>
            </ul>
            <el-button v-if="payments.length > visiblePayments" @click="showMorePayments" class="btn btn-more">Показать ещё</el-button>
        </div>
        <h2 v-else>Пополнений нету</h2>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { fetchData } from '../api/api.js';
import axios from 'axios';
import Cookies from 'js-cookie';


const payments = ref([]);
const balance = ref('');
const isLoading = ref(false);
const visiblePayments = ref(10);


const formatDate = (dateString) => {
    const date = new Date(dateString);
    const option = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    };
    return new Intl.DateTimeFormat(undefined, option).format(date);
};

const formatAmount = (amount) => {
    const roundedAmount = Math.round(amount * 100) / 100;
    return roundedAmount.toFixed(2);
};

const showMorePayments = () => {
    visiblePayments.value += 10;
};

const paymentsToShow = computed(() => {
    return payments.value.slice(0, visiblePayments.value);
});

onMounted(async () => {
    try {
        isLoading.value = true;
        const token = Cookies.get('jwtToken');
        const response = await axios.get('https://api.okoline.ru/payments', {
            headers: {
                Accept: 'application/ld+json',
                Authorization: `Bearer ${token}`,
            },
        });
        payments.value = response.data['hydra:member'];
        isLoading.value = false;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
});

onMounted(async () => {
    try {
        const data = await fetchData();
        balance.value = data.balance;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
});

</script>

<style lang="sass" scoped>
@import "../assets/styles/main"
.container
    margin: 20px

.btn
    border: none
    border-radius: 7px
    background-color: rgb(64, 158, 255)
    color: #ffffff
    cursor: pointer

    &:hover
        background-color: darken(rgb(64, 158, 255), 10%)

    &:active
        background-color: darken(rgb(64, 158, 255), 20%)


.loader
    border: 4px solid #f3f3f3
    border-top: 4px solid #3498db
    border-radius: 50%
    width: 30px
    height: 30px
    animation: spin 1s linear infinite
    margin: 50px auto

    @keyframes spin
        0%
            transform: rotate(0deg)
        100%
            transform: rotate(360deg)

.payments
    display: flex
    flex-direction: column
    text-align: center

.btn-more
    width: max-content
    margin: 0 auto

.payment-list
    list-style-type: none
    display: flex
    flex-direction: column
    gap: 15px
    padding: 0
    font-size: 18px

.payment-item
    display: flex
    background-color: #ffffff
    gap: 50px
    cursor: pointer
    padding: 5px 15px
    justify-content: space-between
    border-radius: 12px
    box-shadow: 0 4px 16px rgba(0, 51, 153, .04), 0 2px 2px rgba(0, 51, 153, .08)
    transition: .3s

    &:hover
        box-shadow: 0 4px 16px rgba(0, 51, 153, .9), 0 2px 2px rgba(0, 51, 153, .08)
</style>
