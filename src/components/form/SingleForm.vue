<template>
  <div class="form">
    <h2>Profile for {{ formId }}</h2>
  </div>
</template>

<script>
export default {
  name: "SingleForm",
  data() {
    return {
      formId: this.$route.params.form_id
    };
  },
  methods: {
    updateId() {
      this.formId = this.$route.params.form_id;
    }
  },
  watch: {
    $route: "updateId"
  }
};
</script>

<style>
</style>


