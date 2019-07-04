<template>
  <div class="form-details card-panel">
    <div class="form-header">
      <p class="center">Case Stories</p>
    </div>
    <div class="case-stories form-contents">
      <!-- Images -->
      <div v-if="caseStoriesImages != null && caseStoriesImages.length > 0">
        <div class="row subsection-container">
          <p class="col s12 subsection-title">Images</p>
        </div>
        <div class="row">
          <div class="col s12">
            <table>
              <tr>
                <td v-for="(row, index) in caseStoriesImages" :key="index">
                  <img v-bind:src="row" alt />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase/init";
import constants from "@/constants";
export default {
  name: "CaseStories",
  props: ["formId", "form"],
  data() {
    return {
      constants: constants,
      caseStoriesText: null,
      caseStoriesImages: null
    };
  },
  mounted() {
    firebase.db
      .collection("caseStories")
      .where("root.formId", "==", this.formId)
      .get()
      .then(doc => {
        var data = doc.docs[0].data();
        this.caseStoriesText = data.root.text;
        this.caseStoriesImages = [];
        data.images.forEach(image => {
          const ref = firebase.storage.ref("/images/" + image.id);
          ref.getDownloadURL().then(url => {
            this.caseStoriesImages.push(url);
          });
        });
        console.log(data);
      });
  }
};
</script>

<style>
.case-stories {
  padding-bottom: 20px;
}
.case-stories .section h6 {
  text-transform: uppercase;
  font-weight: 600;
}
.case-stories img {
  object-fit: contain;
  height: 200px;
  width: 100%;
}
</style>
