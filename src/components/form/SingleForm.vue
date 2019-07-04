<template>
  <div class="container">
    <div class="form" v-if="formDetailsSection != null">
      <h2 class="center teal-text text-darken-1">Damage, Needs, and Capacities Assessment Form</h2>
      <p
        class="center subtitle"
      >Assessed on YYYY / MM / DD by {{ formDetailsSection.baselineData.organization }}</p>
      <div class="form-details card-panel">
        <div class="form-header">
          <p class="center">Form Details</p>
        </div>
        <div class="form-contents default-row">
          <div class="row">
            <div class="col s12 m6 l2 field-label">Sitio / Purok / Zone:</div>
            <div class="col s12 m6 l4">{{ formDetailsSection.baselineData.sitio }}</div>
            <div class="col s12 m6 l2 field-label">Barangay:</div>
            <div class="col s12 m6 l4">{{ formDetailsSection.baselineData.barangay }}</div>
          </div>
          <div class="row">
            <div class="col s12 m6 l2 field-label">City / Municipality:</div>
            <div class="col s12 m6 l4">{{ formDetailsSection.baselineData.city }}</div>
            <div class="col s12 m6 l2 field-label">Province:</div>
            <div class="col s12 m6 l4">{{ formDetailsSection.baselineData.province }}</div>
          </div>
          <div class="section">
            <div class="divider"></div>
          </div>
          <div class="row">
            <div class="col s12 m6 l2 field-label">Interviewer's Name:</div>
            <div class="col s12 m6 l4">{{ formDetailsSection.formDetails.interviewer }}</div>
            <div class="col s12 m6 l2 field-label">Interviewer's Contact Number:</div>
            <div class="col s12 m6 l4">{{ formDetailsSection.formDetails.interviewerContact }}</div>
          </div>
          <div class="section">
            <div class="divider"></div>
          </div>
          <div class="row">
            <div class="col s12 m6 l2 field-label">Interviewees' Names:</div>
            <div class="col s12 m6 l4">{{ formDetailsSection.formDetails.interviewee }}</div>
            <div class="col s12 m6 l2 field-label">Interviewees' Contact Numbers:</div>
            <div class="col s12 m6 l4">{{ formDetailsSection.formDetails.intervieweeContact }}</div>
          </div>
          <div class="section">
            <div class="divider"></div>
          </div>
          <div class="row">
            <div class="col s6 m6 l2 field-label">Sources of Information:</div>
            <div class="col s6 m6 l2">{{ formDetailsSection.formDetails.sourcesOfInformation }}</div>
          </div>
        </div>
      </div>

      <GeneralInformation :formId="formId" :form="formDetailsSection" />
      <ShelterInformation :formId="formId" :form="formDetailsSection" />
      <FoodSecurity :formId="formId" :form="formDetailsSection" />
      <Livelihoods :formId="formId" :form="formDetailsSection" />
      <Health :formId="formId" :form="formDetailsSection" />
      <Wash :formId="formId" :form="formDetailsSection" />
      <Evacuation :formId="formId" :form="formDetailsSection" />
      <CaseStories :formId="formId" :form="formDetailsSection" />
      <!--
      <div class="form-details card-panel">
        <div class="row form-header">
          <div class="col s2 col-no-padding">
            <p>Sections</p>
          </div>
          <div class="col s10 col-no-padding">
            <ul class="tabs">
              <li class="tab col s1 offset-s4">
                <a href="#test1" class="#active">1</a>
              </li>
              <li class="tab col s1">
                <a href="#test2">2</a>
              </li>
              <li class="tab col s1">
                <a href="#test3">3</a>
              </li>
              <li class="tab col s1">
                <a href="#test4">4</a>
              </li>
              <li class="tab col s1">
                <a href="#test5">5</a>
              </li>
              <li class="tab col s1">
                <a href="#test6">6</a>
              </li>
              <li class="tab col s1">
                <a href="#test7">7</a>
              </li>
              <li class="tab col s1">
                <a href="#test8">8</a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div id="test1" class="form-contents"></div>
          <div id="test2" class="form-contents"></div>
          <div id="test3" class="form-contents">Test 3</div>
          <div id="test4" class="form-contents">Test 4</div>
          <div id="test5" class="form-contents">Test 5</div>
          <div id="test6" class="form-contents">Test 6</div>
          <div id="test7" class="form-contents">Test 7</div>
          <div id="test8" class="form-contents">Test 8</div>
        </div>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase/init";
