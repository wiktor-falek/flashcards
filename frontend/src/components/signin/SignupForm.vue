<script setup>
import { onMounted, ref } from "vue";

const username = ref();
const password = ref();
const email = ref();

const usernameInput = ref();

onMounted(() => {
  usernameInput.value.focus();
})

const onSubmit = (event) => {
  event.preventDefault();
};

const linkOnClick = (event) => {
  event.preventDefault();
  console.log("toggling state");
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
      Already registered? Log in
    </button>
  </form>
</template>

<style scoped>
@import "../../assets/form.css";

.center {
  margin: 0 auto;
}
</style>
