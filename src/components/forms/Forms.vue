<template>
  <div class="forms">
    <h2>Forms</h2>
    <div class="forms-list">
      <div class="form-single card-panel" v-for="form in forms" :key="form.id">
        <ul>
          <li>Assessment Date: {{form.stringDate}}</li>
          <li>Sitio: {{form.baselineData[0].sitio}}</li>
          <li>Barangay: {{form.baselineData[0].barangay}}</li>
          <li>City / Municipality: {{form.baselineData[0].city}}</li>
          <li>Province: {{form.baselineData[0].province}}</li>
          <li>Calamity: {{form.calamityInfo[0].calamityType}}</li>
        </ul>
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
.forms .forms-list {
  max-width: 700px;
  margin: auto;
}
.forms .card-panel {
  padding: 5px 20px 5px 20px;
  border-radius: 8px;
}
</style>


