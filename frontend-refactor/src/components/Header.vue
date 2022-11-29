<script setup>
import Logo from "./Logo.vue";
import logout from "../helpers/logout";
</script>

<template>
  <header>
    <Logo class="logo-transparent" style="transform: scale(0.5)" />
    <button @click="logout()">Logout</button>
  </header>
</template>

<style scoped>
</style>
