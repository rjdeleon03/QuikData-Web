<template>
  <div class="container">
    <div class="form" v-if="formDetailsSection !== null">
      <h2 class="center teal-text text-darken-1">Damage, Needs, and Capacities Assessment Form</h2>
      <p
        class="center"
      >Assessed on YYYY / MM / DD by {{ formDetailsSection.baselineData.organization }}</p>
      <div class="form-details card-panel">
        <div class="form-header">
          <p class="center">Form Details</p>
        </div>
        <div class="form-contents">
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

      <div class="form-details card-panel">
        <div class="form-header">
          <div class="row">
            <div class="col s12">
              <ul class="tabs">
                <li class="tab col s3">
                  <a href="#test1">Test 1</a>
                </li>
                <li class="tab col s3">
                  <a href="#test1">Test 1</a>
                </li>
                <li class="tab col s3">
                  <a href="#test1">Test 1</a>
                </li>
              </ul>
            </div>
            <div id="test1" class="col s12">Test 1</div>
            <div id="test2" class="col s12">Test 2</div>
            <div id="test3" class="col s12">Test 3</div>
          </div>
        </div>
        <div class="form-contents"></div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "SingleForm",
  data() {
    return {
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
    db.collection("form")
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
  }
};
</script>

<style>
.form .form-details {
  border-radius: 8px;
  padding: 0px;
}

.form p {
  margin-top: -20px;
  margin-bottom: 30px;
  font-weight: 600;
}

.form .form-header {
  border-radius: 8px 8px 0 0;
  background-color: #ffa000;
}

.form .form-header p {
  padding: 10px 0;
  text-transform: uppercase;
  font-weight: 700;
  color: white;
  margin: 0px;
}

.form .form-contents {
  padding: 10px;
}

.form .field-label {
  font-weight: 600;
}

.form .section {
  padding: 0 0.75rem;
}

.form .section .divider {
  margin: 10px 0;
}
</style>


