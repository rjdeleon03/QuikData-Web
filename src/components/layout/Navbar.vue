<template>
  <div class="navbar">
    <nav class="teal darken-1">
      <div class="container">
        <router-link :to="{ name: 'Home'}" class="brand-logo left">Quik Data</router-link>
        <ul class="right">
          <li>
            <router-link :to="{ name: 'Forms'}">DNCA Forms</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'About'}">About</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'SignUp'}">Sign Up</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Login'}">Login</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Logout'}">Logout</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  }
};
</script>

<style>
</style>


