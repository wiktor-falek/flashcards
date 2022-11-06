<script setup>
import { onBeforeMount, ref } from "vue";
import Logo from "../components/Logo.vue";
import CreateCardModal from "./modals/CreateCardModal.vue";
import authAndLoadFlashcards from "../helpers/authAndLoadFlashcards";
import { useFlashcardStore } from "../stores/flashcardStore";

const flashcardStore = useFlashcardStore();

const displayCreateCardModal = ref(false);

onBeforeMount(() => {
  if (!flashcardStore.hasFetchedFlashcards) {
    authAndLoadFlashcards();
  }
});
</script>

<template>
  <header>
    <Logo />
  </header>

  <main>
    <div class="menu">
      <button class="button" @click="displayCreateCardModal = true">
        Create Flashcard
      </button>
      <router-link to="/browse" class="button">Browse Cards</router-link>
      <router-link to="/practise" class="button">Practise</router-link>
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
