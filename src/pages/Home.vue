<template>
    <div class="container">
        <h2>Данные пользователя</h2>
        <div class="account-info-card">
            <p><strong>Полное имя:</strong> {{ user_data.fullName }}</p>
            <p><strong>Стоимость услуги:</strong> {{ extractPrice(tariff_data._tariff['Тарифный план интернет']) }} в месяц</p>
            <p><strong>Полный адрес:</strong> {{ tariff_data.fullAddress }}</p>
        </div>
    </div>
</template>

<script setup>
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const token = Cookies.get('jwtToken');
const accountInfo = jwtDecode(token);
const { user_data } = accountInfo;
const { tariff_data } = accountInfo;

const extractPrice = (tariff) => {
    const priceRegex = /(\d+(?:\.\d+)?\s*руб)/;
    const match = tariff.match(priceRegex);
    return match ? match[0] : tariff;
};
</script>


<style lang="sass" scoped>

.container
    margin: 20px

.account-info-card
    background-color: #ffffff
    padding: 20px
    border-radius: 12px
    width: max-content
    box-shadow: 0 4px 16px rgba(0, 51, 153, .1), 0 2px 2px rgba(0, 51, 153, .08)
    cursor: pointer
    transition: all .3s ease-in-out

    &:hover
        box-shadow: 0 4px 16px rgba(0, 51, 153, .9), 0 2px 2px rgba(0, 51, 153, .08)

h2
    padding-left: 20px


</style>
