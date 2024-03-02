<template>
    <div>
        <NavBar @click="isCollapse = !isCollapse" />
        <SideBar :isCollapse="isCollapse" />
    </div>
</template>

<script setup>
import NavBar from './NavBar.vue';
import SideBar from './SideBar.vue';
import { ref } from 'vue';


const isCollapse = ref(true);


</script>

<style lang="sass" scoped>

</style>
