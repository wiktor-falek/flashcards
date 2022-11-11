<script setup>
import { ref } from "vue";
import ActiveCollection from "../components/collections/ActiveCollection.vue";
import MemorizedCollection from "../components/collections/MemorizedCollection.vue";
import CreateCardModal from "../components/modals/CreateCardModal.vue";

const isActiveCollection = ref(true);
</script>

<template>
  <router-link to="/" class="button">Go Back</router-link>
  <CreateCardModal />

  <button
    :class="{ selected: isActiveCollection }"
    @click="isActiveCollection = true"
    tabindex="-1"
  >
    Active Collection
  </button>
  <button
    :class="{ selected: !isActiveCollection }"
    @click="isActiveCollection = false"
    tabindex="-1"
  >
    Memorized Collection
  </button>

  <ActiveCollection v-if="isActiveCollection" />
  <MemorizedCollection v-else />
</template>
