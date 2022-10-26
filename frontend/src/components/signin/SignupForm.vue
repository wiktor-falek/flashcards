<script setup>
import { onMounted, ref } from "vue";
import { register } from "../../api/authApi";

const username = ref();
const password = ref();
const email = ref();

const usernameInput = ref();

const emit = defineEmits(["signinViewToggle"]);

onMounted(() => {
  usernameInput.value.focus();
});

const onSubmit = async (event) => {
  event.preventDefault();

  const result = await register(username.value, password.value, email.value);

  const response = await result.json();

  if (result.status === 200) {
    console.log("Registered an user");
    emit("signinViewToggle"); // 'redirect' to signin
  }
};

const linkOnClick = (event) => {
  event.preventDefault();
};
</script>

<template>
  <form action="POST" @submit="onSubmit($event)">
    <h1>Register</h1>
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

    <label for="email">Email</label>
    <input
      id="email"
      type="email"
      placeholder="email"
      :email="email"
      @input="(event) => (email = event.target.value)"
    />

    <button type="submit" class="button button--dark">
      Register&nbsp;&nbsp;>
      <!-- this will be a svg ofc  -->
    </button>

    <button
      class="link center"
      @click="
        linkOnClick($event);
        $emit('signinViewToggle');
      "
    >
      Already registered?
    </button>
  </form>
</template>

<style scoped>
@import "../../assets/form.css";

.center {
  margin: 0 auto;
}
</style>
