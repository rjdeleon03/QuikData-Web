<template>
  <div class="container" id="form-container">
    <div class="form" v-if="formDetailsSection != null">
      <h2 class="center teal-text text-darken-1">Damage, Needs, and Capacities Assessment Form</h2>
      <div id="options" class="center">
        <a @click="print">Print</a>
        &nbsp;|&nbsp;
        <a href>Delete</a>
      </div>
      <p
        class="center subtitle"
      >Assessed on {{ constants.convertDate(formDetailsSection.formDetails.assessmentDate) }} by {{ formDetailsSection.baselineData.organization }}</p>
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
      <ShelterInformation
        :formId="formId"
        :form="formDetailsSection"
        v-if="formMetadata != null && formMetadata.includeShelter"
      />
      <FoodSecurity
        :formId="formId"
        :form="formDetailsSection"
        v-if="formMetadata != null && formMetadata.includeFood"
      />
      <Livelihoods
        :formId="formId"
        :form="formDetailsSection"
        v-if="formMetadata != null && formMetadata.includeLivelihoods"
      />
      <Health
        :formId="formId"
        :form="formDetailsSection"
        v-if="formMetadata != null && formMetadata.includeHealth"
      />
      <Wash
        :formId="formId"
        :form="formDetailsSection"
        v-if="formMetadata != null && formMetadata.includeWater"
      />
      <Evacuation
        :formId="formId"
        :form="formDetailsSection"
        v-if="formMetadata != null && formMetadata.includeEvacuation"
      />
      <CaseStories :formId="formId" :form="formDetailsSection" />
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
      formDetailsSection: null,
      formMetadata: null,
      isLoggedIn: false
    };
  },
  methods: {
    updateId() {
      this.formId = this.$route.params.form_id;
    },
    print() {
      window.print();
    }
  },
  watch: {
    $route: "updateId"
  },
  created() {
    firebase.auth.onAuthStateChanged(user => {
      this.isLoggedIn = user;
      if (!this.isLoggedIn) this.$router.push("/");
    });
    firebase.db
      .collection("form")
      .doc(this.formId)
      .get()
      .then(doc => {
        const data = doc.data();
        this.formMetadata = data.form;
        this.formDetailsSection = {
          formDetails: data.formDetails[0],
          baselineData: data.baselineData[0],
          calamityInfo: data.calamityInfo[0]
        };
      });
  }
};
</script>

<style>
.form h2 {
  margin: 30px 30px 5px 30px;
}
.form #options {
}
.form .collapsible.card {
  border: none;
  border-radius: 8px;
  padding-bottom: 15px;
}
.form .collapsible {
  box-shadow: none;
  border-left: none;
  border-right: none;
  border-top: none;
  margin-top: 0;
}
.form .collapsible .collapsible-header {
  height: 40px;
  padding: 0;
}
.form .collapsible .collapsible-header p {
  display: block;
  margin: auto;
  width: 100%;
}
.form .form-details {
  border-radius: 8px;
  padding: 0px;
  font-size: 0.82em !important;
}

.form p.subtitle {
  margin-bottom: 20px;
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
  padding: 10px 0 15px 0 !important;
  /* display: block; */
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
  margin: 10px;
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
}

.form .tabs .tab a {
  color: white;
}

.form .tabs .tab a:focus.active,
.form .tabs .tab a.active {
  color: white;
  background: #00796b;
}
.form .tabs .tab a:hover {
  color: #00796b;
  background-color: #ffc107;
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
  width: inherit;
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
@media print {
  .container#form-container {
    margin: 0 10px;
    width: 100% !important;
  }
  .form .row {
    width: 100% !important;
    min-width: 0 !important;
  }
  .form .collapsible-body {
    display: block !important;
  }
}
</style>


