<script setup>
import LoginForm from "./components/LoginForm.vue";
import UserProfile from "./components/UserProfile.vue";
</script>

<template>
  <div id="app">
    <LoginForm/>
    <UserProfile/>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: -20px;
}
</style>
