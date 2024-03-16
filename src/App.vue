<template>
    <div class="container">
        <NavBar v-if="$route.meta.showNavBar" @click="isCollapse = !isCollapse" />
        <div class="kek">
            <SideBar v-if="$route.meta.showSideBar" :isCollapse="isCollapse" />
            <div class="content">
                <router-view />
            </div>
        </div>

    </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import SideBar from './components/SideBar.vue';
import { ref } from 'vue';

const isCollapse = ref(true);
</script>


<style lang="sass" scoped>
@import "assets/styles/main"
.kek
    display: flex
.content
    width: 100%
</style>
