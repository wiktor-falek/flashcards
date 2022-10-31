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

const displayCreateCardModal = ref(false);
const displayActiveCollection = ref(false);

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
    flashcardStore.flashcards = flashcards;
  }
});
</script>

<template>
  <header>
    <Logo />
  </header>

  <main>
    <ActiveCollection
      v-if="displayActiveCollection"
      @closeActiveCollection="displayActiveCollection = false"
    />
    <div class="menu" v-else>
      <button class="button" @click="displayCreateCardModal = true">
        Create Flashcard
      </button>

      <button class="button" @click="displayActiveCollection = true">
        Browse Cards
      </button>
      <router-link class="button" to="/practise">Practise</router-link>
    </div>
  </main>

  <CreateCardModal
    :display="displayCreateCardModal"
    @closeModal="displayCreateCardModal = false"
  />
</template>

<style scoped>
.button {
  margin: 15px auto;
}
</style>
