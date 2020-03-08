<template>
  <div class="auth container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center teal-text text-darken-1">Sign Up</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="text" name="email" v-model="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" v-model="password" />
      </div>
      <div class="field">
        <label for="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          v-model="confirmPassword"
        />
      </div>
      <!-- <div class="field">
        <label for="firstName">First Name:</label>
        <input type="text" name="firstName" />
      </div>
      <div class="field">
        <label for="lastName">Last Name:</label>
        <input type="text" name="lastName" />
      </div>-->
      <p class="center">
        Already have an account?
        <router-link :to="{ name: 'Login' }">Login</router-link>&nbsp;instead.
      </p>
      <div class="field center submit">
        <button class="btn amber darken-2">Sign Up</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from "@/firebase/init";
import M from "materialize-css";
export default {
  name: "SignUp",
  data() {
    return {
      email: null,
      password: null,
      confirmPassword: null,
      alertModal: null,
      alertParagraph: null,
      alertTitle: null,
      authButton: null
    };
  },
  methods: {
    signup() {
      if (!this.email || !this.password || !this.confirmPassword) {
        this.alertTitle.innerHTML = "Signup Error";
        this.alertParagraph.innerHTML = "All fields must be filled out.";
        if (this.alertModal) this.alertModal.open();
        return;
      } else if (this.password != this.confirmPassword) {
        this.alertTitle.innerHTML = "Signup Error";
        this.alertParagraph.innerHTML = "Passwords do not match.";
        if (this.alertModal) this.alertModal.open();
        return;
      }
      if (this.authButton) this.authButton.classList.add("disabled");
      firebase.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ name: "Forms", params: { page_index: 1 } });
        })
        .catch(err => {
          if (this.authButton) this.authButton.classList.remove("disabled");
          this.alertTitle.innerHTML = "Signup Error";
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

<style>
.auth.container {
  max-width: 400px;
  margin-top: 50px;
}
.auth h2 {
  margin: 10px 0px 20px 0px;
}
.auth .field {
  margin-bottom: 6px;
}
.auth .card-panel {
  border-radius: 16px;
}
.auth .submit {
  margin-top: 30px;
}
</style>
