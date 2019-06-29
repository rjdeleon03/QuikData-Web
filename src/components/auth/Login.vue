<template>
  <div class="auth container">
    <form @submit.prevent="auth" class="card-panel">
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
        <a href>Sign up</a> instead.
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
</style>


