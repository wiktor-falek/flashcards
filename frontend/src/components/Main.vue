<script setup>
import Logo from "../components/Logo.vue";
import { useAuthStore } from "../stores/authStore";
const authStore = useAuthStore();
</script>

<template>
  <main>
    <h1>{{authStore.isAuthenticated}}</h1>
  </main>

</template>

<style scoped>
section {
  margin-bottom: 60px;
}

footer {
  margin-top: 200px;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.subheading {
  color: #e44f71;
}

p {
  margin-bottom: 1em;
}

h1, .subheading {
  max-width: 800px;
}

h1 {
  font-size: 1.6rem;
  line-height: 1.3em;
  word-spacing: -3px;
  color: #ff7896;
  margin-top: 30px;
  margin-bottom: 15px;
}

@media screen and (min-width: 601px) {
  body {
    line-height: 1.6;
  }

  p {
    font-size: 1.2rem;
  }
  h1 {
    font-size: 2.2rem;
  }
  .subheading {
    font-size: 1.6rem;
    word-wrap: break-word;
  }

  .padding-top {
    padding-top: 60px;
  }
}

</style>
