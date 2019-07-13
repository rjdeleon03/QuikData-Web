<template>
  <div id="app">
    <Navbar />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export default {
  name: "app",
  components: {
    Navbar,
    Footer
  }
};
</script>

<style>
body {
  font-family: "Nunito Sans", sans-serif;
  color: #424242;
}
body h2 {
  font-size: 2.4em;
  margin: 30px;
}
body .container {
  width: 80%;
}
body .row {
  margin-bottom: 5px;
}
</style>
