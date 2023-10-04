<script setup lang="ts" name="AboutSection">
import { Linear, gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useState } from 'vue-hooks-api';

const quoteRef: Ref<HTMLElement | undefined> = ref(undefined);
const targetSection: Ref<HTMLElement | undefined> = ref(undefined);

// let willChange = ref(false)
const [willChange, setwillChange] = useState(false);

const initAboutAnimation = (quoteRef: Ref<HTMLElement | undefined>, targetSection: Ref<HTMLElement | undefined>): ScrollTrigger => {
  const timeline = gsap.timeline({
    defaults: { ease: Linear.easeNone, duration: 0.1 },
  });
  timeline
    .fromTo(quoteRef.value!.querySelector('.about-1'), { opacity: 0.2 }, { opacity: 1 })
    .to(quoteRef.value!.querySelector('.about-1'), {
      opacity: 0.2,
      delay: 0.5,
    })
    .fromTo(quoteRef.value!.querySelector('.about-2'), { opacity: 0.2 }, { opacity: 1 }, '<')
    .to(quoteRef.value!.querySelector('.about-2'), {
      opacity: 0.2,
      delay: 1,
    });

  const scrollTriggerInstance = ScrollTrigger.create({
    trigger: targetSection.value,
    start: 'center 80%',
    end: 'center top',
    scrub: 0,
    animation: timeline,
    onToggle: (self) => setwillChange(self.isActive),
  });
  return scrollTriggerInstance;
};

useEffect(() => {
  const aboutScrollTriggerInstance = initAboutAnimation(quoteRef, targetSection);

  return aboutScrollTriggerInstance.kill;
}, [quoteRef, targetSection]);
</script>

<template>
  <section ref="targetSection" class="section-container relative w-full select-none pb-16 pb-24 pt-20 pt-40">
    <h1 ref="quoteRef" class="text-3xl font-medium md:text-6xl sm:text-4xl">
      <span :class="`about-1 leading-tight ${willChange ? 'will-change-opacity' : ''}`">
        I am a passionate UI Engineer who bridges the gap between development and design.
      </span>
      <span :class="`about-2 leading-tight ${willChange ? 'will-change-opacity' : ''}`">
        I take responsibility to craft a good user experience using modern frontend sarchitecture.
      </span>
    </h1>
  </section>
</template>
