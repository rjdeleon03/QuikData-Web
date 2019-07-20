<template>
  <div class="form-details card-panel">
    <ul class="collapsible card">
      <li>
        <div class="form-header collapsible-header">
          <p class="center">Livelihoods</p>
          <p class="right">
            <i class="material-icons">expand_more</i>
          </p>
        </div>
        <div class="collapsible-body livelihoods form-contents">
          <!-- Income Before -->
          <div class="subsection-wrapper" v-if="incomeBefore != null && incomeBefore.length > 0">
            <div class="row subsection-container">
              <p
                class="col s12 subsection-title"
              >What were the main sources of income BEFORE the emergency?</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr class="topmost">
                    <th rowspan="2">Sources of Income</th>
                    <th rowspan="2">Type</th>
                    <th rowspan="2">Number of Dependent Households</th>
                    <th rowspan="2">
                      Average Monthly or Daily Income per Household
                      (Estimated Amount in PHP)
                    </th>
                    <th rowspan="2">Number of Male</th>
                    <th rowspan="2">Number of Female</th>
                    <th colspan="2">Children / Youth</th>
                  </tr>
                  <tr>
                    <th>Number of Boys</th>
                    <th>Number of Girls</th>
                  </tr>
                  <tr v-for="row in incomeBefore" :key="row.type">
                    <td>{{ row.source }}</td>
                    <td v-if="row.primary">Primary</td>
                    <td v-else>Secondary</td>
                    <td>{{ row.households }}</td>
                    <td>{{ row.income }}</td>
                    <td>{{ row.male }}</td>
                    <td>{{ row.female }}</td>
                    <td>{{ row.boys }}</td>
                    <td>{{ row.girls }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Income After -->
          <div class="subsection-wrapper" v-if="incomeAfter != null && incomeAfter.length > 0">
            <div class="row subsection-container">
              <p
                class="col s12 subsection-title"
              >What were the main sources of income AFTER the emergency?</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr class="topmost">
                    <th rowspan="2">Sources of Income</th>
                    <th rowspan="2">Type</th>
                    <th rowspan="2">Number of Dependent Households</th>
                    <th rowspan="2">
                      Average Monthly or Daily Income per Household
                      (Estimated Amount in PHP)
                    </th>
                    <th rowspan="2">Number of Male</th>
                    <th rowspan="2">Number of Female</th>
                    <th colspan="2">Children / Youth</th>
                  </tr>
                  <tr>
                    <th>Number of Boys</th>
                    <th>Number of Girls</th>
                  </tr>
                  <tr v-for="row in incomeAfter" :key="row.type">
                    <td>{{ row.source }}</td>
                    <td v-if="row.primary">Primary</td>
                    <td v-else>Secondary</td>
                    <td>{{ row.households }}</td>
                    <td>{{ row.income }}</td>
                    <td>{{ row.male }}</td>
                    <td>{{ row.female }}</td>
                    <td>{{ row.boys }}</td>
                    <td>{{ row.girls }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Estimated Damage  -->
          <div class="subsection-wrapper" v-if="estimatedDamage != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Estimated Cost of Damage to Livelihoods</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr>
                    <th>Kinds of Livelihoods</th>
                    <th>Estimated Cost of Damage (PHP)</th>
                    <th>Remarks (Number of hectares damaged, lost assets, equipment, number of days not able to go back to work, etc.)</th>
                  </tr>
                  <tr v-for="row in estimatedDamage" :key="row.row.type">
                    <td>
                      <div>{{constants.livelihoodType[row.row.type]}}</div>
                      <div>
                        <div v-for="type in row.types" :key="type.type">
                          <span v-if="type.selected">{{constants.livelihoodSubtype[type.type]}}</span>
                        </div>
                      </div>
                    </td>
                    <td>{{row.row.damageCost}}</td>
                    <td>{{row.row.remarks}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Coping  -->
          <div class="subsection-wrapper" v-if="livelihoodsCoping != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Coping</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr>
                    <th>How are people responding to livelihoods problems? What coping strategies do they employ?</th>
                    <td>{{livelihoodsCoping.copingStrategies}}</td>
                  </tr>
                  <tr>
                    <th>Are there new income opportunities?</th>
                    <td>{{livelihoodsCoping.newIncome}}</td>
                  </tr>
                  <tr>
                    <th>Are there any livelihood skills available in the community? (carpentry, masonry, etc.)</th>
                    <td>{{livelihoodsCoping.livelihoodSkills}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Needs -->
          <div class="subsection-wrapper" v-if="livelihoodsNeeds != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Needs</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr>
                    <th>What assistance can be provided to fill the income gap?</th>
                    <td>{{livelihoodsNeeds.assistanceFillGap}}</td>
                  </tr>
                  <tr>
                    <th>What resources are needed to return to normal?</th>
                    <td>{{livelihoodsNeeds.resourcesNeeded}}</td>
                  </tr>
                  <tr>
                    <th>How many families are in need of livelihood assistance?</th>
                    <td>{{livelihoodsNeeds.familiesInAssistance}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Assistance -->
          <div
            class="subsection-wrapper"
            v-if="livelihoodsAssistance != null && livelihoodsAssistance.length > 0"
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
                  <tr v-for="row in livelihoodsAssistance" :key="row.type">
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
          <div class="subsection-wrapper" v-if="livelihoodsGaps != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Gaps</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr>
                    <th>Do women and men have equal access to:</th>
                    <th></th>
                    <th>Details</th>
                  </tr>
                  <tr>
                    <td>Local Market</td>
                    <td v-if="livelihoodsGaps.hasLocalMarket">Yes</td>
                    <td v-else>No</td>
                    <td>{{livelihoodsGaps.hasLocalMarketRemarks}}</td>
                  </tr>
                  <tr>
                    <td>Cash and Food-for-Work Opportunities</td>
                    <td v-if="livelihoodsGaps.hasCashOpportunities">Yes</td>
                    <td v-else>No</td>
                    <td>{{livelihoodsGaps.hasCashOpportunitiesRemarks}}</td>
                  </tr>
                  <tr>
                    <td>Credit</td>
                    <td v-if="livelihoodsGaps.hasCredit">Yes</td>
                    <td v-else>No</td>
                    <td>{{livelihoodsGaps.hasCreditRemarks}}</td>
                  </tr>
                  <tr>
                    <td>Livelihood Materials and Services</td>
                    <td v-if="livelihoodsGaps.hasLivelihoodMaterials">Yes</td>
                    <td v-else>No</td>
                    <td>{{livelihoodsGaps.hasLivelihoodMaterialsRemarks}}</td>
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
  name: "Livelihoods",
  props: ["formId", "form"],
  data() {
    return {
      constants: constants,
      incomeBefore: null,
      incomeAfter: null,
      estimatedDamage: null,
      livelihoodsCoping: null,
      livelihoodsNeeds: null,
      livelihoodsAssistance: null,
      livelihoodsGaps: null
    };
  },
  mounted() {
    const db = firebase.db;
    db.collection("incomeBefore")
      .doc(this.formId)
      .get()
      .then(doc => {
        this.incomeBefore = doc.data().list;
      });
    db.collection("incomeAfter")
      .doc(this.formId)
      .get()
      .then(doc => {
        this.incomeAfter = doc.data().list;
      });
    db.collection("estimatedDamage")
      .doc(this.formId)
      .get()
      .then(doc => {
        this.estimatedDamage = doc.data().list;
      });
    db.collection("livelihoodsCoping")
      .where("formId", "==", this.formId)
      .get()
      .then(doc => {
        this.livelihoodsCoping = doc.docs[0].data();
      });
    db.collection("livelihoodsNeeds")
      .where("formId", "==", this.formId)
      .get()
      .then(doc => {
        this.livelihoodsNeeds = doc.docs[0].data();
      });
    db.collection("livelihoodsAssistance")
      .doc(this.formId)
      .get()
      .then(doc => {
        this.livelihoodsAssistance = doc.data().list;
      });
    db.collection("livelihoodsGaps")
      .where("formId", "==", this.formId)
      .get()
      .then(doc => {
        this.livelihoodsGaps = doc.docs[0].data();
      });
  }
};
</script>

<style>
.livelihoods {
  padding-bottom: 20px;
}
.livelihoods .section h6 {
  text-transform: uppercase;
  font-weight: 600;
}
</style>
