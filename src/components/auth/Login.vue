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
        <router-link :to="{ name: 'SignUp' }">Sign Up</router-link
        >&nbsp;instead.
      </p>
      <div class="field center submit">
        <button class="btn amber darken-2">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "@/firebase/init";
import M from "materialize-css";
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      alertModal: null,
      alertParagraph: null,
      alertTitle: null,
      authButton: null
    };
  },
  methods: {
    login() {
      if (!this.email || !this.password) return;
      if (this.authButton) this.authButton.classList.add("disabled");
      firebase.auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ name: "Forms", params: { page_index: 1 } });
        })
        .catch(err => {
          if (this.authButton) this.authButton.classList.remove("disabled");
          this.alertTitle.innerHTML = "Login Error";
          this.alertParagraph.innerHTML = err.message;
          if (this.alertModal) this.alertModal.open();
          return;
        });
    }
  },
  mounted() {
    this.authButton = document.querySelector(
      ".auth .card-panel .submit button"
    );
    var doc = document.querySelector(".modal");
    this.alertParagraph = doc.querySelector("p");
    this.alertTitle = doc.querySelector("h4");
    if (!this.alertModal || !M.Modal.getInstance(this.alertModal))
      this.alertModal = M.Modal.init(doc, {});
  }
};
</script>

<style></style>
