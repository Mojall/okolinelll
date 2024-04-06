<template>
    <div class="sidebar">
        <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            style="height: 100vh"
        >
            <router-link to="/account-status" exact>
                <el-menu-item index="1">
                    <el-icon>
                        <Money/>
                    </el-icon>
                    <template #title>Статус счёта</template>
                </el-menu-item>
            </router-link>
            <router-link to="/payment-page" exact>
                <el-menu-item index="2">
                    <el-icon>
                        <CreditCard/>
                    </el-icon>
                    <template #title>Окно оплаты</template>
                </el-menu-item>
            </router-link>
            <el-menu-item index="3">
                <el-icon>
                    <Cpu/>
                </el-icon>
                <template #title>Консоль</template>
            </el-menu-item>
            <a :href="telegramLink" target="_blank">
                <el-menu-item index="4">
                    <el-icon>
                        <Promotion/>
                    </el-icon>
                    <template #title>Поддержка</template>
                </el-menu-item>
            </a>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { Cpu, CreditCard, Money, Promotion } from '@element-plus/icons-vue';


const telegramLink = import.meta.env.VITE_TELEGRAM_LINK;

const props = defineProps({
    isCollapse: {
        type: Boolean,
        required: true,
    },
});


</script>

<style lang="sass" scoped>

.sidebar
    max-width: 10%

a
    text-decoration: none

.el-menu-vertical-demo:not(.el-menu--collapse)
    width: 200px
    min-height: 400px
//.el-tabs__content
  //height: 100%
  //background-color: rgb(242, 244, 247)
</style>
