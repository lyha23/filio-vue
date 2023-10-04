<script lang="ts" setup name="QuoteSection">
import { Linear, gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const quoteRef: Ref<HTMLElement | undefined> = ref(undefined);
const targetSection: Ref<HTMLElement | undefined> = ref(undefined);

const willChange = ref(false);

const initQuoteAnimation = (quoteRef: Ref<HTMLElement | undefined>, targetSection: Ref<HTMLElement | undefined>): ScrollTrigger => {
  const timeline = gsap.timeline({ defaults: { ease: Linear.easeNone } });
  timeline.from(quoteRef.value!, { opacity: 0, duration: 2 }).to(quoteRef.value!.querySelector('.text-strong'), {
    backgroundPositionX: '100%',
    duration: 1,
  });

  return ScrollTrigger.create({
    trigger: targetSection.value,
    start: 'center bottom',
    end: 'center center',
    scrub: 0,
    animation: timeline,
    onToggle: (self) => (willChange.value = self.isActive),
  });
};

onMounted(() => {
  const quoteAnimationRef = initQuoteAnimation(quoteRef, targetSection);
  onUnmounted(() => {
    return quoteAnimationRef.kill;
  });
});
</script>

<template>
  <section ref="targetSection" class="relative w-full select-none">
    <div class="section-container tall:py-60 py-72">
      <h1 ref="quoteRef" :class="`${willChange && 'will-change-opacity'} font-medium  text-center text-4xl md:text-5xl`">
        I have a <span class="text-strong font-bold">strong</span> obsession for attention to detail.
      </h1>
    </div>
  </section>
</template>
