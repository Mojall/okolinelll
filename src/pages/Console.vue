<template>
    <div class="container">
        <iframe :src="consoleUrl" width="100%" height="100%" frameborder="0"></iframe>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const jwtToken = Cookies.get('jwtToken');

const consoleUrl = ref('');

const openConsoleAndFetchUrl = async () => {
    await openConsole();
    fetchConsoleUrl();
};
const fetchConsoleUrl = () => {
    if (jwtToken) {
        const decodedToken = jwtDecode(jwtToken);
        const { pve_vm_id: vmId, pve_node: node, pve_domain: domain } = decodedToken;
        if (vmId && node) {
            consoleUrl.value = `https://pve.${domain}/?console=kvm&novnc=1&node=${node}&resize=1&vmid=${vmId}`;
        }
    }
};

const openConsole = async () => {
    if (jwtToken) {
        const response = await fetch('https://okoline.ru/set-cookie/', {
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Sec-Fetch-Site': 'cross-site',
            },
        });

        if (response.status === 200) {
            const setCookieHeader = response.headers.get('Set-Cookie');
            if (setCookieHeader) {
                const cookiesArray = setCookieHeader.split(',');

                cookiesArray.forEach(cookie => {
                    const cookieParts = cookie.split(';')[0].split('=');
                    const cookieName = cookieParts[0].trim();
                    const cookieValue = cookieParts[1].trim();

                    Cookies.set(cookieName, cookieValue); // Сохранение значения в куках
                });

                const iframe = document.querySelector('.console-iframe');
                if (iframe) {
                    iframe.src = consoleUrl.value;
                }
            }
        }
    }
};

onMounted(openConsoleAndFetchUrl);
watch(consoleUrl, () => {
    //вдруг что //
});


</script>

<style lang="sass" scoped>
.container
    width: 100%
    height: 100%
</style>
