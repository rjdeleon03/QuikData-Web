<template>
  <div class="shelter-information">
    <div class="section">
      <h6>Shelter and Non-Food Items</h6>
      <div class="divider"></div>
    </div>

    <!-- House Damage -->
    <div v-if="houseDamage != null">
      <div class="row subsection-container">
        <p class="col s12 subsection-title">Damage to Houses</p>
      </div>
      <div class="row">
        <div class="col s12">
          <table>
            <tr class="topmost">
              <th rowspan="2">Type of Houses</th>
              <th rowspan="2">Number of Houses (Baseline)</th>
              <th colspan="3">House Ownership</th>
              <th colspan="3">Land Ownership</th>
              <th rowspan="2">Number of Informal Settler Families</th>
              <th rowspan="2">Number of Partially-Damaged Houses</th>
              <th rowspan="2">Number of Totally-Damaged Houses</th>
            </tr>
            <tr>
              <th>How many households own their property?</th>
              <th>How many households are in rented property?</th>
              <th>How many households are in shared property?</th>
              <th>Owned</th>
              <th>Rented</th>
              <th>Tenanted</th>
            </tr>
            <tr v-for="row in houseDamage" :key="row.type">
              <td class="exception">{{ constants.houseType[row.type] }}</td>
              <td v-if="row.type == 0">{{ form.baselineData.shelterConcrete }}</td>
              <td v-if="row.type == 1">{{ form.baselineData.shelterSemiConcrete }}</td>
              <td v-if="row.type == 2">{{ form.baselineData.shelterLightMaterials }}</td>
              <td>{{ row.ownedHouseholds }}</td>
              <td>{{ row.rentedHouseholds }}</td>
              <td>{{ row.sharedHouseholds }}</td>
              <td>{{ row.ownedLand }}</td>
              <td>{{ row.rentedLand }}</td>
              <td>{{ row.tenantedLand }}</td>
              <td>{{ row.informalSettlers }}</td>
              <td>{{ row.partiallyDamaged }}</td>
              <td>{{ row.totallyDamaged }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <!-- Coping  -->
    <div v-if="shelterCoping != null">
      <div class="row subsection-container">
        <p class="col s12 subsection-title">Coping</p>
      </div>
      <div class="row">
        <div class="col s12">
          <table>
            <tr>
              <th>Where are the displaced families staying?</th>
              <td>{{shelterCoping.displacedFamiliesLocation}}</td>
            </tr>
            <tr>
              <th>How will they get their homes back to reasonable standard of living?</th>
              <td>{{shelterCoping.howToGetHomesBack}}</td>
            </tr>
            <tr>
              <th>When can they return home?</th>
              <td>{{shelterCoping.whenToReturnHome}}</td>
            </tr>
            <tr>
              <th>What will they do if they cannot return home?</th>
              <td>{{shelterCoping.ifCannotReturnHome}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <!-- Vulnerable -->
    <div v-if="vulnerable != null">
      <div class="row subsection-container">
        <p class="col s12 subsection-title">Vulnerable Population</p>
      </div>
      <div class="row">
        <div class="col s12">
          <table>
            <tr class="topmost">
              <th rowspan="2">Age</th>
              <th rowspan="2">Pregnant Women</th>
              <th rowspan="2">Lactating Mothers</th>
              <th rowspan="2">LGBT</th>
              <th rowspan="2">Female-headed Households</th>
              <th colspan="2">Child-headed Households</th>
              <th colspan="2">Indigenous People</th>
              <th colspan="2">Persons with Disabilities</th>
              <th rowspan="2">Remarks</th>
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
              <td>{{ row.remarks }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <!-- Casualties -->
    <div v-if="casualties != null">
      <div class="row subsection-container">
        <p class="col s12 subsection-title">Casualties</p>
      </div>
      <div class="row">
        <div class="col s12">
          <table>
            <tr class="topmost">
              <th rowspan="2">Age</th>
              <th colspan="2">Dead</th>
              <th colspan="2">Missing</th>
              <th colspan="2">Injured</th>
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
    <div v-if="causeOfDeath != null">
      <div class="row subsection-container">
        <p class="col s12 subsection-title">Cause of Death</p>
      </div>
      <div class="row">
        <div class="col s12">
          <table>
            <tr class="topmost">
              <th rowspan="2">Age</th>
              <th colspan="2">Measles</th>
              <th colspan="2">Diarrhea</th>
              <th colspan="2">Pneumonia</th>
              <th colspan="2">Dengue</th>
              <th colspan="2">Drowning</th>
              <th colspan="2">Heart Attack</th>
              <th colspan="2">Electrocution</th>
              <th colspan="2">Collapsed Building</th>
              <th colspan="2">Others</th>
            </tr>
            <tr>
              <th class="exception">Male</th>
              <th>Female</th>
              <th>Male</th>
              <th>Female</th>
              <th>Male</th>
              <th>Female</th>
              <th>Male</th>
              <th>Female</th>
              <th>Male</th>
              <th>Female</th>
              <th>Male</th>
              <th>Female</th>
              <th>Male</th>
              <th>Female</th>
              <th>Male</th>
              <th>Female</th>
              <th>Male</th>
              <th>Female</th>
            </tr>
            <tr v-for="row in causeOfDeath" :key="row.type">
              <td class="exception">{{ constants.ageGroup[row.type] }}</td>
              <td>{{ row.measlesMale }}</td>
              <td>{{ row.measlesFemale }}</td>
              <td>{{ row.diarrheaMale }}</td>
              <td>{{ row.diarrheaFemale }}</td>
              <td>{{ row.pneumoniaMale }}</td>
              <td>{{ row.pneumoniaFemale }}</td>
              <td>{{ row.dengueMale }}</td>
              <td>{{ row.dengueFemale }}</td>
              <td>{{ row.drowningMale }}</td>
              <td>{{ row.drowningFemale }}</td>
              <td>{{ row.heartAttackMale }}</td>
              <td>{{ row.heartAttackFemale }}</td>
              <td>{{ row.electrocutionMale }}</td>
              <td>{{ row.electrocutionFemale }}</td>
              <td>{{ row.collapsedBldgMale }}</td>
              <td>{{ row.collapsedBldgFemale }}</td>
              <td>{{ row.othersMale }}</td>
              <td>{{ row.othersFemale }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <!-- Infrastructure -->
    <div v-if="infrastructureDamage != null">
      <div class="row subsection-container">
        <p class="col s12 subsection-title">Damage to Infrastructures</p>
      </div>
      <div class="row">
        <div class="col s12">
          <table>
            <tr class="topmost">
              <th rowspan="2">Infrastructure</th>
              <th rowspan="2">Number of Infrastructure</th>
              <th colspan="2">Status</th>
              <th rowspan="2">Remarks</th>
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
              <td>{{ row.remarks }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";
import constants from "@/constants";
export default {
  name: "ShelterInformation",
  props: ["formId", "form"],
  data() {
    return {
      constants: constants,
      houseDamage: null,
      shelterCoping: null,
      vulnerable: null,
      casualties: null,
      causeOfDeath: null,
      infrastructureDamage: null
    };
  },
  mounted() {
    db.collection("houseDamage")
      .doc(this.formId)
      .get()
      .then(doc => {
        this.houseDamage = doc.data().list;
      });
    db.collection("shelterCoping")
      .where("formId", "==", this.formId)
      .get()
      .then(doc => {
        this.shelterCoping = doc.docs[0].data();
        console.log(this.shelterCoping);
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
        console.log(this.infrastructureDamage);
      });
  }
};
</script>

<style>
.shelter-information {
  padding-bottom: 20px;
}
.shelter-information .section h6 {
  text-transform: uppercase;
  font-weight: 600;
}
</style>
