<template>
  <div id="app">
    <Navbar />
    <router-view />
    <div class="modal alert">
      <div class="modal-content">
        <h4 class="teal-text text-darken-1">Delete DNCA Form</h4>
        <p>Are you sure you want to delete the selected DNCA form?</p>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-teal btn-flat amber darken-2">OK</a>
      </div>
    </div>
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
body h4 {
  font-size: 1.8em;
}
body .row {
  margin-bottom: 5px;
}
.modal .modal-content {
  padding: 24px 24px 12px 24px !important;
}
.modal .modal-footer {
  padding: 12px 24px 24px 24px !important;
  height: auto !important;
}
.modal .modal-footer a.modal-close.btn-flat {
  text-align: center;
  color: white;
  width: auto !important;
  margin-bottom: 0 !important;
  margin-left: 5px !important;
}
</style>
