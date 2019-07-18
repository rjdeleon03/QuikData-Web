<template>
  <div>
    <div id="home" class="home">
      <h2>Home</h2>
      <div id="video-container">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Jnv8aU3PyGg"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
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
  background-image: url("~@/assets/temp_bg_side.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  display: flex;
  height: 600px;
  width: 100%;
}
</style>


