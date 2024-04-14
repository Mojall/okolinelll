<template>
    <div class="container">
        <div class="balance">
            <p>
                Баланс: <strong>{{ formatAmount(userTariff.amount) }} ₽</strong>
            </p>
            <el-button class="btn btn-balance">Пополнить</el-button>
        </div>
        <div v-if="isLoading" class="loader"></div>
        <div class="payments" v-else-if="paymentsToShow.length > 0">
            <h2>История пополнений</h2>
            <table class="payment-table">
                <thead>
                <tr>
                    <th>Дата</th>
                    <th>Сумма</th>
                    <th>Тип оплаты</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="payment in paymentsToShow" :key="payment['@id']">
                    <td>{{ formatDate(payment.date) }}</td>
                    <td>{{ formatAmount(payment.amount) }}</td>
                    <td>{{ payment.cashTypeValue }}</td>
                </tr>
                </tbody>
            </table>
            <el-button v-if="payments.length > visiblePayments" @click="showMorePayments" class="btn btn-more">Показать ещё</el-button>
        </div>
        <h2 v-else>Пополнений нету</h2>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { refreshAxios } from '../api/api.js';
import Cookies from 'js-cookie';
import { formatAmount } from '../utils/utils.js';
import { jwtDecode } from 'jwt-decode';


const payments = ref([]);
const balance = ref('');
const isLoading = ref(false);
const visiblePayments = ref(10);

const token = Cookies.get('jwtToken');
const decodeToken = jwtDecode(token);
const { user_data } = decodeToken;
const userTariff = user_data;

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
        const response = await refreshAxios.get('/payments', {
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


.payment-table
    width: 100%
    border-collapse: collapse
    margin-bottom: 20px


.payment-table th,
.payment-table td
    padding: 8px
    text-align: left
    border-bottom: 1px solid #ccc


.payment-table
    border-radius: 12px
    box-shadow: 0 4px 16px rgba(0, 51, 153, .04), 0 2px 2px rgba(0, 51, 153, .08)
    background-color: #ffffff
    padding: 20px


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

.amount
    color: green

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
    transition: .3s

    &:hover
        box-shadow: 0 4px 16px rgba(0, 51, 153, .9), 0 2px 2px rgba(0, 51, 153, .08)
</style>
