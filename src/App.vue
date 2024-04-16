<template>
    <div class="container">
        <NavBar v-if="$route.meta.showNavBar" :isCollapse="isCollapse" @toggleCollapse="toggleCollapse"/>
        <div class="kek">
            <SideBar v-if="$route.meta.showSideBar" :isCollapse="isCollapse"/>
            <div class="content">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
import SideBar from './components/SideBar.vue';
import { ref } from 'vue';

const isCollapse = ref(true);

const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value;
};
</script>

<style lang="sass" scoped>
@import "assets/styles/main"
.kek
    display: flex

.content
    height: 100vh
    background-color: rgb(1, 1, 1, 0.03)
    width: 100%
</style>
