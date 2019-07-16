<template>
  <div class="container footer" v-if="!mustHide">
    <div class="section">
      <div class="divider"></div>
    </div>
    <p class="center">Quik Data (c) 2019</p>
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


