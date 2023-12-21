<script setup lang="ts">
import { NO_MOTION_PREFERENCE_QUERY } from '~/store/constants'

const progress = ref(0)

function calculateProgress() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrolled = winScroll / height
  progress.value = scrolled
}

onMounted(() => {
  const { matches } = window.matchMedia(NO_MOTION_PREFERENCE_QUERY)
  matches && window.addEventListener('scroll', calculateProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', calculateProgress)
})
</script>

<template>
  <div>
    <div class="progress fixed top-0 z-50 w-full">
      <div class="progress-bar" :style="`transform:scaleX(${progress})`" />
    </div>
  </div>
</template>
