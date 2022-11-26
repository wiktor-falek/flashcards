<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../../stores/authStore";
import router from "../../router";
import { login } from "../../api/authApi";
import { computed } from "@vue/reactivity";
import { useToast, POSITION } from "vue-toastification";

const toast = useToast();

const username = ref();
const password = ref();

const hideUsernameLabel = computed(() => username.value?.length === 0);
const hidePasswordLabel = computed(() => password.value?.length === 0);

const usernameInput = ref();
onMounted(() => {
  toast.clear();

  // make sure that the input is selected when component is reloaded 
  usernameInput.value.focus();
});

const onSubmit = async (event) => {
  event.preventDefault();

  const response = await login(username.value, password.value);

  const result = await response.json();

  const authStore = useAuthStore();
  if (response.status !== 200) {
    toast.error(result.message, {position: POSITION.BOTTOM_CENTER});
    return
  }

  authStore.setIsAuthenticated(true);
    router.push("/");
};

const linkOnClick = (event) => {
  event.preventDefault();
};
</script>

<template>
<form action="POST" @submit="onSubmit($event)">
    <h1 class="header">Login</h1>

    <label for="username" :class="{ hidden: hideUsernameLabel }"
      >Username</label
    >
    <input
      id="username"
      type="text"
      placeholder="username"
      minlength="6"
      maxlength="30"
      autofocus

      ref="usernameInput"
      :username="username"
      @input="(event) => (username = event.target.value)"

    />

    <label for="password" :class="{ hidden: hidePasswordLabel }"
      >Password</label
    >
    <input
      id="password"
      type="password"
      placeholder="password"
      minlength="8"
      maxlength="100"

      :password="password"
      @focusin="passwordLabelIsVisible = true"
      @focusout="passwordLabelIsVisible = false"
      @input="(event) => (password = event.target.value)"
    />

    <RouterLink to="" class="link">Forgot password?</RouterLink>
    <!-- <button class="link left"">Forgot password?</button> -->

    <button type="submit" class="button button--dark">
      Get Started&nbsp>
      <!-- TODO '>' svg  -->
    </button>

    <button
      class="link center"
      @click="
        linkOnClick($event);
        $emit('signinViewToggle');
      "
    >
      Not registered? Sign up
    </button>
  </form>
</template>

<style scoped>
@import "../../assets/form.css";

.center {
  margin: 0 auto;
}
</style>