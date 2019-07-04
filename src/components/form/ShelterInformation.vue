<template>
  <div class="form-details card-panel">
    <div class="form-header">
      <p class="center">Shelter and Non-Food Items</p>
    </div>
    <div class="shelter-information form-contents">
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

      <!-- Needs -->
      <div v-if="shelterNeeds != null">
        <div class="row subsection-container">
          <p class="col s12 subsection-title">Needs</p>
        </div>
        <div class="row">
          <div class="col s12">
            <table>
              <tr>
                <th>Materials</th>
                <th>Specific Items</th>
                <th>Number of Families in Need</th>
              </tr>
              <tr v-for="row in shelterNeeds" :key="row.type">
                <td class="exception">{{ constants.needsType[row.type] }}</td>
                <td>{{ row.specificItems }}</td>
                <td>{{ row.familiesInNeed }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

      <!-- Assistance -->
      <div v-if="shelterAssistance != null & shelterAssistance.length > 0">
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
                <th colspan="4">Beneficiaries</th>
              </tr>
              <tr>
                <th>Men</th>
                <th>Women</th>
                <th>Boys</th>
                <th>Girls</th>
              </tr>
              <tr v-for="row in shelterAssistance" :key="row.type">
                <td>{{ row.organizationAgency }}</td>
                <td>{{ row.assistanceType }}</td>
                <td>{{ row.dateReceived }}</td>
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

      <!-- Gaps  -->
      <div v-if="shelterGaps != null">
        <div class="row subsection-container">
          <p class="col s12 subsection-title">Gaps</p>
        </div>
        <div class="row">
          <div class="col s12">
            <table>
              <tr>
                <th>Are there any separate cubicles and/or partitions for male and female with the assistance provided?</th>
                <td>{{shelterGaps.cubicles}}</td>
              </tr>
              <tr>
                <th>Is the given assistance appropriate to their cultural practices?</th>
                <td>{{shelterGaps.culturalPracticeAssistance}}</td>
              </tr>
              <tr>
                <th>Is the construction of shelter appropriate for its location and size of the family as beneficiaries?</th>
                <td>{{shelterGaps.shelterAppropriate}}</td>
              </tr>
              <tr>
                <th>Does it have access to basic services and economic activities?</th>
                <td>{{shelterGaps.servicesAccess}}</td>
              </tr>
              <tr>
                <th>Are there any able-bodied in the family/community who can participate in resource mobilization, construction of the shelter?</th>
                <td>{{shelterGaps.anyAbleBodied}}</td>
              </tr>
              <tr>
                <th>Is there a referral pathway for incidents of Gender Based Violence (GBV)?</th>
                <td>{{shelterGaps.gbvReferralPathway}}</td>
              </tr>
              <tr>
                <th>Are there GBV protection services available?</th>
                <td>{{shelterGaps.gbvProtectionServices}}</td>
              </tr>
              <tr>
                <th>Is there GBV protection focal point?</th>
                <td>{{shelterGaps.gbvProtectionFocalPoint}}</td>
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
  name: "ShelterInformation",
  props: ["formId", "form"],
  data() {
    return {
      constants: constants,
      houseDamage: null,
      shelterCoping: null,
      shelterNeeds: null,
      shelterAssistance: null,
      shelterGaps: null
    };
  },
  mounted() {
    const db = firebase.db;
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
      });
    db.collection("shelterNeeds")
      .doc(this.formId)
      .get()
      .then(doc => {
        this.shelterNeeds = doc.data().list;
      });
    db.collection("shelterAssistance")
      .doc(this.formId)
      .get()
      .then(doc => {
        this.shelterAssistance = doc.data().list;
      });
    db.collection("shelterGaps")
      .where("formId", "==", this.formId)
      .get()
      .then(doc => {
        this.shelterGaps = doc.docs[0].data();
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
