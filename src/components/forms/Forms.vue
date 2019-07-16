<template>
  <div class="forms container">
    <h2 class="center teal-text text-darken-1">DNCA Forms</h2>
    <div class="refresh-alert card-panel" v-if="needsRefresh">
      <div class="left">
        <p>The DNCA forms list has been updated. You may want to refresh the list.</p>
      </div>
      <div class="right">
        <a @click="refreshAlertRefresh" class="btn-flat amber darken-2 waves-effect waves-light">
          <p class="material-icons">refresh</p>
        </a>
        <a @click="refreshAlertClose" class="btn-flat red waves-effect waves-light end">
          <p class="material-icons">close</p>
        </a>
      </div>
    </div>
    <div class="forms-list card-panel">
      <div class="form-contents">
        <div class="modal">
          <div class="modal-content">
            <h4 class="teal-text text-darken-1">Delete DNCA Form</h4>
            <p>Are you sure you want to delete the selected DNCA form?</p>
          </div>
          <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-teal btn-flat amber darken-2">Cancel</a>
            <a
              @click="deleteForm(deleteFormModal.selectedFormId)"
              class="modal-close waves-effect waves-red btn-flat amber darken-2"
            >OK</a>
          </div>
        </div>
        <ul class="collapsible card">
          <template v-for="form in forms">
            <li v-bind:key="form.id">
              <div class="form-header grey lighten-3">
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
                        <a
                          @click="confirmDelete(form.form.id)"
                          class="btn-flat red waves-effect waves-light"
                        >Delete</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="form-body">
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
                  <div class="row">
                    <div class="col s12 m3 label">Last Modified:</div>
                    <div class="col s12 m9">{{form.stringDateModified}}&nbsp;</div>
                  </div>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="pages">
      <ul>
        <!-- <li v-for="page in pageCount" :key="page">
          <router-link
            :to="{name: 'Forms', params: { page_index: page }}"
            v-if="page == pageNumber"
            class="waves-effect waves-light btn-flat amber darken-2"
          >{{ page }}</router-link>
          <router-link
            :to="{name: 'Forms', params: { page_index: page }}"
            v-else
            class="waves-effect waves-light btn-flat grey lighten-2 grey-text text-darken-1"
          >{{ page }}</router-link>
        </li>-->
        <li>
          <router-link
            :to="{name: 'Forms', params: { page_index: 1 }}"
            v-if="pageNumber > 1"
            class="waves-effect waves-light btn-flat grey lighten-2 grey-text text-darken-1"
          >
            <i class="material-icons">first_page</i>
          </router-link>
          <router-link
            :to="{name: 'Forms', params: { page_index: 1 }}"
            v-else
            class="waves-effect waves-light btn-flat grey lighten-2 grey-text text-darken-1 disabled"
          >
            <i class="material-icons">first_page</i>
          </router-link>
        </li>
        <li>
          <router-link
            :to="{name: 'Forms', params: { page_index: pageNumber - 1 }}"
            v-if="pageNumber > 1"
            class="waves-effect waves-light btn-flat grey lighten-2 grey-text text-darken-1"
          >
            <i class="material-icons">navigate_before</i>
          </router-link>
          <router-link
            :to="{name: 'Forms', params: { page_index: pageNumber - 1 }}"
            v-else
            class="waves-effect waves-light btn-flat grey lighten-2 grey-text text-darken-1 disabled"
          >
            <i class="material-icons">navigate_before</i>
          </router-link>
        </li>
        <li>
          <router-link
            :to="{name: 'Forms', params: { page_index: pageNumber }}"
            class="waves-effect waves-light btn-flat amber darken-2"
          >{{ pageNumber }}</router-link>
        </li>
        <li>
          <router-link
            :to="{name: 'Forms', params: { page_index: pageNumber + 1 }}"
            v-if="pageNumber < pageCount"
            class="waves-effect waves-light btn-flat grey lighten-2 grey-text text-darken-1"
          >
            <i class="material-icons">navigate_next</i>
          </router-link>
          <router-link
            :to="{name: 'Forms', params: { page_index: pageNumber + 1 }}"
            v-else
            class="waves-effect waves-light btn-flat grey lighten-2 grey-text text-darken-1 disabled"
          >
            <i class="material-icons">navigate_next</i>
          </router-link>
        </li>
        <li>
          <router-link
            :to="{name: 'Forms', params: { page_index: pageCount }}"
            v-if="pageNumber < pageCount"
            class="waves-effect waves-light btn-flat grey lighten-2 grey-text text-darken-1"
          >
            <i class="material-icons">last_page</i>
          </router-link>
          <router-link
            :to="{name: 'Forms', params: { page_index: pageCount }}"
            v-else
            class="waves-effect waves-light btn-flat grey lighten-2 grey-text text-darken-1 disabled"
          >
            <i class="material-icons">last_page</i>
          </router-link>
        </li>
      </ul>
      <p class="center">Page {{ pageNumber }} of {{ pageCount }}</p>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase/init";
