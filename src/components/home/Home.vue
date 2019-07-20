<template>
  <div>
    <div id="home" class="home">
      <div id="video-container" class="container">
        <div class="row">
          <div class="col s12 m12 l8 xl8" id="video">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/Jnv8aU3PyGg"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="col s12 m12 l4 xl4" id="text">
            <div id="main-text-wrapper">
              <!-- <h2>Quik Data</h2> -->
              <img src="@/assets/logo_marginless.png" />
              <p>A Community-Based Disaster Reporting App by Ilocos Center for Research, Empowerment and Development (ICRED)</p>
              <a v-scroll-to="'#about'" class="btn-flat amber darken-2">Know More</a>
            </div>
          </div>
        </div>
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
  background-image: url("~@/assets/bg_main.jpg");
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  display: flex;
  height: 500px;
  width: 100%;
}
.home h2 {
  margin: 0;
  font-weight: 700;
}
.home #video-container {
  padding: 30px 0;
  color: white;
}
.home #video-container .row {
  height: 100%;
}
.home #video-container .col#video {
  height: 45%;
}
.home #video-container .col#text {
  height: 55%;
}
.home #main-text-wrapper p {
  font-size: 1.5em;
  font-weight: 600;
}
.home #main-text-wrapper img {
  display: none !important;
}
@media only screen and (min-width: 373px) {
  .home #video-container .col#video {
    height: 55%;
  }
  .home #video-container .col#text {
    height: 45%;
  }
}
@media only screen and (min-width: 716px) {
  .home #video-container .col#video {
    height: 60%;
  }
  .home #video-container .col#text {
    height: 40%;
  }
}
@media only screen and (min-width: 993px) {
  .home #video-container .col#video {
    height: 100% !important;
    padding-left: 0;
    height: 70%;
  }
  .home #video-container .col#text {
    height: 100% !important;
    padding-right: 0;
    height: 30%;
  }
  .home #main-text-wrapper img {
    margin-top: 20px;
    margin-bottom: -10px;
    display: block !important;
    width: 40%;
    max-width: 120px;
  }
}
</style>


