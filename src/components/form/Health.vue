<template>
  <div class="form-details card-panel">
    <ul class="collapsible card">
      <li>
        <div class="form-header collapsible-header">
          <p class="center">Health</p>
        </div>
        <div class="collapsible-body health form-contents">
          <!-- Diseases -->
          <div class="subsection-wrapper" v-if="diseases != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Diseases and Critical Injuries</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr class="topmost">
                    <th class="w70" rowspan="2">Age</th>
                    <th class="w60" rowspan="2">Gender</th>
                    <th class="center" colspan="5">Number of Cases of Illnesses</th>
                    <th class="center" colspan="4">Medical Needs</th>
                  </tr>
                  <tr>
                    <th>Diarrhea</th>
                    <th>Pneumonia</th>
                    <th>Dengue</th>
                    <th>Measles</th>
                    <th>Others</th>
                    <th>Check-up</th>
                    <th>Hospitalization</th>
                    <th>Medicines</th>
                    <th>Others</th>
                  </tr>
                  <template v-for="row in diseases">
                    <tr v-bind:key="`${row.type}-001`">
                      <td rowspan="2">{{ constants.ageGroup[row.type] }}</td>
                      <td>Male</td>
                      <td>{{row.diarrheaMale}}</td>
                      <td>{{row.pneumoniaMale}}</td>
                      <td>{{row.dengueMale}}</td>
                      <td>{{row.measlesMale}}</td>
                      <td>{{row.othersMale}}</td>
                      <td>{{row.checkUpMale}}</td>
                      <td>{{row.hospitalizationMale}}</td>
                      <td>{{row.medicinesMale}}</td>
                      <td>{{row.medicalOthersMale}}</td>
                    </tr>
                    <tr v-bind:key="`${row.type}-002`">
                      <td>Female</td>
                      <td>{{row.diarrheaFemale}}</td>
                      <td>{{row.pneumoniaFemale}}</td>
                      <td>{{row.dengueFemale}}</td>
                      <td>{{row.measlesFemale}}</td>
                      <td>{{row.othersFemale}}</td>
                      <td>{{row.checkUpFemale}}</td>
                      <td>{{row.hospitalizationFemale}}</td>
                      <td>{{row.medicinesFemale}}</td>
                      <td>{{row.medicalOthersFemale}}</td>
                    </tr>
                  </template>
                </table>
              </div>
            </div>
          </div>

          <!-- Special Needs -->
          <div class="subsection-wrapper" v-if="specialNeeds != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">People with Special Needs</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr class="topmost">
                    <th>Type of Vulnerability</th>
                    <th>Number</th>
                    <th>Health / Medical Needs</th>
                  </tr>
                  <tr v-for="row in specialNeeds" :key="row.type">
                    <td>{{ constants.specialNeedsType[row.type] }}</td>
                    <td>{{ row.number }}</td>
                    <td>{{ row.healthMedical }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Psychosocial  -->
          <div class="subsection-wrapper" v-if="psychosocial != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Psychosocial</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr>
                    <th rowspan="2">Age</th>
                    <th
                      rowspan="2"
                      colspan="2"
                    >Manifestations of Mental stress / Trauma (Blank stare, nightmares, sleep disorder, violent tendencies, etc.)</th>
                    <th class="center" colspan="2">Number of Cases</th>
                    <th rowspan="2" colspan="2">Needs (Counselling, referrals, etc.)</th>
                  </tr>
                  <tr>
                    <th>Male</th>
                    <th>Female</th>
                  </tr>
                  <tr v-for="row in psychosocial" :key="row.type">
                    <td>{{constants.ageGroup[row.type]}}</td>
                    <td colspan="2">{{row.manifestations}}</td>
                    <td>{{row.casesMale}}</td>
                    <td>{{row.casesFemale}}</td>
                    <td colspan="2">{{row.needs}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Coping  -->
          <div class="subsection-wrapper" v-if="healthCoping != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Coping</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr>
                    <th>What are the coping strategies employed?</th>
                    <td>{{healthCoping.copingStrategies}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Assistance -->
          <div
            class="subsection-wrapper"
            v-if="healthAssistance != null && healthAssistance.length > 0"
          >
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Assistance</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr class="topmost">
                    <th rowspan="2">Organization / Agency</th>
                    <th rowspan="2">Type of Assistance Received</th>
                    <th rowspan="2">Date Received</th>
                    <th rowspan="2">Quantity / Amount</th>
                    <th class="center" colspan="4">Beneficiaries</th>
                  </tr>
                  <tr>
                    <th>Men</th>
                    <th>Women</th>
                    <th>Boys</th>
                    <th>Girls</th>
                  </tr>
                  <tr v-for="row in healthAssistance" :key="row.type">
                    <td>{{ row.organizationAgency }}</td>
                    <td>{{ row.assistanceType }}</td>
                    <td>{{ constants.convertDate(row.dateReceived) }}</td>
                    <td>{{ row.quantity }}</td>
                    <td>{{ row.beneficiariesMen }}</td>
                    <td>{{ row.beneficiariesWomen }}</td>
                    <td>{{ row.beneficiariesBoys }}</td>
                    <td>{{ row.beneficiariesGirls }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Gaps -->
          <div class="subsection-wrapper" v-if="healthGaps != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Gaps</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr>
                    <th>Where/what is the nearest hospital in the area (public/private)?</th>
                    <td>{{healthGaps.nearestHospital}}</td>
                  </tr>
                  <tr>
                    <th>What services are available within the community?</th>
                    <td>{{healthGaps.servicesAvailable}}</td>
                  </tr>
                  <tr>
                    <th>Are these accessible to and sufficient for the target population?</th>
                    <td>{{healthGaps.servicesAccessible}}</td>
                  </tr>
                  <tr>
                    <th>Are there specific services for reproductive health?</th>
                    <td>{{healthGaps.reproductiveHealth}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "@/firebase/init";
import constants from "@/constants";
export default {
  name: "Health",
  props: ["formId", "form"],
  data() {
    return {
      constants: constants,
      diseases: null,
      specialNeeds: null,
      psychosocial: null,
      healthCoping: null,
      healthAssistance: null,
      healthGaps: null
    };
  },
  mounted() {
    const db = firebase.db;
    db.collection("diseases")
      .doc(this.formId)
      .get()
      .then(doc => {
        this.diseases = doc.data().list;
      });
    db.collection("specialNeeds")
      .doc(this.formId)
      .get()
      .then(doc => {
        this.specialNeeds = doc.data().list;
      });
    db.collection("psychosocial")
      .doc(this.formId)
      .get()
      .then(doc => {
        this.psychosocial = doc.data().list;
      });
    db.collection("healthCoping")
      .where("formId", "==", this.formId)
      .get()
      .then(doc => {
        this.healthCoping = doc.docs[0].data();
      });
    db.collection("healthAssistance")
      .doc(this.formId)
      .get()
      .then(doc => {
        this.healthAssistance = doc.data().list;
      });
    db.collection("healthGaps")
      .where("formId", "==", this.formId)
      .get()
      .then(doc => {
        this.healthGaps = doc.docs[0].data();
      });
  }
};
</script>

<style>
.health {
  padding-bottom: 20px;
}
.health .section h6 {
  text-transform: uppercase;
  font-weight: 600;
}
</style>
