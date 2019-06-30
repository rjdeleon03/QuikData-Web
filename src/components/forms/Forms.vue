<template>
  <div class="forms">
    <h2 class="center teal-text text-darken-1">Forms</h2>
    <div class="forms-list">
      <div class="form-single card-panel" v-for="form in forms" :key="form.id">
        <div class="form-header grey lighten-1">
          <h6 class="center">Assessment Date: {{form.stringDate}}</h6>
        </div>
        <div class="form-contents">
          <ul>
            <li>Sitio: {{form.baselineData[0].sitio}}</li>
            <li>Barangay: {{form.baselineData[0].barangay}}</li>
            <li>City / Municipality: {{form.baselineData[0].city}}</li>
            <li>Province: {{form.baselineData[0].province}}</li>
            <li>Calamity: {{form.calamityInfo[0].calamityType}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Forms",
  data() {
    return {
      forms: []
    };
  },
  created() {
    db.collection("form").onSnapshot(doc => {
      this.forms = [];
      doc.forEach(form => {
        const data = form.data();
        data.stringDate = new Date(
          data.formDetails[0].assessmentDate
        ).toLocaleDateString("en-US");
        console.log(data);
        this.forms.push(data);
      });
    });
  }
};
</script>

<style>
.forms h2 {
  font-size: 2.4em;
  margin: 30px;
}
.forms h6 {
  font-size: 1em;
  text-transform: uppercase;
  font-weight: 700;
}
.forms .forms-list {
  max-width: 700px;
  margin: auto;
}
.forms .card-panel {
  border-radius: 8px;
  padding: 0px;
}
.forms .form-header {
  border-radius: 8px 8px 0 0;
  padding-top: 1px;
  padding-bottom: 1px;
}

.forms .form-contents {
  padding: 5px 20px 5px 20px;
}
</style>


