<script setup>
import { onBeforeMount } from "vue";

import Header from "./Header.vue";

// import CreateCardModal from "./modals/CreateCardModal.vue";
import fetchDataIfMissing from "../helpers/fetchDataIfMissing";

onBeforeMount(() => {
  fetchDataIfMissing();
});
</script>

<template>
  <Header />
  <main>
    <div class="menu">
      <!-- <CreateCardModal /> -->
      <router-link to="/browse" class="button">Browse Cards</router-link>
      <router-link to="/practise" class="button">Practise</router-link>
    </div>
  </main>
</template>

<style scoped>
.menu {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
