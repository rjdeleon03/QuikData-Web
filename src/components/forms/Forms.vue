<template>
  <div class="forms container">
    <h2 class="center teal-text text-darken-1">DNCA Forms</h2>
    <div class="forms-list card-panel">
      <div class="form-contents">
        <ul class="collapsible card">
          <li v-for="form in forms" :key="form.id">
            <div class="collapsible-header grey lighten-3">
              <div class="container">
                <div class="row">
                  <div class="col s6 m6 l6 xl6">
                    <p class="left">Assessed on {{form.stringDate}}</p>
                  </div>
                  <div class="col s6 m6 l6 xl6">
                    <div class="right">
                      <router-link
                        :to="{name: 'SingleForm', params : { form_id: form.form.id }}"
                        class="waves-effect waves-light btn-flat teal"
                      >View</router-link>
                      <a @click="deleteForm(form.form.id)" class="btn-flat red">Delete</a>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <router-link
                :to="{name: 'SingleForm', params : { form_id: form.form.id }}"
                class="waves-effect waves-light btn-flat teal"
              >View</router-link>-->
            </div>
            <div class="collapsible-body">
              <div class="container">
                <div class="row">
                  <div class="col s12 m3 label">Sitio:</div>
                  <div class="col s12 m9">{{form.baselineData[0].sitio}}&nbsp;</div>
                </div>
                <div class="row">
                  <div class="col s12 m3 label">Barangay:</div>
                  <div class="col s12 m9">{{form.baselineData[0].barangay}}&nbsp;</div>
                </div>
                <div class="row">
                  <div class="col s12 m3 label">City / Municipality:</div>
                  <div class="col s12 m9">{{form.baselineData[0].city}}&nbsp;</div>
                </div>
                <div class="row">
                  <div class="col s12 m3 label">Province:</div>
                  <div class="col s12 m9">{{form.baselineData[0].province}}&nbsp;</div>
                </div>
                <div class="row">
                  <div class="col s12 m3 label">Calamity:</div>
                  <div class="col s12 m9">{{form.baselineData[0].calamityType}}&nbsp;</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase/init";
