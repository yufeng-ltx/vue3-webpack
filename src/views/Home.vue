<template>
  <div class="example">
    {{ vue }}，{{ test }}
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useCommonStore } from '@/stores/modules/common';

const commonStore = useCommonStore();
const { test } = storeToRefs(commonStore);
const vue = ref('Vue3');

</script>

<style lang="scss">
.example {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  padding: 30px;
}
</style>
