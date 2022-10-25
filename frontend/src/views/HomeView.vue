<script setup>
import Landing from '../components/Landing.vue';
import Main from '../components/Main.vue';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();

</script>

<template>
  <Main v-if="authStore.isAuthenticated" />
  <Landing v-else />
</template>