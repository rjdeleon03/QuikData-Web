<template>
  <div class="form-details card-panel">
    <ul class="collapsible card">
      <li>
        <div class="form-header collapsible-header">
          <p class="center">General Information</p>
        </div>
        <div class="collapsible-body general-information form-contents">
          <!-- Calamity Description  -->
          <div class="subsection-wrapper" v-if="calamityInfo != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Description of the Calamity</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr>
                    <th>Type of Calamity:</th>
                    <td>{{ calamityInfo.calamityType }}</td>
                  </tr>
                  <tr>
                    <th>Date of Occurrence:</th>
                    <td>{{ constants.convertDate(calamityInfo.occurrenceDate) }}</td>
                  </tr>
                  <tr>
                    <th>Description of the Event:</th>
                    <td>{{ calamityInfo.eventDescription }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Affected Area -->
          <div class="subsection-wrapper" v-if="calamityInfo != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Brief Description of the Affected Area</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr>
                    <td>{{ calamityInfo.affectedAreaDescription }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Population -->
          <div class="subsection-wrapper" v-if="population != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Population</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr class="topmost">
                    <th rowspan="2">Age</th>
                    <th class="center" colspan="2">Total Population (Baseline)</th>
                    <th class="center" colspan="2">Affected Population</th>
                    <th class="center" colspan="2">Displaced Population</th>
                  </tr>
                  <tr>
                    <th class="exception">Male</th>
                    <th>Female</th>
                    <th>Male</th>
                    <th>Female</th>
                    <th>Male</th>
                    <th>Female</th>
                  </tr>
                  <tr v-for="row in population" :key="row.type">
                    <td class="exception">{{ constants.ageGroup[row.type] }}</td>
                    <td>{{ row.affectedMale }}</td>
                    <td>{{ row.affectedFemale }}</td>
                    <td>{{ row.affectedMale }}</td>
                    <td>{{ row.affectedFemale }}</td>
                    <td>{{ row.displacedMale }}</td>
                    <td>{{ row.displacedFemale }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Families -->
          <div class="subsection-wrapper" v-if="families != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Family and Household Data</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr class="topmost">
                    <th></th>
                    <th>Total Number (Baseline)</th>
                    <th>Number of Affected</th>
                    <th>Number of Displaced</th>
                  </tr>
                  <tr>
                    <td>Families</td>
                    <td>{{form.baselineData.totalFamilies}}</td>
                    <td>{{families.affectedFamilies}}</td>
                    <td>{{families.displacedFamilies}}</td>
                  </tr>
                  <tr>
                    <td>Households</td>
                    <td>{{form.baselineData.totalHouseholds}}</td>
                    <td>{{families.affectedHouseholds}}</td>
                    <td>{{families.displacedHouseholds}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Vulnerable -->
          <div class="subsection-wrapper" v-if="vulnerable != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Vulnerable Population</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr class="topmost">
                    <th class="w70" rowspan="2">Age</th>
                    <th rowspan="2">Pregnant Women</th>
                    <th rowspan="2">Lactating Mothers</th>
                    <th rowspan="2">LGBT</th>
                    <th rowspan="2">Female-headed Households</th>
                    <th class="center" colspan="2">Child-headed Households</th>
                    <th class="center" colspan="2">Indigenous People</th>
                    <th class="center" colspan="2">Persons with Disabilities</th>
                    <th rowspan="2" colspan="2">Remarks</th>
                  </tr>
                  <tr>
                    <th class="exception">Male</th>
                    <th>Female</th>
                    <th>Male</th>
                    <th>Female</th>
                    <th>Male</th>
                    <th>Female</th>
                  </tr>
                  <tr v-for="row in vulnerable" :key="row.type">
                    <td class="exception">{{ constants.ageGroup[row.type] }}</td>
                    <td>{{ row.pregnant }}</td>
                    <td>{{ row.lactating }}</td>
                    <td>{{ row.lgbt }}</td>
                    <td>{{ row.femaleHeaded }}</td>
                    <td>{{ row.childHeadedMale }}</td>
                    <td>{{ row.childHeadedFemale }}</td>
                    <td>{{ row.indigenousMale }}</td>
                    <td>{{ row.indigenousFemale }}</td>
                    <td>{{ row.disabledMale }}</td>
                    <td>{{ row.disabledFemale }}</td>
                    <td colspan="2">{{ row.remarks }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Casualties -->
          <div class="subsection-wrapper" v-if="casualties != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Casualties</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr class="topmost">
                    <th rowspan="2">Age</th>
                    <th class="center" colspan="2">Dead</th>
                    <th class="center" colspan="2">Missing</th>
                    <th class="center" colspan="2">Injured</th>
                  </tr>
                  <tr>
                    <th class="exception">Male</th>
                    <th>Female</th>
                    <th>Male</th>
                    <th>Female</th>
                    <th>Male</th>
                    <th>Female</th>
                  </tr>
                  <tr v-for="row in casualties" :key="row.type">
                    <td class="exception">{{ constants.ageGroup[row.type] }}</td>
                    <td>{{ row.deadMale }}</td>
                    <td>{{ row.deadFemale }}</td>
                    <td>{{ row.missingMale }}</td>
                    <td>{{ row.missingFemale }}</td>
                    <td>{{ row.injuredMale }}</td>
                    <td>{{ row.injuredFemale }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Cause of Death -->
          <div class="subsection-wrapper" v-if="causeOfDeath != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Cause of Death</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr class="topmost">
                    <th class="w70">Age</th>
                    <th class="w60">Gender</th>
                    <th>Measles</th>
                    <th>Diarrhea</th>
                    <th>Pneumonia</th>
                    <th>Dengue</th>
                    <th>Drowning</th>
                    <th>Heart Attack</th>
                    <th>Electrocution</th>
                    <th>Collapsed Building</th>
                    <th>Others</th>
                  </tr>
                  <template v-for="row in causeOfDeath">
                    <tr v-bind:key="`${row.type}-001`">
                      <td class="exception" rowspan="2">{{ constants.ageGroup[row.type] }}</td>
                      <td>Male</td>
                      <td>{{ row.measlesMale }}</td>
                      <td>{{ row.diarrheaMale }}</td>
                      <td>{{ row.pneumoniaMale }}</td>
                      <td>{{ row.dengueMale }}</td>
                      <td>{{ row.drowningMale }}</td>
                      <td>{{ row.heartAttackMale }}</td>
                      <td>{{ row.electrocutionMale }}</td>
                      <td>{{ row.collapsedBldgMale }}</td>
                      <td>{{ row.othersMale }}</td>
                    </tr>
                    <tr v-bind:key="`${row.type}-002`">
                      <td>Female</td>
                      <td>{{ row.measlesFemale }}</td>
                      <td>{{ row.diarrheaFemale }}</td>
                      <td>{{ row.pneumoniaFemale }}</td>
                      <td>{{ row.dengueFemale }}</td>
                      <td>{{ row.drowningFemale }}</td>
                      <td>{{ row.heartAttackFemale }}</td>
                      <td>{{ row.electrocutionFemale }}</td>
                      <td>{{ row.collapsedBldgFemale }}</td>
                      <td>{{ row.othersFemale }}</td>
                    </tr>
                  </template>
                </table>
              </div>
            </div>
          </div>

          <!-- Infrastructure -->
          <div class="subsection-wrapper" v-if="infrastructureDamage != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Damage to Infrastructures</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr class="topmost">
                    <th rowspan="2">Infrastructure</th>
                    <th rowspan="2">Number of Infrastructure</th>
                    <th class="center" colspan="2">Status</th>
                    <th rowspan="2" colspan="2">Remarks</th>
                  </tr>
                  <tr>
                    <th class="exception">Functional</th>
                    <th>Not Functional</th>
                  </tr>
                  <tr v-for="row in infrastructureDamage" :key="row.type">
                    <td class="exception">{{ constants.infraType[row.type] }}</td>
                    <td>{{ row.numberOfInfrastructure }}</td>
                    <td>
                      <span v-if="row.functional">O</span>
                    </td>
                    <td>
                      <span v-if="!row.functional">O</span>
                    </td>
                    <td colspan="2">{{ row.remarks }}</td>
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
  name: "GeneralInformation",
  props: ["formId", "form"],
  data() {
    return {
      constants: constants,
      calamityInfo: null,
      population: null,
      families: null,
      vulnerable: null,
      casualties: null,
      causeOfDeath: null,
      infrastructureDamage: null
    };
  },
  created() {
    var doc = document.querySelectorAll(".container")[1];
    doc.addEventListener(
      "DOMNodeInserted",
      function() {
        var cards = doc.querySelectorAll(".form .collapsible.card");
        cards.forEach(card => M.Collapsible.init(card, {}));
      },
      false
    );
  },
  mounted() {
    const db = firebase.db;
    db.collection("calamityInfo")
      .where("formId", "==", this.formId)
      .get()
      .then(doc => {
        this.calamityInfo = doc.docs[0].data();
      });
    db.collection("population")
      .doc(this.formId)
      .get()
      .then(doc => {
        this.population = doc.data().list;
      });
    db.collection("families")
      .where("formId", "==", this.formId)
      .get()
      .then(doc => {
        this.families = doc.docs[0].data();
      });
    db.collection("vulnerable")
      .doc(this.formId)
      .get()
      .then(doc => {
        this.vulnerable = doc.data().list;
      });
    db.collection("casualties")
      .doc(this.formId)
      .get()
      .then(doc => {
        this.casualties = doc.data().list;
      });
    db.collection("causeOfDeath")
      .doc(this.formId)
      .get()
      .then(doc => {
        this.causeOfDeath = doc.data().list;
      });
    db.collection("infrastructureDamage")
      .doc(this.formId)
      .get()
      .then(doc => {
        this.infrastructureDamage = doc.data().list;
      });
  }
};
</script>

<style>
.general-information {
  padding-bottom: 20px;
}
.general-information .section h6 {
  text-transform: uppercase;
  font-weight: 600;
}
</style>
