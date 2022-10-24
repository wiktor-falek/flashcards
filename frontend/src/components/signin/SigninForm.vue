<script setup>
import { ref, defineProps } from "vue";

const props = defineProps([""]);

const username = ref();
const password = ref();

const onSubmit = (event) => {
  event.preventDefault();
  console.log("submitting");
};

const linkOnClick = (event) => {
  event.preventDefault();
  console.log("toggling state");
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
    />

    <label for="password">Password</label>
    <input
      id="password"
      type="password"
      placeholder="password"
      :password="password"
      @input="(event) => (password = event.target.value)"
    />

    <button
      class="link"
      @click="
        linkOnClick($event);
        $emit('signinViewToggle');
      "
    >
      Not registered? Sign up
    </button>

    <button type="submit" class="button button--dark">
      Log in&nbsp;&nbsp;>
      <!-- this will be a svg ofc  -->
    </button>
  </form>
</template>

<style scoped>
@import "../../assets/form.css";
</style>
