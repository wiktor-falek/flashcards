<script setup>
import { onMounted } from "vue";
import Logo from "../components/Logo.vue";
import { getAllFlashcards } from "../api/flashcardApi.js";
import { useAuthStore } from "../stores/authStore.js";
import router from "../router";

const authStore = useAuthStore();

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
  <main>
    <Logo />
  </main>
</template>

<style scoped></style>
