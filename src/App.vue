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
</style>
