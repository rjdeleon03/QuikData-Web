<template>
  <div class="container footer" v-if="!mustHide">
    <div class="section">
      <div class="divider"></div>
    </div>
    <p class="center">
      Copyright 2019 Ilocos Center for Research, Empowerment, and Development.
      <br>All Rights Reserved.
    </p>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      mustHide: false
    };
  }
};
</script>

<style>
.footer.container {
  margin-top: 30px;
  margin-bottom: 60px;
}
@media print {
  .footer.container {
    visibility: collapse;
    height: 0;
  }
}
</style>


