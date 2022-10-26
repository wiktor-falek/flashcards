<script setup>
import { onMounted, ref } from "vue";
import Logo from "../components/Logo.vue";
import { getAllFlashcards } from "../api/flashcardApi.js";
import { useAuthStore } from "../stores/authStore.js";
import router from "../router";
import CreateCardModal from "./modals/CreateCardModal.vue";

const authStore = useAuthStore();

const displayModal = ref(false);

onMounted(async () => {
  const response = await getAllFlashcards();

  if (response.status === 401) {
    localStorage.setItem("isAuthenticated", "false");
    authStore.setIsAuthenticated(false);
    return router.push("/signin");
  }

  const result = await response.json();
  console.log(result);
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

  <CreateCardModal
    :displayModal="displayModal"
    @closeModal="displayModal = false"
  />
</template>

<style scoped></style>
