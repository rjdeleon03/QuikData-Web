<template>
  <div class="home">
    <FormsList/>
  </div>
</template>

<script>
// @ is an alias to /src
import FormsList from '@/components/FormsList.vue'

export default {
  name: 'home',
  components: {
    FormsList
  }
}
</script>
