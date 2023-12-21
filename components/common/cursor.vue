<script setup lang="ts">
import { Linear, gsap } from 'gsap';
import { useEffect } from 'vue-hooks-api';
import { type IDesktop, isSmallScreen } from '~/store/constants';
import styles from './Cursor.module.scss';

const CURSOR_STYLES = {
  CURSOR: 'fixed hidden bg-white w-4 h-4 select-none pointer-events-none z-50',
  FOLLOWER: 'fixed hidden h-8 w-8 select-none pointer-events-none z-50',
};

const props = defineProps<IDesktop>();

const cursor: Ref<HTMLElement | undefined> = ref(undefined);
const follower: Ref<HTMLElement | undefined> = ref(undefined);

const onHover = () => {
  gsap.to(cursor.value!, {
    scale: 0.5,
    duration: 0.3,
  });
  gsap.to(follower.value!, {
    scale: 3,
    duration: 0.3,
  });
};

const onUnhover = () => {
  gsap.to(cursor.value!, {
    scale: 1,
    duration: 0.3,
  });
  gsap.to(follower.value!, {
    scale: 1,
    duration: 0.3,
  });
};

const moveCircle = (e: MouseEvent) => {
  gsap.to(cursor.value!, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.1,
    ease: Linear.easeNone,
  });
  gsap.to(follower.value!, {
    x: e.clientX,
    y: e.clientY,
    duration: 0.3,
    ease: Linear.easeNone,
  });
};

const initCursorAnimation = () => {
  follower.value!.classList.remove('hidden');
  cursor.value!.classList.remove('hidden');

  document.addEventListener('mousemove', moveCircle);

  document.querySelectorAll('.link').forEach((el) => {
    el.addEventListener('mouseenter', onHover);
    el.addEventListener('mouseleave', onUnhover);
  });
};

useEffect(() => {
  if (props.isDesktop && !isSmallScreen()) {
    initCursorAnimation();
  }
}, [cursor, follower, props.isDesktop]);
</script>

<template>
  <div>
    <div ref="cursor" :class="`${styles.cursor} ${CURSOR_STYLES.CURSOR}`" />
    <div ref="follower" :class="`${styles.cursorFollower} ${CURSOR_STYLES.FOLLOWER}`" />
  </div>
</template>
