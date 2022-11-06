<script setup>
import { onMounted, ref } from "vue";
import { register } from "../../api/authApi";

const emit = defineEmits(["signinViewToggle"]);

const username = ref();
const password = ref();
const email = ref();

const usernameLabelIsVisible = ref(false);
const passwordLabelIsVisible = ref(false);
const emailLabelIsVisible = ref(false);

const usernameInput = ref();
onMounted(() => {
  usernameInput.value.focus();
});

const onSubmit = async (event) => {
  event.preventDefault();

  const result = await register(username.value, password.value, email.value);

  const response = await result.json();

  if (result.status === 200) {
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
    <label for="username" :class="{ visible: usernameLabelIsVisible }">Username</label>
    <input
      id="username"
      type="text"
      placeholder="username"
      :username="username"
      @input="(event) => (username = event.target.value)"
      autofocus
      ref="usernameInput"
      @focusin="usernameLabelIsVisible = true"
      @focusout="usernameLabelIsVisible = false"
    />

    <label for="password" :class="{ visible: passwordLabelIsVisible }">Password</label>
    <input
      id="password"
      type="password"
      placeholder="password"
      :password="password"
      @input="(event) => (password = event.target.value)"
      @focusin="passwordLabelIsVisible = true"
      @focusout="passwordLabelIsVisible = false"
    />

    <label for="email" :class="{ visible: emailLabelIsVisible }">Email</label>
    <input
      id="email"
      type="email"
      placeholder="email"
      :email="email"
      @input="(event) => (email = event.target.value)"
      @focusin="emailLabelIsVisible = true"
      @focusout="emailLabelIsVisible = false"
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
