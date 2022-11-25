<script setup>
import { onMounted, ref, computed } from "vue";
import { register } from "../../api/authApi";

const emit = defineEmits(["signinViewToggle"]);

const username = ref();
const password = ref();
const email = ref();

const usernameLabelIsFocused = ref(false);
const passwordLabelIsFocused = ref(false);
const emailLabelIsFocused = ref(false);

const hideUsernameLabel = computed(() => usernameLabelIsFocused && username.value?.length > 0);
const hidePasswordLabel = computed(() => passwordLabelIsFocused && password.value?.length > 0);
const hideEmailLabel = computed(() => emailLabelIsFocused && email.value?.length > 0);

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
    <h1 class="header">Register</h1>
    <label for="username" :class="{ hidden: hideUsernameLabel }">Username</label>
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
      @focusin="usernameLabelIsVisible = true"
      @focusout="usernameLabelIsVisible = false"
    />

    <label for="password" :class="{ hidden: hidePasswordLabel }">Password</label>
    <input
      id="password"
      type="password"
      placeholder="password"
      :password="password"
      @input="(event) => (password = event.target.value)"
      @focusin="passwordLabelIsVisible = true"
      @focusout="passwordLabelIsVisible = false"
    />

    <label for="email" :class="{ hidden: hideEmailLabel }">Email</label>
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
      Register&nbsp;>
      <!-- TODO '>' svg  -->
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
</style>
