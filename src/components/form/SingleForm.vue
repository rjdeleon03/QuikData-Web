<template>
  <div class="container" id="form-container">
    <div class="modal">
      <div class="modal-content">
        <h4 class="teal-text text-darken-1">Delete DNCA Form</h4>
        <p>Are you sure you want to delete this DNCA form?</p>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-teal btn-flat amber darken-2">Cancel</a>
        <a
          @click="deleteForm(formId)"
          class="modal-close waves-effect waves-red btn-flat amber darken-2"
        >OK</a>
      </div>
    </div>
    <div class="form" v-if="formDetailsSection != null">
      <h2 class="center teal-text text-darken-1">Damage, Needs, and Capacities Assessment Form</h2>
      <p
        class="center subtitle"
      >Assessed on {{ constants.convertDate(formDetailsSection.formDetails.assessmentDate) }} by {{ formDetailsSection.baselineData.organization }}</p>
      <div id="options" class="center">
        <a @click="print" class="btn-flat blue darken-3 waves-effect waves-light">Print</a>
        <template v-if="isAdmin">
          <a @click="confirmDelete" class="btn-flat red waves-effect waves-light">Delete</a>
        </template>
      </div>
      <div class="form-details card-panel" id="details">
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
import utils from "@/constants";
import firebaseData from "@/firebaseData";
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
      constants: utils,
      formId: this.$route.params.form_id,
      formDetailsSection: null,
      formMetadata: null,
      deleteFormModal: null,
      isLoggedIn: false,
      isAdmin: false
    };
  },
  methods: {
    updateId() {
      this.formId = this.$route.params.form_id;
    },
    print() {
      window.print();
    },
    confirmDelete() {
      if (this.deleteFormModal) {
        const modal = M.Modal.getInstance(this.deleteFormModal);
        modal.open();
      }
    },
    deleteForm(id) {
      utils.deleteForm(id);
      this.$router.push({ name: "Forms", params: { page_index: 1 } });
    }
  },
  watch: {
    $route: "updateId"
  },
  created() {
    firebase.auth.onAuthStateChanged(user => {
      this.isLoggedIn = user;
      if (!this.isLoggedIn) {
        this.$router.push("/");
        this.isAdmin = false;
        return;
      }

      firebaseData.admin.forEach(email => {
        if (email === user.email) {
          this.isAdmin = true;
        }
      });
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
  },
  mounted() {
    this.deleteFormModal = document.querySelector("#form-container .modal");
    M.Modal.init(this.deleteFormModal, {});
  }
};
</script>

<style>
.form h2 {
  margin: 30px 30px 5px 30px;
}
.form #options {
  margin-top: -5px;
  margin-bottom: 15px;
}
.form #options .btn-flat {
  margin-left: 3px;
  margin-right: 3px;
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
.form .collapsible .collapsible-header p.center {
  margin-left: 40px;
}
.form .collapsible .collapsible-header p.right {
  width: 40px !important;
}
.form .collapsible li.active .collapsible-header p.right i {
  -ms-transform: rotate(180deg); /* IE 9 */
  -webkit-transform: rotate(180deg); /* Chrome, Safari, Opera */
  transform: rotate(180deg);
}
.form .form-details {
  border-radius: 8px;
  padding: 0px;
  font-size: 0.82em !important;
}

.form p.subtitle {
  margin-bottom: 20px;
  margin-top: 0;
  font-weight: 600;
}

.form .form-header {
  border-radius: 8px 8px 0 0;
  height: 40px;
  background-color: #ffa000 !important;
  margin-bottom: 0;
}

.form .form-details:nth-child(odd) .form-header {
  background-color: #00897b !important;
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
.form .print-include {
  display: none !important;
}
@media print {
  body {
    margin: 0 !important;
    font-size: 0.8em;
  }
  .container#form-container {
    margin: 0 !important;
    padding: 0 !important;
    width: 100% !important;
  }
  .form .print-exclude {
    display: none !important;
  }
  .form .print-include {
    display: block !important;
  }
  .form #options {
    display: none;
  }
  .form h2.teal-text.text-darken-1 {
    font-size: 1.15em;
    text-transform: uppercase;
    font-weight: 700;
    color: inherit !important;
  }
  .form .form-details#details {
    page-break-after: avoid;
  }
  .form .form-details#case-stories {
    page-break-after: avoid;
  }
  .form .form-details.card-panel {
    box-shadow: none;
    border-radius: 0;
    page-break-after: always;
  }
  .form .subsection-wrapper {
    page-break-inside: avoid;
  }
  .form .form-details.card-panel .form-header,
  .form .form-details.card-panel .form-contents {
    border-radius: 0;
  }
  .form .collapsible .collapsible-header {
    margin: 0 22px;
    border-bottom: 1px solid gray !important;
    height: 30px;
  }
  .form .collapsible .collapsible-header p {
    margin: 0 !important;
  }
  .form .collapsible .collapsible-header p.center {
    margin-left: 0px !important;
  }
  .form .collapsible .collapsible-header p.right {
    display: none !important;
  }
  .form .collapsible .collapsible-body {
    border: 0 !important;
  }
  .form .row {
    width: 100% !important;
    min-width: 0 !important;
  }
  .form .collapsible-body {
    display: block !important;
  }
  .form .form-header p {
    color: inherit;
  }
  .form .evacuation .collapsible-header p {
    text-transform: uppercase;
  }
  .form .case-stories img {
    border-radius: 0;
    box-shadow: none;
  }
}
</style>


