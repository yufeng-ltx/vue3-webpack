<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss">

</style>
