<script setup>
import { ref } from "vue";
import Logo from "../components/Logo.vue";
import { useAuthStore } from "../stores/authStore.js";
import { useFlashcardStore } from "../stores/flashcardStore.js";
import CreateCardModal from "./modals/CreateCardModal.vue";
import ActiveCollection from "./collections/ActiveCollection.vue";

const authStore = useAuthStore();
const flashcardStore = useFlashcardStore();

const displayCreateCardModal = ref(false);
const displayActiveCollection = ref(false);

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
