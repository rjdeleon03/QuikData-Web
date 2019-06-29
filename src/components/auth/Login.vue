<template>
  <div class="sign-up container">
    <form @submit.prevent="signup" class="card-panel">
      <h2 class="center teal-text text-darken-1">Login</h2>
      <div class="field">
        <label for="email">Email:</label>
        <input type="text" name="email" />
      </div>
      <div class="field">
        <label for="password">Password:</label>
        <input type="password" name="password" />
      </div>
      <p class="center">
        Don't have an account yet?
        <a href>Sign Up</a> instead.
      </p>
      <div class="field center submit">
        <button class="btn amber darken-2">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SignUp",
  data() {
    return {};
  },
  methods: {
    signup() {}
  }
};
</script>

<style>
.sign-up {
  max-width: 400px;
  margin-top: 60px;
}
.sign-up h2 {
  font-size: 2.4em;
  margin-top: 15px;
}
.sign-up .field {
  margin-bottom: 16px;
}
.sign-up .card-panel {
  border-radius: 16px;
}
.sign-up .submit {
  margin-top: 30px;
}
</style>


