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
                  <div class="col s2 label">Sitio:</div>
                  <div class="col s10">{{form.baselineData[0].sitio}}</div>
                </div>
                <div class="row">
                  <div class="col s2 label">Barangay:</div>
                  <div class="col s10">{{form.baselineData[0].barangay}}</div>
                </div>
                <div class="row">
                  <div class="col s2 label">City / Municipality:</div>
                  <div class="col s10">{{form.baselineData[0].city}}</div>
                </div>
                <div class="row">
                  <div class="col s2 label">Province:</div>
                  <div class="col s10">{{form.baselineData[0].province}}</div>
                </div>
                <div class="row">
                  <div class="col s2 label">Calamity:</div>
                  <div class="col s10">{{form.baselineData[0].calamityType}}</div>
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
      forms: []
    };
  },
  created() {
    firebase.db.collection("form").onSnapshot(doc => {
      this.forms = [];
      doc.forEach(form => {
        const data = form.data();
        data.stringDate = utils.convertDate(data.formDetails[0].assessmentDate);
        this.forms.push(data);
      });
    });
  },
  mounted() {
    var doc = document.querySelector(".forms .form-contents");
    console.log(doc);
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
  font-weight: 600;
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


