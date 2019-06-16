<template>
  <div class="forms-list">
    <h2>DNCA Forms</h2>
    <div class="forms">
      <div class="form-single card" v-for="form in forms" :key="form.id">
        <ul>
          <li>Assessment Date: {{form.stringDate}}</li>
          <li>Assessment Date: {{form.stringDate}}</li>
        </ul>
      </div>
    </div>
    <!-- Accent-colored raised button with ripple -->
    <!-- <button
      class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
    >Button</button>-->
  </div>
</template>

<script>
import db from "@/firebase/init";
export default {
  name: "FormsList",
  data() {
    return {
      forms: [],
      formsSubscription: null
    };
  },
  created() {
    var collection = db.collection("formDetails");
    this.formsSubscription = collection.onSnapshot(() => {
      collection.get().then(snapshot => {
        this.forms = [];
        snapshot.forEach(doc => {
          let form = doc.data();
          form.id = doc.id;
          form.stringDate = new Date(form.assessmentDate).toLocaleDateString(
            "en-US"
          );
          this.forms.push(form);
        });
      });
    });
  }
};
</script>

<style>
.forms-list h2 {
  font-weight: 600;
  color: white;
}
.forms-list .card {
  border-radius: 8px;
}
.forms-list .forms {
  margin: 0 40px;
  padding: 10px 0;
}
.forms-list .form-single {
  margin: 20px;
}
.forms-list h3 {
  margin: 40px 0 0;
}
.forms-list ul {
  list-style-type: none;
  padding: 0;
}
.forms-list li {
  text-align: justify;
  margin: 0 10px;
}
.forms-list a {
  color: #42b983;
}
</style>
