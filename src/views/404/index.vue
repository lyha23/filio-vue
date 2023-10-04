<script lang="ts" setup>
import { Application } from '@splinetool/runtime';
import { onMounted } from 'vue';
onMounted(() => {
  const canvas = document.querySelector('#canvas3d');
  const app = new Application(canvas);
  app.load('/@/views/404/scene.splinecode');
});
</script>

<template>
  <div>
    <canvas id="canvas3d" block />
  </div>
</template>