import utils from "@/constants";
import { constants } from "crypto";
export default {
  name: "Forms",
  data() {
    return {
      forms: [],
      formsSnapshot: null,
      pageCount: null,
      pageNumber: this.$route.params.page_index
    };
  },
  methods: {
    updatePage() {
      this.pageNumber = this.$route.params.page_index;
    },
    deleteForm(id) {
      const db = firebase.db;
      db.collection("form")
        .doc(id)
        .delete();

      /* General Information */
      db.collection("calamityInfo")
        .where("formId", "==", id)
        .get()
        .then(doc => doc.docs[0].ref.delete());
      db.collection("population")
        .doc(id)
        .delete();
      db.collection("families")
        .where("formId", "==", id)
        .get()
        .then(doc => doc.docs[0].ref.delete());
      db.collection("vulnerable")
        .doc(id)
        .delete();
      db.collection("casualties")
        .doc(id)
        .delete();
      db.collection("causeOfDeath")
        .doc(id)
        .delete();
      db.collection("infrastructureDamage")
        .doc(id)
        .delete();
      /* Shelter Information */
      db.collection("houseDamage")
        .doc(id)
        .delete();
      db.collection("shelterCoping")
        .where("formId", "==", id)
        .get()
        .then(doc => doc.docs[0].ref.delete());
      db.collection("shelterNeeds")
        .doc(id)
        .delete();
      db.collection("shelterAssistance")
        .doc(id)
        .delete();
      db.collection("shelterGaps")
        .where("formId", "==", id)
        .get()
        .then(doc => doc.docs[0].ref.delete());

      /* Food Security */
      db.collection("foodImpact")
        .where("formId", "==", id)
        .get()
        .then(doc => doc.docs[0].ref.delete());
      db.collection("foodCoping")
        .where("formId", "==", id)
        .get()
        .then(doc => doc.docs[0].ref.delete());
      db.collection("foodNeeds")
        .where("formId", "==", id)
        .get()
        .then(doc => doc.docs[0].ref.delete());
      db.collection("foodAssistance")
        .doc(id)
        .delete();
      db.collection("foodGaps")
        .where("formId", "==", id)
        .get()
        .then(doc => doc.docs[0].ref.delete());

      /* Livelihoods */
      db.collection("incomeBefore")
        .doc(id)
        .delete();
      db.collection("incomeAfter")
        .doc(id)
        .delete();
      db.collection("estimatedDamage")
        .doc(id)
        .delete();
      db.collection("livelihoodsCoping")
        .where("formId", "==", id)
        .get()
        .then(doc => doc.docs[0].ref.delete());
      db.collection("livelihoodsNeeds")
        .where("formId", "==", id)
        .get()
        .then(doc => doc.docs[0].ref.delete());
      db.collection("livelihoodsAssistance")
        .doc(id)
        .delete();
      db.collection("livelihoodsGaps")
        .where("formId", "==", id)
        .get()
        .then(doc => doc.docs[0].ref.delete());
      /* Health */
      db.collection("diseases")
        .doc(id)
        .delete();
      db.collection("specialNeeds")
        .doc(id)
        .delete();
      db.collection("psychosocial")
        .doc(id)
        .delete();
      db.collection("healthCoping")
        .where("formId", "==", id)
        .get()
        .then(doc => doc.docs[0].ref.delete());
      db.collection("healthAssistance")
        .doc(id)
        .delete();
      db.collection("healthGaps")
        .where("formId", "==", id)
        .get()
        .then(doc => doc.docs[0].ref.delete());
      /* Wash */
      db.collection("washConditions")
        .where("formId", "==", id)
        .get()
        .then(doc => doc.docs[0].ref.delete());
      db.collection("washCoping")
        .where("formId", "==", id)
        .get()
        .then(doc => doc.docs[0].ref.delete());
      db.collection("washAssistance")
        .doc(id)
        .delete();
      db.collection("washGaps")
        .where("formId", "==", id)
        .get()
        .then(doc => doc.docs[0].ref.delete());
      /* Evacuation */
      db.collection("evacuationSites")
        .doc(id)
        .delete();
      /* Case Stories */
      db.collection("caseStories")
        .where("root.formId", "==", id)
        .get()
        .then(doc => {
          var item = doc.docs[0];
          item
            .data()
            .images.forEach(image =>
              firebase.storage.ref("/images/" + image.id).delete()
            );
          item.ref.delete();
        });
    },
    getFormsAtPage(page) {
      firebase.db
        .collection("form")
        .orderBy("form.dateCreated", "desc")
        .startAt(this.formsSnapshot.docs[page * 10])
        .limit(10)
        .get()
        .then(doc => {
          this.forms = [];
          doc.forEach(form => {
            const data = form.data();
            data.stringDate = utils.convertDate(
              data.formDetails[0].assessmentDate
            );
            this.forms.push(data);
          });
        });
    }
  },
  watch: {
    $route: "updatePage"
  },
  created() {
    firebase.auth.onAuthStateChanged(user => {
      if (!user) this.$router.push("/");
    });

    firebase.db
      .collection("form")
      .orderBy("form.dateCreated", "desc")
      .onSnapshot(snapshot => {
        this.pageCount = Math.ceil(snapshot.size / 10);
        if (
          !this.pageNumber ||
          this.pageNumber < 1 ||
          this.pageNumber > this.pageCount
        ) {
          this.pageNumber = 1;
        }
        if (!this.formsSnapshot) {
          this.formsSnapshot = snapshot;
          this.getFormsAtPage(this.pageNumber - 1);
        } else {
          this.formsSnapshot = snapshot;
        }
      });
  },
  mounted() {
    var doc = document.querySelector(".forms .form-contents");
    doc.addEventListener(
      "DOMNodeInserted",
      function() {
        var collapsible = doc.querySelector(".collapsible");
        M.Collapsible.init(collapsible, {});
      },
      false
    );
  }
};
</script>

<style>
.forms h6 {
  font-size: 1em;
  text-transform: uppercase;
  font-weight: 700;
}
.forms .btn-flat {
  color: white;
}
.forms .collapsible {
  box-shadow: none;
  margin: 10px 0;
  border-left: none;
  border-right: none;
}
.forms .collapsible .collapsible-header {
  font-weight: 700;
  padding-top: 1px;
  padding-bottom: 1px;
  text-transform: uppercase;
}
.forms .collapsible .collapsible-header .container,
.forms .collapsible .collapsible-body .container {
  margin: 0;
  width: 100%;
}
.forms .collapsible .collapsible-header p {
  margin: 7px auto;
}
.forms .collapsible .collapsible-header .btn-flat {
  height: 35px;
  border-radius: 8px;
  margin-left: 5px;
}
.forms .collapsible .collapsible-header .row {
  margin: 5px 0;
  width: 100%;
}
.forms .collapsible .collapsible-body {
  margin: 0;
  padding: 10px 15px;
}
.forms .collapsible .row .label {
  font-weight: 600;
}
.forms .card-panel {
  border-radius: 8px;
  padding: 0;
}
.forms .form-contents {
  padding: 10px 0;
}
</style>


