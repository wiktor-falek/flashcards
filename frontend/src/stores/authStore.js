import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);

  if (localStorage.getItem("isAuthenticated")) {
    isAuthenticated.value = JSON.parse(localStorage.getItem("isAuthenticated"));
  }

  watch(
    isAuthenticated,
    (bool) => {
      localStorage.setItem("isAuthenticated", JSON.stringify(bool));
    }
  )

  const setIsAuthenticated = (bool) => {
    isAuthenticated.value = !!bool;
  };

  return {
    isAuthenticated,
    setIsAuthenticated,
  };
});
