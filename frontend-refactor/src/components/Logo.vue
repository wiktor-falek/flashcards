<template>
  <router-link to="/" class="logo" tabindex="-1">
    <div class="logo__card idx-1"></div>
    <div class="logo__card idx-2"></div>
    <div class="logo__card idx-3"></div>
  </router-link>
</template>

<style scoped>
.logo {
  display: flex !important;
  text-decoration: none !important; 
  height: 75px;
  width: 95px;
  align-items: center; 
  padding-left: 20px;
  outline: none;
}

.logo__card {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 45px;
  height: 60px;
  background-color: transparent;
  border-width: 10px; 
  border-radius: 5px;
  margin-left: -10px;
  -moz-text-size-adjust: none;
  -webkit-text-size-adjust: none;
  text-size-adjust: none;
}
.logo__card::after {
  content: "";
  width: 35px;
  height: 50px;
  box-sizing: content-box;
  background-color: #d33f64;
  border: 3px solid white;
  border-radius: 5px;
}

.idx-1 {
  z-index: 1;
  transform: rotate(-45deg);
  top: -3px;
  left: 3px;
}

.idx-2 {
  z-index: 1;
  transform: rotate(-25deg);
  top: -5px;
  left: -10px;
}

.idx-3 {
  z-index: 1;
  transform: rotate(-5deg);
  left: -25px;
}

.idx-3::after {
  background-color: rgb(36, 125, 228);
  color: rgb(240, 237, 235);
  display: flex;
  align-items: center;
  justify-content: center;
  content: "F";
  font-size: 40px;
  font-weight: bold;
}

.logo-transparent > .logo__card::after {
  /* hardcoded background color cuz i don't know
  how to make it transparent without showing other cards */
  background-color: transparent;
  color: #ddd;
}

.logo-transparent > .idx-3::after {
}

.logo-transparent > .logo__card {
  background-color: #19273c;
}
</style>
