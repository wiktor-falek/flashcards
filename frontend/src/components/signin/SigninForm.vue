<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../../stores/authStore";
import router from "../../router";
import { login } from "../../api/authApi";

const username = ref();
const password = ref();

const usernameInput = ref();

onMounted(() => {
  usernameInput.value.focus();
})

const onSubmit = async (event) => {
  event.preventDefault();

  const result = await login(username.value, password.value);

  const response = await result.json();

  if (result.status === 401) {
  }

  const authStore = useAuthStore();
  if (result.status === 200) {
    authStore.setIsAuthenticated(true);
    router.push("/")
  }
  console.log(authStore.isAuthenticated);

  console.log(result.status, response);
};

const linkOnClick = (event) => {
  event.preventDefault();
};
</script>

<template>
  <form action="POST" @submit="onSubmit($event)">
    <h1>Login</h1>
    <label for="username">Username</label>
    <input
      id="username"
      type="text"
      placeholder="username"
      :username="username"
      @input="(event) => (username = event.target.value)"
      autofocus
      ref="usernameInput"
    />

    <label for="password">Password</label>
    <input
      id="password"
      type="password"
      placeholder="password"
      :password="password"
      @input="(event) => (password = event.target.value)"
    />

    <button class="link">Forgot password?</button>

    <button type="submit" class="button button--dark">
      Get Started&nbsp;&nbsp;>
      <!-- this will be a svg ofc  -->
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
