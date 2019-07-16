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
import jsPDF from "jspdf";
export default {
  name: "Home",
  components: {
    About
  },
  data() {
    return {};
  },
  mounted() {
    var source = window.document.getElementsByTagName("body")[0];
    let pdfName = "test";
    var doc = new jsPDF();
    doc.fromHTML(source, 15, 15);
    doc.save(pdfName + ".pdf");
    console.log(doc);
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
  width: 100%;
}
</style>


