<template>
    <div class="container">
        <h1>Хостинг сайта</h1>
        <div class="tariff-info">
            <h2>Текущий тариф: {{ activeTariff.name }}</h2>
        </div>
        <div class="tab-container">
            <div
                v-for="tariff in tariffs"
                :key="tariff.id"
                :class="[
          'tab',
          {
            active: tariff.id === activeTariffId,
            inactive: tariff.id !== activeTariffId,
          },
        ]"
                @click="selectTariff(tariff.id)"
                :disabled="tariff.id !== activeTariffId"
            >
                {{ tariff.name }}
            </div>
        </div>
        <ul class="hardware-info-list">
            <li class="hardware-info-item">CPU: {{ activeTariff.cpu }}</li>
            <li class="hardware-info-item">RAM: {{ activeTariff.ram }}</li>
            <li class="hardware-info-item">Диск: {{ activeTariff.disk }}</li>
            <li class="hardware-info-item">
                Количество дисков: {{ activeTariff.diskCount }}
            </li>
        </ul>
        <div class="hardware-info-item">
            <h3>Информация о сервере</h3>
            <p>CPU: {{ activeTariff.cpu }}</p>
            <p>RAM: {{ activeTariff.ram }}</p>
            <p>Диск: {{ activeTariff.disk }}</p>
            <p>Количество дисков: {{ activeTariff.diskCount }}</p>
        </div>
    </div>
</template>

<script setup>
import { fetchData } from '../api/api.js';
import { ref, onMounted } from 'vue';

const activeTariffId = ref(1);
const activeTariff = ref({});
const cpu = ref('');
const ram = ref('');
const disk = ref('');
const diskCount = ref('');
const tariffs = ref([]);

onMounted(async () => {
    try {
        const data = await fetchData();
        tariffs.value = data.tariffs;
        activeTariff.value = data.tariffs.find(
            (tariff) => tariff.id === activeTariffId.value,
        );
        cpu.value = data.cpu;
        ram.value = data.ram;
        disk.value = data.disk;
        diskCount.value = data.diskCount;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
});

const selectTariff = (tariffId) => {
    activeTariffId.value = tariffId;
    activeTariff.value = tariffs.value.find((tariff) => tariff.id === tariffId);
};
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
    padding: 0
    gap: 50px

.hardware-info-item
    margin-top: 20px
    padding: 50px
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
