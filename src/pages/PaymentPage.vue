<template>
    <div class="container">
        <div class="balance">
            <p>
                Баланс: <strong>{{ formatAmount(userTariff.amount) }} ₽</strong>
            </p>
            <el-input type="number" class="amount" v-model="amount" style="width: 240px" placeholder="Введите сумму" />
            <el-button class="btn btn-balance" @click="createPaymentLink">Пополнить</el-button>
        </div>
        <div class="payments">
            <h2>История пополнений</h2>
            <el-table
                ref="tableRef"
                row-key="date"
                :data="payments"
                style="width: 100%"
            >
                <el-table-column
                    prop="date"
                    label="Дата"
                    column-key="date"
                    :formatter="formatDate"
                />
                <el-table-column
                    prop="amount"
                    label="Сумма"
                    width="180"
                    :formatter="formatTableAmount"
                />
                <el-table-column prop="cashTypeValue" label="Тип оплаты" width="100">
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { refreshAxios } from '../api/api.js';
import Cookies from 'js-cookie';
import { formatAmount, formatDate, formatTableAmount } from '../utils/utils.js';
import { jwtDecode } from 'jwt-decode';

const payments = ref([]);
const balance = ref('');
const isLoading = ref(false);

const token = Cookies.get('jwtToken');
const decodeToken = jwtDecode(token);
const { user_data } = decodeToken;
const userTariff = user_data;
const amount = ref('')

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
const createPaymentLink = async () => {
    try {
        const response = await refreshAxios.post('/payments', {
            amount: parseFloat(amount.value)
        }, {
            headers: {
                Accept: 'application/ld+json',
                Authorization: `Bearer ${token}`,
            },
        });

        const paymentUrl = response.data.url;
        window.open(paymentUrl, '_blank');
    } catch (error) {
        console.error('Ошибка при создании ссылки на пополнение:', error);
    }
};
</script>

<style lang="sass" scoped>
@import "../assets/styles/main"
.container
    margin: 20px

.amount
    margin-right: 10px

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
</style>
