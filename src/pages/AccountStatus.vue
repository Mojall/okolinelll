<template>
        <div class="container">
            <h1>Хостинг сайта</h1>
            <div class="tariff-info">
                <h2>Текущий тариф: {{ activeTariff.name }}</h2>
                <p>Баланс: {{ balance }}</p>
            </div>
            <div class="tab-container">
                <div
                    v-for="tariff in tariffs"
                    :key="tariff.id"
                    :class="['tab', { 'active': tariff.id === activeTariffId }]"
                    @click="selectTariff(tariff.id)"
                >
                    {{ tariff.name }}
                </div>
            </div>
            <div class="hardware-info">
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
    const balance = ref('');
    const cpu = ref('');
    const ram = ref('');
    const disk = ref('');
    const diskCount = ref('');
    const tariffs = ref([]);

    onMounted(async () => {
        try {
            const data = await fetchData();
            tariffs.value = data.tariffs;
            activeTariff.value = data.tariffs.find((tariff) => tariff.id === activeTariffId.value);
            balance.value = data.balance;
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

.tariff-info
    margin-bottom: 20px


.hardware-info
    margin-top: 20px


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
