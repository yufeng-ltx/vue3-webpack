<template>
  <div>
    <video
      id="my-player"
      class="video-js"
      controls
      preload="auto"
    >
      <source
        src="@/assets/video/2.mp4"
        type="video/mp4"
      >
    </video>
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue';
import videojs from 'video.js';

export default {
  setup() {
    onMounted(() => {
      videojs('my-player', {
        width: '400'
      });
    });
    return { };
  }
};
</script>

<style lang="scss">

</style>
