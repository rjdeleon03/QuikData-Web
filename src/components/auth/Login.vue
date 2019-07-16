<template>
  <div class="auth container">
    <form @submit.prevent="login" class="card-panel">
      <h2 class="center teal-text text-darken-1">Login</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="text" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <p class="center">
        Don't have an account yet?
        <router-link :to="{ name: 'SignUp'}">Sign Up</router-link>&nbsp;instead.
      </p>
      <div class="field center submit">
        <button class="btn amber darken-2">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "@/firebase/init";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      alertModal: null,
      alertParagraph: null,
      alertTitle: null
    };
  },
  methods: {
    login() {
      if (!this.email || !this.password) return;
      firebase.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ name: "Forms", params: { page_index: 1 } });
        })
        .catch(err => {
          this.alertTitle.innerHTML = "Login Error";
          this.alertParagraph.innerHTML = err.message;
          console.log(this.alertModal);
          if (this.alertModal) this.alertModal.open();
          return;
        });
    }
  },
  mounted() {
    var doc = document.querySelector(".modal");
    this.alertParagraph = doc.querySelector("p");
    this.alertTitle = doc.querySelector("h4");
    if (!M.Modal.getInstance(this.alertModal))
      this.alertModal = M.Modal.init(doc, {});
  }
};
</script>

<style>
</style>


