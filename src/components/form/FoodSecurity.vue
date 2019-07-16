<template>
  <div class="form-details card-panel">
    <ul class="collapsible card">
      <li>
        <div class="form-header collapsible-header">
          <p class="center">Food Security</p>
        </div>
        <div class="collapsible-body food-security form-contents">
          <!-- Impact on Food Security -->
          <div class="subsection-wrapper" v-if="foodImpact != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Impact on Food Security</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr class="topmost">
                    <th colspan="2">How is food security affected?</th>
                    <th>Remarks</th>
                  </tr>
                  <tr>
                    <th>Problem of availability of food?</th>
                    <td v-if="foodImpact.hasFoodAvailabilityProblem">Yes</td>
                    <td v-else>No</td>
                    <td>{{foodImpact.hasFoodAvailabilityProblemRemarks}}</td>
                  </tr>
                  <tr>
                    <th>Lack of access to food (cash shortage)?</th>
                    <td v-if="foodImpact.lacksFoodAccess">Yes</td>
                    <td v-else>No</td>
                    <td>{{foodImpact.lacksFoodAccessRemarks}}</td>
                  </tr>
                  <tr>
                    <th>Constraints in accessing food and markets?</th>
                    <td v-if="foodImpact.hasFoodAccessConstraints">Yes</td>
                    <td v-else>No</td>
                    <td>{{foodImpact.hasFoodAccessConstraintsRemarks}}</td>
                  </tr>
                  <tr>
                    <th>
                      Are there other sources of food and how long
                      will this last?
                    </th>
                    <td v-if="foodImpact.hasOtherFoodSources">Yes</td>
                    <td v-else>No</td>
                    <td>{{foodImpact.hasOtherFoodSourcesRemarks}}</td>
                  </tr>
                  <tr>
                    <th></th>
                    <th>Before the Emergency</th>
                    <th>After the Emergency</th>
                  </tr>
                  <tr>
                    <th>How many times a day were households eating?</th>
                    <td>{{foodImpact.eatingTimesBeforeEmergency}}</td>
                    <td>{{foodImpact.eatingTimesAfterEmergency}}</td>
                  </tr>
                  <tr>
                    <th>Are they able to meet their food needs?</th>
                    <td>{{foodImpact.meetsFoodNeedsBeforeEmergency}}</td>
                    <td>{{foodImpact.meetsFoodNeedsAfterEmergency}}</td>
                  </tr>
                  <tr>
                    <th>How has food production changed? (Are they still able to fish or farm?)</th>
                    <td colspan="2">{{foodImpact.foodProductionChange}}</td>
                  </tr>
                  <tr>
                    <th>When is the next food ration needed and for how long?</th>
                    <td colspan="2">{{foodImpact.nextFoodRation}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Coping  -->
          <div class="subsection-wrapper" v-if="foodCoping != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Coping</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr>
                    <th>What are the coping strategies employed?</th>
                    <td>{{foodCoping.copingStrategies}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Needs -->
          <div class="subsection-wrapper" v-if="foodNeeds != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Needs</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr>
                    <th>What assistance can be provided to fill the food gap?</th>
                    <td>{{foodNeeds.foodGapAssistance}}</td>
                  </tr>
                  <tr>
                    <th>Number of families in need of food supply or lack the capacity to buy or secure food for their own consumption</th>
                    <td>{{foodNeeds.familiesInNeed}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Assistance -->
          <div
            class="subsection-wrapper"
            v-if="foodAssistance != null && foodAssistance.length > 0"
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
                  <tr v-for="row in foodAssistance" :key="row.type">
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

          <!-- Gaps  -->
          <div class="subsection-wrapper" v-if="foodGaps != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Gaps</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr>
                    <th>Is the assistance provided appropriate to the needs of the families?</th>
                    <td>{{foodGaps.assistanceAppropriate}}</td>
                  </tr>
                  <tr>
                    <th>Is the assistance provided enough?</th>
                    <td>{{foodGaps.assistanceEnough}}</td>
                  </tr>
                  <tr>
                    <th>Do women and men have equal access to the assistance?</th>
                    <td>{{foodGaps.assistanceEqualAccess}}</td>
                  </tr>
                  <tr>
                    <th>Were the specific food needs of men, women, boys, girls, PWD, children, breastfeeding and lactating women considered in the assistance?</th>
                    <td>{{foodGaps.specificNeedsMet}}</td>
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
  name: "FoodSecurity",
  props: ["formId", "form"],
  data() {
    return {
      constants: constants,
      foodImpact: null,
      foodCoping: null,
      foodNeeds: null,
      foodAssistance: null,
      foodGaps: null
    };
  },
  mounted() {
    const db = firebase.db;
    db.collection("foodImpact")
      .where("formId", "==", this.formId)
      .get()
      .then(doc => {
        this.foodImpact = doc.docs[0].data();
      });
    db.collection("foodCoping")
      .where("formId", "==", this.formId)
      .get()
      .then(doc => {
        this.foodCoping = doc.docs[0].data();
      });
    db.collection("foodNeeds")
      .where("formId", "==", this.formId)
      .get()
      .then(doc => {
        this.foodNeeds = doc.docs[0].data();
      });
    db.collection("foodAssistance")
      .doc(this.formId)
      .get()
      .then(doc => {
        this.foodAssistance = doc.data().list;
      });
    db.collection("foodGaps")
      .where("formId", "==", this.formId)
      .get()
      .then(doc => {
        this.foodGaps = doc.docs[0].data();
      });
  }
};
</script>

<style>
.food-security {
  padding-bottom: 20px;
}
.food-security .section h6 {
  text-transform: uppercase;
  font-weight: 600;
}
</style>