import utils from "@/constants";
export default {
  name: "Forms",
  data() {
    return {
      forms: [],
      formsSnapshot: null,
      pageCount: null,
      pageNumber: this.$route.params.page_index,
      deleteFormModal: null,
      needsRefresh: false
    };
  },
  methods: {
    updatePage() {
      this.pageNumber = this.$route.params.page_index;
      if (this.formsSnapshot) this.getFormsAtPage(this.pageNumber - 1);
    },
    refreshAlertRefresh() {
      this.getFormsAtPage(this.pageNumber - 1);
      this.needsRefresh = false;
    },
    refreshAlertClose() {
      this.needsRefresh = false;
    },
    confirmDelete(id) {
      if (this.deleteFormModal) {
        const modal = M.Modal.getInstance(this.deleteFormModal);
        modal.open();
        this.deleteFormModal.selectedFormId = id;
      }
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
        .then(doc => {
          if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
        });
      db.collection("population")
        .doc(id)
        .delete();
      db.collection("families")
        .where("formId", "==", id)
        .get()
        .then(doc => {
          if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
        });
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
        .then(doc => {
          if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
        });
      db.collection("shelterNeeds")
        .doc(id)
        .delete();
      db.collection("shelterAssistance")
        .doc(id)
        .delete();
      db.collection("shelterGaps")
        .where("formId", "==", id)
        .get()
        .then(doc => {
          if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
        });

      /* Food Security */
      db.collection("foodImpact")
        .where("formId", "==", id)
        .get()
        .then(doc => {
          if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
        });
      db.collection("foodCoping")
        .where("formId", "==", id)
        .get()
        .then(doc => {
          if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
        });
      db.collection("foodNeeds")
        .where("formId", "==", id)
        .get()
        .then(doc => {
          if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
        });
      db.collection("foodAssistance")
        .doc(id)
        .delete();
      db.collection("foodGaps")
        .where("formId", "==", id)
        .get()
        .then(doc => {
          if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
        });

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
        .then(doc => {
          if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
        });
      db.collection("livelihoodsNeeds")
        .where("formId", "==", id)
        .get()
        .then(doc => {
          if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
        });
      db.collection("livelihoodsAssistance")
        .doc(id)
        .delete();
      db.collection("livelihoodsGaps")
        .where("formId", "==", id)
        .get()
        .then(doc => {
          if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
        });
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
        .then(doc => {
          if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
        });
      db.collection("healthAssistance")
        .doc(id)
        .delete();
      db.collection("healthGaps")
        .where("formId", "==", id)
        .get()
        .then(doc => {
          if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
        });
      /* Wash */
      db.collection("washConditions")
        .where("formId", "==", id)
        .get()
        .then(doc => {
          if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
        });
      db.collection("washCoping")
        .where("formId", "==", id)
        .get()
        .then(doc => {
          if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
        });
      db.collection("washAssistance")
        .doc(id)
        .delete();
      db.collection("washGaps")
        .where("formId", "==", id)
        .get()
        .then(doc => {
          if (doc && doc.docs.size >= 1) doc.docs[0].ref.delete();
        });
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
      M.toast({ html: "Selected DNCA form has been deleted successfully." });
    },
    getFormsAtPage(page) {
      const FORMS_PER_PAGE = 5;
      firebase.db
        .collection("form")
        .orderBy("form.dateModified", "desc")
        .startAt(this.formsSnapshot.docs[page * FORMS_PER_PAGE])
        .limit(FORMS_PER_PAGE)
        .get()
        .then(doc => {
          this.forms = [];
          doc.forEach(form => {
            const data = form.data();
            data.stringDate = utils.convertDate(
              data.formDetails[0].assessmentDate
            );
            data.stringDateModified = utils.convertDateTime(
              data.form.dateModified
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
    const FORMS_PER_PAGE = 5;
    firebase.auth.onAuthStateChanged(user => {
      if (!user) this.$router.push("/");
    });

    firebase.db
      .collection("form")
      .orderBy("form.dateModified", "desc")
      .onSnapshot(snapshot => {
        /* Notify the user that they need to refresh to load new items in the page */
        if (this.formsSnapshot) {
          this.needsRefresh = true;
        }

        /* Update pagination information */
        this.pageCount = Math.ceil(snapshot.size / FORMS_PER_PAGE);
        if (!this.pageNumber || this.pageNumber < 1) {
          this.pageNumber = 1;
        } else if (this.pageNumber > this.pageCount) {
          this.pageNumber = this.pageCount;
        }

        if (!this.formsSnapshot || this.formsSnapshot.size > snapshot.size) {
          /* Refresh page when forms snapshot is null or a form item has been deleted */
          this.formsSnapshot = snapshot;
          this.getFormsAtPage(this.pageNumber - 1);
        } else {
          this.formsSnapshot = snapshot;
        }
      });
  },
  mounted() {
    var doc = document.querySelector(".forms .form-contents");
    this.deleteFormModal = doc.querySelector(".modal");
    M.Modal.init(this.deleteFormModal, {});
  }
};
</script>

<style>
.forms h6 {
  font-size: 1em;
  text-transform: uppercase;
  font-weight: 700;
}
.forms .forms-list .btn-flat {
  color: white;
  height: 35px;
  border-radius: 8px;
  margin-left: 5px !important;
}
.refresh-alert.card-panel {
  margin-bottom: 20px !important;
  height: 150px;
}
.refresh-alert.card-panel .left {
  width: 50%;
}
.refresh-alert p {
  margin: 15px;
}
.refresh-alert a p {
  margin: 63px 0;
}
.refresh-alert .btn-flat {
  box-shadow: none;
  height: 150px;
  color: white;
  border-radius: 0;
  font-weight: 700;
}
.refresh-alert .btn-flat.end {
  border-radius: 0 8px 8px 0;
}
.forms .modal .modal-content {
  padding: 24px 24px 12px 24px;
}
.forms .modal .modal-footer {
  padding: 12px 24px 24px 24px;
  height: auto;
}
.forms .collapsible {
  box-shadow: none;
  margin: 10px 0;
  border-left: none;
  border-right: none;
}
.forms .collapsible .form-header {
  font-weight: 700;
  padding-top: 1px;
  padding-bottom: 1px;
  text-transform: uppercase;
}
.forms .collapsible .form-header .container,
.forms .collapsible .form-body .container {
  margin: 0;
  width: 100%;
}
.forms .collapsible li {
  border-bottom: 1px solid #ddd;
}
.forms .collapsible .form-header p {
  margin: 7px auto;
}
.forms .collapsible .form-header .row {
  margin: 5px 0;
  width: 100%;
}
.forms .collapsible .form-header .row .left {
  margin-left: 15px;
}
.forms .collapsible .form-header .row .right {
  margin-right: 15px;
}
.forms .collapsible .form-body {
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
.forms .pages ul {
  text-align: center;
}
.forms .pages ul li {
  display: inline-block;
  margin: 0 2px;
}

@media only screen and (min-width: 484px) {
  .refresh-alert.card-panel {
    height: 90px;
  }
  .refresh-alert.card-panel .left {
    width: 70%;
  }
  .refresh-alert .btn-flat {
    height: 90px;
  }
  .refresh-alert p {
    margin: 15px;
  }
  .refresh-alert a p {
    margin: 35px 0;
  }
}
@media only screen and (min-width: 761px) {
  .refresh-alert.card-panel {
    height: 50px;
  }
  .refresh-alert.card-panel .left {
    width: auto;
  }
  .refresh-alert .btn-flat {
    height: 50px;
  }
  .refresh-alert p {
    margin: 15px;
  }
  .refresh-alert a p {
    margin: 12.5px 0;
  }
}
</style>


