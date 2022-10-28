<script setup>
import { onMounted, ref } from "vue";
import Logo from "../components/Logo.vue";
import { getAllFlashcards } from "../api/flashcardApi.js";
import { useAuthStore } from "../stores/authStore.js";
import { useFlashcardStore } from "../stores/flashcardStore.js";
import router from "../router";
import CreateCardModal from "./modals/CreateCardModal.vue";
import ActiveCollection from "./collections/ActiveCollection.vue";

const authStore = useAuthStore();
const flashcardStore = useFlashcardStore();

const displayModal = ref(false);

onMounted(async () => {
  const response = await getAllFlashcards();

  if (response.status === 401) {
    localStorage.setItem("isAuthenticated", "false");
    authStore.setIsAuthenticated(false);
    return router.push("/signin");
  }

  if (response.status === 200) {
    const result = await response.json();
    const flashcards = result.flashcards;
    console.log(flashcards);

    flashcardStore.flashcards = flashcards;
    console.log(flashcardStore.flashcards);
  }
});
</script>

<template>
  <header>
    <Logo />
  </header>

  <main>
    <button class="button" @click="displayModal = true">
      Create flashcard
    </button>
  </main>

  <ActiveCollection />

  <CreateCardModal
    :displayModal="displayModal"
    @closeModal="displayModal = false"
  />
</template>

<style scoped>
.button {
  margin: 15px auto;
}
</style>