import constants from "@/constants";
import GeneralInformation from "@/components/form/GeneralInformation";
import ShelterInformation from "@/components/form/ShelterInformation";
import FoodSecurity from "@/components/form/FoodSecurity";
import Livelihoods from "@/components/form/Livelihoods";
import Health from "@/components/form/Health";
import Wash from "@/components/form/Wash";
import Evacuation from "@/components/form/Evacuation";
import CaseStories from "@/components/form/CaseStories";
export default {
  name: "SingleForm",
  components: {
    GeneralInformation,
    ShelterInformation,
    FoodSecurity,
    Livelihoods,
    Health,
    Wash,
    Evacuation,
    CaseStories
  },
  data() {
    return {
      constants: constants,
      formId: this.$route.params.form_id,
      formDetailsSection: null
    };
  },
  methods: {
    updateId() {
      this.formId = this.$route.params.form_id;
    }
  },
  watch: {
    $route: "updateId"
  },
  created() {
    firebase.db
      .collection("form")
      .doc(this.formId)
      .get()
      .then(doc => {
        const data = doc.data();
        this.formDetailsSection = {
          formDetails: data.formDetails[0],
          baselineData: data.baselineData[0],
          calamityInfo: data.calamityInfo[0]
        };
      });
  },
  mounted() {
    var doc = document.querySelectorAll(".container")[1];
    doc.addEventListener(
      "DOMNodeInserted",
      function() {
        var tabs = doc
          .querySelector(".form")
          .querySelectorAll(".form-details")[1]
          .querySelector("div div ul");
        M.Tabs.init(tabs, { swipeable: true });
      },
      false
    );
  }
};
</script>

<style>
.form {
  /* min-width: 1150px; */
  padding: 0 20px;
}

.form .form-details {
  border-radius: 8px;
  padding: 0px;
  font-size: 0.82em !important;
}

.form p.subtitle {
  margin-top: -20px;
  margin-bottom: 30px;
  font-weight: 600;
}

.form .form-header {
  border-radius: 8px 8px 0 0;
  height: 40px;
  background-color: #ffa000;
  margin-bottom: 0;
}

.form .form-header p {
  padding: 10px 0;
  text-transform: uppercase;
  font-weight: 700;
  color: white;
  margin: 0 10px 0 10px;
}

.form .form-contents {
  padding: 10px 0 20px 0 !important;
  display: block;
  overflow: auto;
}

.form .row {
  min-width: 900px;
  padding: 0 10px 0 10px;
}

.form .default-row .row {
  min-width: 100px;
}

.form .field-label {
  font-weight: 600;
}
.form .subsection-container {
  margin-bottom: 0;
}

.form .section {
  padding: 0 0.75rem;
}

.form .section .divider {
  margin: 10px 0;
}

.form .subsection-title {
  font-weight: 600;
  margin-bottom: 0px;
  margin-top: 10px;
}

.form .form-contents p.title {
  text-transform: uppercase;
  font-weight: 600;
  margin-top: 0;
}

.form .col-no-padding {
  padding: 0px !important;
}

.form .tabs {
  background-color: transparent;
  height: 40px;
}

.form .tabs .tab {
  line-height: 40px;
}

.form .tabs .tab a {
  color: white;
}

.form .tabs .tab a.active,
.form .tabs .tab a:hover {
  color: teal;
}

.form .tabs .indicator {
  background-color: teal;
}

.form .carousel {
  overflow: hidden;
}

.form table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}

.form th,
.form td {
  border: 1px solid gray;
  padding: 3px 5px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.form th {
  background: #ffecb3;
  /* color: white; */
  font-weight: 600;
}

.form table tr .w40 {
  width: 40px;
}

.form table tr .w60 {
  width: 60px;
}

.form table tr .w70 {
  width: 70px;
}

.form table tr .center {
  text-align: center;
}
</style>


