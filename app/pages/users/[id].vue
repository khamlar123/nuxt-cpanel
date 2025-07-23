<script setup lang="ts">
  const route = useRoute()

 const id = route.params.id
</script>

<template>
<u-card class="pa-4">
  <h1>{{id}}</h1>
</u-card>
</template>

<style scoped lang="scss">

</style>