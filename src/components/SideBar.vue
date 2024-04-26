<template>
    <div class="sidebar">
        <el-menu
            :collapse="isCollapse"
            :default-active="getActiveMenuIndex()"
            class="el-menu-vertical-demo"
            style="height: 100vh"
        >
            <router-link exact to="/account-status">
                <el-menu-item
                    :class="{ 'is-active': isActive('/account-status') }"
                    index="1"
                >
                    <el-icon>
                        <Money/>
                    </el-icon>
                    <template #title>Статус счёта</template>
                </el-menu-item>
            </router-link>
            <router-link exact to="/payment-page">
                <el-menu-item
                    :class="{ 'is-active': isActive('/payment-page') }"
                    index="2"
                >
                    <el-icon>
                        <CreditCard/>
                    </el-icon>
                    <template #title>Окно оплаты</template>
                </el-menu-item>
            </router-link>
            <router-link to="/console">
                <el-menu-item
                    :class="{ 'is-active': isActive('/console') }"
                    index="3"
                    @click="handleConsoleClick"
                >
                    <el-icon>
                        <Cpu/>
                    </el-icon>
                    <template #title>Консоль</template>
                </el-menu-item>
            </router-link>
            <a :href="telegramLink" target="_blank">
                <el-menu-item class="active-icon" index="4">
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
import { defineProps, getCurrentInstance } from 'vue';
import { Cpu, CreditCard, Money, Promotion } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';

const telegramLink = import.meta.env.VITE_TELEGRAM_LINK;
const router = useRouter();

const props = defineProps({
    isCollapse: {
        type: Boolean,
        required: true,
    },
});

const instance = getCurrentInstance();

const isActive = (routePath: string) => {
    if (instance?.proxy?.$route) {
        return instance.proxy.$route.path === routePath;
    }

    return false;
};

const getActiveMenuIndex = () => {
    if (instance?.proxy?.$route) {
        const path = instance.proxy.$route.path;
        if (path === '/account-status') {
            return '1';
        } else if (path === '/payment-page') {
            return '2';
        } else if (path === '/console') {
            return '3';
        }
    }
    return '';
};

const handleConsoleClick = () => {
    const decodedToken = Cookies.get('jwtToken');
    if (decodedToken.pve_vm_id === null || decodedToken.pve_node === null) {
        return;
    }
    router.push('/console');
};
</script>


<style lang="sass" scoped>

.active-icon
    color: black

.sidebar
    max-width: 10%
    z-index: 99

a
    text-decoration: none

.el-menu-vertical-demo:not(.el-menu--collapse)
    width: 200px
    min-height: 400px
//.el-tabs__content
  //height: 100%
  //background-color: rgb(242, 244, 247)
</style>
