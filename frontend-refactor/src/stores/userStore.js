import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const username = ref("");
  const email = ref("");
  const hasConfirmedEmail = ref(false);

  const setUsername = (newUsername) => {
    username.value = newUsername;
  }

  const setEmail = (newEmail) => {
    email.value = newEmail;
  }

  const setHasConfirmedEmail = (bool) => {
    hasConfirmedEmail.value = !!bool;
  }

  return {
    username,
    email,
    hasConfirmedEmail,
    setUsername,
    setEmail,
    setHasConfirmedEmail,
  };
});
