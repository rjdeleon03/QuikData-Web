<template>
  <div class="form-details card-panel">
    <ul class="collapsible card">
      <li>
        <div class="form-header collapsible-header">
          <p class="center">Water, Sanitation, and Hygiene</p>
        </div>
        <div class="collapsible-body wash form-contents">
          <!-- WASH Conditions -->
          <div class="subsection-wrapper" v-if="washConditions != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">WASH Conditions</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr>
                    <th
                      colspan="2"
                    >What is the current water source and level of water system available?*</th>
                    <th>Remarks</th>
                  </tr>
                  <tr>
                    <th>Drinking and food preparation</th>
                    <td>Level {{washConditions.bathingWaterLevel + 1}}</td>
                    <td>{{washConditions.bathingWaterRemarks}}</td>
                  </tr>
                  <tr>
                    <th>Bathing, washing and domestic use</th>
                    <td>Level {{washConditions.drinkingWaterLevel + 1}}</td>
                    <td>{{washConditions.drinkingWaterRemarks}}</td>
                  </tr>
                  <tr>
                    <th>Number of Water Points and Conditions</th>
                    <td colspan="2">{{washConditions.numberOfWaterPoints}}</td>
                  </tr>
                  <tr>
                    <th>
                      Is the water potable?
                      <br />If not, where do they get clean drinking water? (specify distance from the residential units)
                    </th>
                    <td colspan="2">{{washConditions.waterPotable}}</td>
                  </tr>
                  <tr>
                    <th>How much time do they spend in fetching water?</th>
                    <td colspan="2">{{washConditions.fetchingWaterTime}}</td>
                  </tr>
                  <tr>
                    <th>Who owns the water source?</th>
                    <td colspan="2">{{washConditions.waterSourceOwner}}</td>
                  </tr>
                  <tr>
                    <th>Do they have to pay for the water? How much per container?</th>
                    <td colspan="2">{{washConditions.transportationCost}}</td>
                  </tr>
                  <tr>
                    <th>Do they have to pay fare or transportation cost?</th>
                    <td colspan="2">{{washConditions.waterCost}}</td>
                  </tr>
                  <tr>
                    <th>Are there particular times there is no water available?</th>
                    <td colspan="2">{{washConditions.timesOfNoWater}}</td>
                  </tr>
                  <tr>
                    <th>Are there hand washing facilities?</th>
                    <td colspan="2">{{washConditions.handWashingFacilities}}</td>
                  </tr>
                  <tr>
                    <th>Is there a proper garbage disposal facility?</th>
                    <td colspan="2">{{washConditions.garbageDisposalFacilities}}</td>
                  </tr>
                  <tr>
                    <th>Is waste segregation observed?</th>
                    <td colspan="2">{{washConditions.wasteSegregation}}</td>
                  </tr>
                  <tr>
                    <th>How do women manage issues related to menstruation? Do they use napkins?</th>
                    <td colspan="2">{{washConditions.menstruationManagement}}</td>
                  </tr>
                  <tr>
                    <th>How are napkins disposed?</th>
                    <td colspan="2">{{washConditions.napkinsDisposal}}</td>
                  </tr>
                  <tr>
                    <th>How are baby diapers disposed?</th>
                    <td colspan="2">{{washConditions.diapersDisposal}}</td>
                  </tr>
                  <tr>
                    <th>What are the current defecation practices?</th>
                    <td colspan="2">{{washConditions.defecationPractices}}</td>
                  </tr>
                  <tr>
                    <th>What are the toilet facilities available? How many?</th>
                    <td colspan="2">{{washConditions.toiletFacilities}}</td>
                  </tr>
                  <tr>
                    <th>What are the conditions of the latrines after the disaster?</th>
                    <td colspan="2">{{washConditions.toiletConditions}}</td>
                  </tr>
                  <tr>
                    <th>Is the current defecation practice a threat to water supplies or living areas?</th>
                    <td colspan="2">{{washConditions.defecationThreat}}</td>
                  </tr>
                  <tr>
                    <th>Are the existing facilities properly maintained?</th>
                    <td colspan="2">{{washConditions.existingFacilities}}</td>
                  </tr>
                  <tr>
                    <th>Are there security and protection issues?</th>
                    <td colspan="2">{{washConditions.securityIssues}}</td>
                  </tr>
                  <tr>
                    <th>Are the toilets segregated between male and female?</th>
                    <td colspan="2">{{washConditions.toiletSegregation}}</td>
                  </tr>
                  <tr>
                    <th>Are the toilets accessible for all (seniors, disabled, children, pregnant, etc)?</th>
                    <td colspan="2">{{washConditions.toiletAccessibility}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Coping  -->
          <div class="subsection-wrapper" v-if="washCoping != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Coping</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr>
                    <th>What are the coping strategies employed?</th>
                    <td>{{washCoping.copingStrategies}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>

          <!-- Assistance -->
          <div
            class="subsection-wrapper"
            v-if="washAssistance != null && washAssistance.length > 0"
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
                  <tr v-for="row in washAssistance" :key="row.type">
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
          <div class="subsection-wrapper" v-if="washGaps != null">
            <div class="row subsection-container">
              <p class="col s12 subsection-title">Gaps</p>
            </div>
            <div class="row">
              <div class="col s12">
                <table>
                  <tr>
                    <th>Are the assistance provided enough?</th>
                    <td>{{washGaps.assistanceEnough}}</td>
                  </tr>
                  <tr>
                    <th>Are the assistance provided relevant to the needs of the affected?</th>
                    <td>{{washGaps.assistanceRelevant}}</td>
                  </tr>
                  <tr>
                    <th>Is the water source accessible?</th>
                    <td>{{washGaps.waterSourceAccessible}}</td>
                  </tr>
                  <tr>
                    <th>Where they consulted prior to the relief distribution?</th>
                    <td>{{washGaps.reliefConsultation}}</td>
                  </tr>
                  <tr>
                    <th>Is there an orientation on waste management?</th>
                    <td>{{washGaps.wasteManagement}}</td>
                  </tr>
                  <tr>
                    <th>What is the attitude towards women, men, LGBT, PWD, boys and girls?</th>
                    <td>{{washGaps.attitudes}}</td>
                  </tr>
                  <tr>
                    <th>Are there existing support mechanisms?</th>
                    <td>{{washGaps.supportMechanisms}}</td>
                  </tr>
                  <tr>
                    <th>Do women participate in decision making?</th>
                    <td>{{washGaps.womenParticipation}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="section">
            <div class="divider"></div>
          </div>
          <div class="row">
            <div class="col s12">
              *Water System Levels:
              <br />Level 1: Stand-alone water points (hand pumps, shallow wells, rainwater collectors) serving an average of 15 hh within a 250-meter distance
              <br />Level 2: Piped water with communal water point (borewell, spring system) serving an average of 4-6 hh within a 25-meter distance
              <br />Level 3: Piped water supply with a private water point (house connection) based on a daily water demand of more than 100 liters per person
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
  name: "Wash",
  props: ["formId", "form"],
  data() {
    return {
      constants: constants,
      washConditions: null,
      washCoping: null,
      washAssistance: null,
      washGaps: null
    };
  },
  mounted() {
    const db = firebase.db;
    db.collection("washConditions")
      .where("formId", "==", this.formId)
      .get()
      .then(doc => {
        this.washConditions = doc.docs[0].data();
      });
    db.collection("washCoping")
      .where("formId", "==", this.formId)
      .get()
      .then(doc => {
        this.washCoping = doc.docs[0].data();
      });
    db.collection("washAssistance")
      .doc(this.formId)
      .get()
      .then(doc => {
        this.washAssistance = doc.data().list;
      });
    db.collection("washGaps")
      .where("formId", "==", this.formId)
      .get()
      .then(doc => {
        this.washGaps = doc.docs[0].data();
      });
  }
};
</script>

<style>
.wash {
  padding-bottom: 20px;
}
.wash .section h6 {
  text-transform: uppercase;
  font-weight: 600;
}
</style>
