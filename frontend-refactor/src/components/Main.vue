<script setup>
import { onBeforeMount } from "vue";
import Logo from "../components/Logo.vue";
// import CreateCardModal from "./modals/CreateCardModal.vue";
// import authAndLoadFlashcards from "../helpers/authAndLoadFlashcards";
// import { useFlashcardStore } from "../stores/flashcardStore";
// import logout from "../helpers/logout";

// const flashcardStore = useFlashcardStore();

// onBeforeMount(() => {
//   if (!flashcardStore.hasFetchedFlashcards) {
//     authAndLoadFlashcards();
//   }
// });
</script>

<template>
  <header>
    <Logo />
    <button @click="logout()">Logout</button>
  </header>

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
