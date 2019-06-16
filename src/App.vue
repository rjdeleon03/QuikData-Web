<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
body {
  background-image: linear-gradient(#0277bd, #4fc3f7);
  background-attachment: fixed;
}

#app {
  font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
}

.mdl-button {
  font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
  font-weight: 600;
}
</style>
