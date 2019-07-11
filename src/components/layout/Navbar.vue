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
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import firebase from "@/firebase/init";
export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {
    logout() {
      firebase.auth.signOut().then(() => {
        this.$router.push({ name: "Login" });
        console.log("Logged Out!");
      });
    }
  }
};
</script>

<style>
</style>


