<script setup>
import ActiveCollection from "../components/collections/ActiveCollection.vue";
import CreateCardModal from "../components/modals/CreateCardModal.vue";
</script>

<template>
  <router-link to="/" class="button">Go Back</router-link>
  <CreateCardModal />
  <ActiveCollection />
</template>
