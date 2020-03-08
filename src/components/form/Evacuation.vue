<template>
  <div
    class="form-details card-panel"
    id="evacuation"
    v-if="evacuationSites != null && evacuationSites.length > 0"
  >
    <div class="form-header print-exclude">
      <p class="center">Evacuation Sites</p>
    </div>
    <div class="evacuation form-contents">
      <!-- Evacuation Sites -->
      <div>
        <ul class="collapsible">
          <template v-for="(row, index) in evacuationSites">
            <li
              :key="index"
              v-bind:id="'evacuation' + (index + 1)"
              class="subsection-wrapper"
            >
              <div class="collapsible-header">
                <p class="center print-exclude">
                  Site / Shelter {{ index + 1 }}
                </p>
                <p class="center print-include">
                  Evacuation Site / Shelter {{ index + 1 }}
                </p>
                <p class="right">
                  <i class="material-icons">expand_more</i>
                </p>
              </div>
              <div class="collapsible-body">
                <div class="row">
                  <div class="subsection-container">
                    <p class="col s12 subsection-title">
                      Situations in Evacuation Centers or Temporary Shelters
                    </p>
                  </div>
                  <div>
                    <div class="col s12 evacuation-wrapper">
                      <table>
                        <tr>
                          <th colspan="4">
                            Name of Evacuation Center or Temporary Shelter
                          </th>
                          <td colspan="4">{{ row.siteInfo[0].name }}</td>
                        </tr>
                        <tr>
                          <th colspan="4">Date of Evacuation</th>
                          <td colspan="4">
                            {{
                              constants.convertDate(
                                row.siteInfo[0].evacuationDate
                              )
                            }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="4">Location</th>
                          <td colspan="4">{{ row.siteInfo[0].location }}</td>
                        </tr>
                        <tr>
                          <th colspan="4">Have they moved?</th>
                          <td colspan="4" v-if="row.siteInfo[0].haveMoved">
                            Displaced
                          </td>
                          <td colspan="4" v-else>Non-displaced</td>
                        </tr>
                        <tr>
                          <th colspan="4">Is it designated by the LGU?</th>
                          <td colspan="4" v-if="row.siteInfo[0].lguDesignated">
                            Yes
                          </td>
                          <td colspan="4" v-else>No</td>
                        </tr>
                        <tr>
                          <th colspan="4">
                            Type of Evacuation or Temporary Shelter
                          </th>
                          <td colspan="4">
                            {{ constants.evacuationType[row.siteInfo[0].type] }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="4">
                            How many households and families are staying here?
                          </th>
                          <td colspan="4">
                            {{ row.siteInfo[0].householdsAndFamilies }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="4">
                            Distance from the Community (in Kilometers)
                          </th>
                          <td colspan="4">
                            {{ row.siteInfo[0].distanceFromCommunity }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="4">
                            Evacuation Center / Shelter Size (in Square Meters)
                          </th>
                          <td colspan="4">{{ row.siteInfo[0].shelterSize }}</td>
                        </tr>
                        <tr>
                          <th class="subsection-header" colspan="8">
                            Breakdown of the Number of Evacuees
                          </th>
                        </tr>
                        <tr>
                          <th>Age</th>
                          <th>Male</th>
                          <th>Female</th>
                          <th>LGBT</th>
                          <th>Pregnant Women</th>
                          <th>Lactating Mothers</th>
                          <th>Persons with Disabilities</th>
                          <th>Sick</th>
                        </tr>
                        <tr
                          v-for="breakdownRow in row.breakdown"
                          :key="breakdownRow.type"
                        >
                          <td>{{ constants.ageGroup[breakdownRow.type] }}</td>
                          <td>{{ breakdownRow.male }}</td>
                          <td>{{ breakdownRow.female }}</td>
                          <td>{{ breakdownRow.lgbt }}</td>
                          <td>{{ breakdownRow.pregnant }}</td>
                          <td>{{ breakdownRow.lactating }}</td>
                          <td>{{ breakdownRow.disabled }}</td>
                          <td>{{ breakdownRow.sick }}</td>
                        </tr>
                        <tr>
                          <th class="subsection-header" colspan="8">
                            Facilities in the Temporary Shelter
                          </th>
                        </tr>
                        <tr>
                          <th colspan="5">
                            Accommodation Capacity (in Number of People)
                          </th>
                          <td colspan="3">{{ row.protection[0].capacity }}</td>
                        </tr>
                        <tr>
                          <th colspan="2">Toilet(s)</th>
                          <td colspan="1" v-if="row.protection[0].toilet">
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Number of Toilets</th>
                          <td colspan="3">
                            {{ row.protection[0].toiletRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">Wide Entrance / Exit</th>
                          <td colspan="1" v-if="row.protection[0].wideEntrance">
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.protection[0].wideEntranceRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">Electricity</th>
                          <td colspan="1" v-if="row.protection[0].electricity">
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.protection[0].electricityRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">Water Supply</th>
                          <td colspan="1" v-if="row.protection[0].waterSupply">
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.protection[0].waterSupplyRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">Proper Ventilation</th>
                          <td colspan="1" v-if="row.protection[0].ventilation">
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.protection[0].ventilationRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th class="subsection-header" colspan="8">
                            Water, Sanitation, and Hygiene
                          </th>
                        </tr>
                        <tr>
                          <th colspan="2">Clean Space for Food Preparation</th>
                          <td colspan="1" v-if="row.wash[0].foodPreparation">
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.wash[0].foodPreparationRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">Clean Source of Water</th>
                          <td colspan="1" v-if="row.wash[0].waterSource">
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.wash[0].waterSourceRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">Clean Toilet & Baths</th>
                          <td colspan="1" v-if="row.wash[0].toiletBaths">
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.wash[0].toiletBathsRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">Proper Garbage Disposal</th>
                          <td colspan="1" v-if="row.wash[0].garbageDisposal">
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.wash[0].garbageDisposalRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">Space for Clinic / Health Workers</th>
                          <td colspan="1" v-if="row.wash[0].clinic">Yes</td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">{{ row.wash[0].clinicRemarks }}</td>
                        </tr>
                        <tr>
                          <th colspan="2">Space for the Sick / Ill</th>
                          <td colspan="1" v-if="row.wash[0].sick">Yes</td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">{{ row.wash[0].sickRemarks }}</td>
                        </tr>
                        <tr>
                          <th colspan="2">Hand Washing Facilities</th>
                          <td colspan="1" v-if="row.wash[0].handWashing">
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.wash[0].handWashingRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th class="subsection-header" colspan="8">
                            Protection and Security
                          </th>
                        </tr>
                        <tr>
                          <th colspan="2">Unaccompanied Children</th>
                          <td
                            colspan="1"
                            v-if="row.protection[0].unaccompaniedChildren"
                          >
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Number of Unaccompanied Children</th>
                          <td colspan="3">
                            {{ row.protection[0].unaccompaniedChildrenRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">Locks for Toilet/Bath</th>
                          <td colspan="1" v-if="row.protection[0].toiletLocks">
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.protection[0].toiletLocksRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">
                            Segregated Toilet / Bath for Men and Women
                          </th>
                          <td
                            colspan="1"
                            v-if="row.protection[0].segregatedToilet"
                          >
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.protection[0].segregatedToiletRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">Proper Lighting Condition</th>
                          <td
                            colspan="1"
                            v-if="row.protection[0].properLighting"
                          >
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.protection[0].properLightingRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">Security Officer(s)</th>
                          <td
                            colspan="1"
                            v-if="row.protection[0].securityOfficers"
                          >
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.protection[0].securityOfficersRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">Partitions for Sleeping</th>
                          <td
                            colspan="1"
                            v-if="row.protection[0].sleepingPartitions"
                          >
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.protection[0].sleepingPartitionsRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">Child-Friendly Space</th>
                          <td
                            colspan="1"
                            v-if="row.protection[0].childFriendly"
                          >
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.protection[0].childFriendlyRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">
                            Safe Space for Pregnant & Lactating Mothers
                          </th>
                          <td
                            colspan="1"
                            v-if="row.protection[0].pregnantSpace"
                          >
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.protection[0].pregnantSpaceRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">
                            Safe Space for Persons with Disability
                          </th>
                          <td
                            colspan="1"
                            v-if="row.protection[0].disabledSpace"
                          >
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.protection[0].disabledSpaceRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">Space for Religious Practices</th>
                          <td
                            colspan="1"
                            v-if="row.protection[0].religiousSpace"
                          >
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.protection[0].religiousSpaceRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">
                            Is there a referral pathway for incidents of Gender
                            Based Violence (GBV)?
                          </th>
                          <td colspan="1" v-if="row.protection[0].gbvReferral">
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.protection[0].gbvReferralRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">
                            Are there GBV protection services available?
                          </th>
                          <td
                            colspan="1"
                            v-if="row.protection[0].gbvProtection"
                          >
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.protection[0].gbvProtectionRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th colspan="2">
                            Is there GBV protection focal point?
                          </th>
                          <td colspan="1" v-if="row.protection[0].gbvFocal">
                            Yes
                          </td>
                          <td colspan="1" v-else>No</td>
                          <th colspan="2">Remarks</th>
                          <td colspan="3">
                            {{ row.protection[0].gbvFocalRemarks }}
                          </td>
                        </tr>
                        <tr>
                          <th class="subsection-header" colspan="8">
                            Coping Capacity
                          </th>
                        </tr>
                        <tr>
                          <th colspan="4">
                            What are the coping mechanisms or actions of the
                            affected population?
                          </th>
                          <td colspan="4">
                            {{ row.coping[0].copingMechanism }}
                          </td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase/init";
import constants from "@/constants";
import M from "materialize-css";
export default {
  name: "Evacuation",
  props: ["formId", "form"],
  data() {
    return {
      constants: constants,
      evacuationSites: null
    };
  },
  mounted() {
    firebase.db
      .collection("evacuationSites")
      .doc(this.formId)
      .get()
      .then(doc => {
        this.evacuationSites = doc.data().list;
      });
    var doc = document.querySelectorAll(".container")[1];
    doc.addEventListener(
      "DOMNodeInserted",
      function() {
        var tabs = doc.querySelector(".form #evacuation div div ul");
        M.Collapsible.init(tabs, {});
      },
      false
    );
  }
};
</script>

<style>
.evacuation .collapsible .collapsible-header {
  height: 30px !important;
  padding: 0;
}
.evacuation .collapsible .collapsible-header p {
  display: block;
  margin: auto;
  font-weight: 600;
}
.evacuation .collapsible .collapsible-header p.right i {
  margin-top: 3px;
  width: auto;
  margin-right: -10px;
}
.evacuation .collapsible .collapsible-body {
  padding: 10px 0 15px 0;
  overflow: auto;
}
#evacuation .form-contents {
  padding: 0 !important;
}
.evacuation .carousel {
  overflow: scroll !important;
}
.evacuation .carousel.carousel-slider .carousel-item p {
  font-size: 0.82rem;
}
.evacuation .tabs {
  margin-top: -10px;
  background: #ffa000;
  height: 30px;
  display: flex;
}
.evacuation .tabs .tab {
  line-height: 30px;
  width: 100%;
}
.evacuation .tabs .tab a {
  font-size: 0.9em;
  font-weight: 600;
}
.evacuation .section h6 {
  text-transform: uppercase;
  font-weight: 600;
}
.evacuation .subsection-header {
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
  background: #e2e2e2;
}
</style>
