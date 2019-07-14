<template>
  <div>
    <div id="home" class="home">
      <h2>Home</h2>
    </div>
    <About />
  </div>
</template>

<script>
import About from "@/components/home/About";
export default {
  name: "Home",
  components: {
    About
  },
  data() {
    return {};
  }
};
</script>

<style>
.home {
  background-image: url("~@/assets/temp_bg.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  display: flex;
  height: 600px;
}
</style>


