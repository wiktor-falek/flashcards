<script setup>
import { onBeforeMount } from "vue";

import Header from "./Header.vue";

// import CreateCardModal from "./modals/CreateCardModal.vue";
import fetchDataIfMissing from "../helpers/fetchDataIfMissing";

onBeforeMount(() => {
  fetchDataIfMissing();
});
</script>

<template>
  <Header />
  <main>
    <div class="menu">
      <!-- <CreateCardModal /> -->
      <router-link id="browse" to="/browse">Browse<br />Cards</router-link>
      <a href="" id="stats">View Stats</a>
      <a href="" id="add">Add new<br />Card</a>
      <router-link id="practise" to="/practise">Practise</router-link>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 800px;
}

.menu > a {
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  word-wrap: break-word;
  background-color: rgb(54, 54, 54, 0.6);
  color: white;
  font-size: 1.4rem;
  text-decoration: none;
  height: 160px;
}

#browse {
}

#stats {
}

#add {
}

#practise {
  grid-column: span 3;
}
</style>
