<template>
    <div class="container">
        <h1>Хостинг сайта</h1>
        <div class="tariff-info">
            <h2>Текущий тариф: {{ userTariff.name }}</h2>
        </div>
        <ul class="hardware-info-list">
            <li class="hardware-info-item">CPU: {{ userTariff.cpuCoresCount }} {{ pluralizeCores(userTariff.cpuCoresCount) }}</li>
            <li class="hardware-info-item">RAM: {{ userTariff.ramInGb }} ГБ</li>
            <li v-if="userTariff.hardInMb !== null" class="hardware-info-item">HDD: {{ userTariff.hardInMb }} Гб</li>
            <li v-if="userTariff.ssdInGb !== null" class="hardware-info-item">SDD: {{ userTariff.ssdInGb }} Гб</li>
        </ul>
        <div class="hardware-info-item">
            <h3>Информация о сервере</h3>
            <p>CPU: {{ userTariff.cpuCoresCount }} {{ pluralizeCores(userTariff.cpuCoresCount) }}</p>
            <p>RAM: {{ userTariff.ramInGb }}</p>
            <p v-if="userTariff.hardInMb !== null">HDD: {{ userTariff.hardInMb }} Гб</p>
            <p v-if="userTariff.ssdInGb !== null">SSD: {{ userTariff.ssdInGb }} Гб</p>
            <p>IP: {{ userTariff.ipCount }} </p>
        </div>
        <h2>Другие тарифы</h2>
        <div class="hardware-info-list">
            <div v-for="tariff in tariffs" :key="tariff['@id']" class="hardware-info-item">
                <h3>{{ tariff.name }}</h3>
                <p>Цена: {{ formatAmount(tariff.amount) }}</p>
                <p>CPU: {{ tariff.specs.cpuCoresCount }} {{ pluralizeCores(tariff.specs.cpuCoresCount) }}</p>
                <p v-if="tariff.specs.hardInGb !== null">HDD: {{ tariff.specs.hardInGb }} Гб</p>
                <p v-if="tariff.specs.ssdInGb !== null">SDD: {{ tariff.specs.ssdInGb }} Гб</p>
                <p>IP: {{ tariff.specs.ipCount }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { refreshAxios } from '../api/api.js';
import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { formatAmount, pluralizeCores } from '../utils/utils.js';

const tariffs = ref([]);


const token = Cookies.get('jwtToken');

const decodeToken = jwtDecode(token);

const { tariff_data } = decodeToken;

const userTariff = tariff_data.specs;


onMounted(async () => {
    try {
        const response = await refreshAxios.get('/tariffs');
        const data = response.data;
        tariffs.value = data['hydra:member'];
    } catch (error) {
        console.log('Ошибка при получении списка тарифов:', error);
    }
});

</script>


<style lang="sass" scoped>
.container
    margin: 20px
    font-family: Arial, sans-serif

.tab.inactive
    color: gray
    pointer-events: none

.tariff-info
    margin-bottom: 20px


.hardware-info-list
    display: flex
    flex-wrap: wrap
    padding: 0
    gap: 50px

.hardware-info-item
    margin-top: 20px
    padding: 10px 50px
    border-radius: 15px
    width: max-content
    list-style-type: none
    cursor: pointer
    box-shadow: 0 4px 16px rgba(0, 51, 153, .1), 0 2px 2px rgba(0, 51, 153, .08)
    transition: all .3s ease-in-out

    &:hover
        box-shadow: 0 4px 16px rgba(0, 51, 153, .9), 0 2px 2px rgba(0, 51, 153, .08)

h1
    font-size: 24px
    font-weight: bold

h2
    font-size: 20px
    font-weight: bold


h3
    font-size: 16px
    font-weight: bold


p
    margin: 5px 0

.tab-container
    display: flex


.tab
    padding: 8px 16px
    cursor: pointer
    border-bottom: 2px solid transparent


.tab.active
    border-color: blue

</style>