<script setup>
import { onBeforeMount } from "vue";

import Header from "./Header.vue";

// import CreateCardModal from "./modals/CreateCardModal.vue";

// TODO: put this inside a function, that check if data needs to be fetched
import authAndFetchData from "../helpers/authAndFetchData";
import { useFlashcardStore } from "../stores/flashcardStore";

const flashcardStore = useFlashcardStore();

onBeforeMount(() => {
  // if (needsToFetch()) {
  //   authAndFetchData();
  // }
  if (!flashcardStore.hasFetchedFlashcards) {
    authAndFetchData();
  }
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
