<script setup>
import { ref } from "vue";
import ActiveCollection from "../components/collections/ActiveCollection.vue";
import MemorizedCollection from "../components/collections/MemorizedCollection.vue";
import CreateCardModal from "../components/modals/CreateCardModal.vue";

const isActiveCollection = ref(true);

</script>

<template>
  <main>
    <nav class="top">
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
    </nav>
    <div class="bottom">
      <ActiveCollection v-if="isActiveCollection" />
      <MemorizedCollection v-else />
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
  display: flex;
  align-items: flex-start;
  flex-flow: column;
}

nav {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
}

.top {
  width: 100%;
  height: 10%;
  /* flex: 0 1 auto; */
  flex-direction: row;
  align-items: center;
  justify-content: start;
}

.bottom {
  width: 100%;
  height: 90%;
}
</style>
