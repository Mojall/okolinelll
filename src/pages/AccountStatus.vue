<template>
    <div class="container">
        <h1>Информация о сервере</h1>
        <div class="tariff-info">
            <h2>Текущий тариф: {{ selectedTariff.name }}</h2>
        </div>
        <ul class="hardware-info-list">
            <li v-if="selectedTariffSpecs.cpuCoresCount !== null" class="hardware-info-item">
                CPU: {{ selectedTariffSpecs.cpuCoresCount }} {{ pluralize(selectedTariffSpecs.cpuCoresCount, 'ядро', 'ядра', 'ядер') }}
            </li>
            <li v-if="selectedTariffSpecs.ramInGb !== null" class="hardware-info-item">
                RAM: {{ selectedTariffSpecs.ramInGb }} Гб
            </li>
            <li v-if="selectedTariffSpecs.ssdInGb !== null" class="hardware-info-item">
                SDD: {{ selectedTariffSpecs.ssdInGb }} Гб
            </li>
            <li v-if="selectedTariffSpecs.ipCount !== null" class="hardware-info-item">
                IP: {{ selectedTariffSpecs.ipCount }}
            </li>
        </ul>
        <div class="hardware-info-item">
            <h3>Дополнительно</h3>
            <p v-if="userTariff.cpuCoresCount !== null">
                CPU: {{ userTariff.cpuCoresCount }}
                {{ pluralize(userTariff.cpuCoresCount, 'ядро', 'ядра', 'ядер') }}
            </p>
            <p v-if="userTariff.ramInGb !== null">RAM: {{ userTariff.ramInGb }}</p>
            <p v-if="userTariff.hardInMb !== null">
                HDD: {{ userTariff.hardInMb }} Гб
            </p>
            <p v-if="userTariff.ssdInGb !== null">SSD: {{ userTariff.ssdInGb }} Гб</p>
            <p v-if="userTariff.ipCount !== null">IP: {{ userTariff.ipCount }}</p>
            <p
                v-if="
          userTariff.cpuCoresCount === null &&
          userTariff.ramInGb === null &&
          userTariff.hardInMb === null &&
          userTariff.ssdInGb === null &&
          userTariff.ipCount === null
        "
            >
                Нет доступной информации об сервере
            </p>
        </div>
<!--        <h2>Другие тарифы</h2>-->
<!--        <div v-if="isLoading" class="loader"></div>-->
<!--        <div class="hardware-info-list">-->
<!--            <div-->
<!--                v-for="tariff in tariffs"-->
<!--                :key="tariff['@id']"-->
<!--                class="hardware-info-item"-->
<!--            >-->
<!--                <h3>{{ tariff.name }}</h3>-->
<!--                <p>Цена: {{ formatAmount(tariff.amount) }}</p>-->
<!--                <p>-->
<!--                    CPU: {{ tariff.specs.cpuCoresCount }}-->
<!--                    {{ pluralize(tariff.specs.cpuCoresCount, 'ядро', 'ядра', 'ядер') }}-->
<!--                </p>-->
<!--                <p v-if="tariff.specs.ramInGb !== null">-->
<!--                    RAM: {{ tariff.specs.ramInGb }} Гб-->
<!--                </p>-->
<!--                <p v-if="tariff.specs.ssdInGb !== null">-->
<!--                    SDD: {{ tariff.specs.ssdInGb }} Гб-->
<!--                </p>-->
<!--                <p>IP: {{ tariff.specs.ipCount }}</p>-->
<!--            </div>-->
<!--        </div>-->
    </div>
</template>

<script setup>
import { refreshAxios } from '../api/api.js';
import { onMounted, ref } from 'vue';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { pluralize, formatAmount } from '../utils/utils.js';

const tariffs = ref([]);
const isLoading = ref(false);
const selectedTariff = ref({});
const selectedTariffSpecs = ref({});
const selectedTariffName = ref('');

const token = Cookies.get('jwtToken');
const decodeToken = jwtDecode(token);
const { tariff_data } = decodeToken;
const userTariff = tariff_data.specs;
const userTariffName = tariff_data.specs.name;



onMounted(async () => {
    try {
        isLoading.value = true;
        const response = await refreshAxios.get('/tariffs', {
            headers: {
                Accept: 'application/ld+json',
                Authorization: `Bearer ${token}`,
            },
        });
        const data = response.data;
        tariffs.value = data['hydra:member'];
        selectedTariff.value = tariffs.value.find(tariff => tariff.specs.name === userTariffName);
        if (selectedTariff.value) {
            selectedTariffSpecs.value = selectedTariff.value.specs;
            selectedTariffName.value = selectedTariff.value.name;
        }
        isLoading.value = false;
    } catch (error) {
        console.log('Ошибка при получении списка тарифов:', error);
    }
});

</script>

<style lang="sass" scoped>
.container
    margin: 20px

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
</style>
