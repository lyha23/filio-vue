<script lang="ts" setup name="SkillsSection">
import { Linear, gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { MENULINKS, SKILLS } from '@/constants';
import renderSkillColumn from './render-skill-column.vue';

const willChange = ref(false);
function initRevealAnimation(targetSection: Ref<HTMLElement | undefined>): ScrollTrigger {
  const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } });
  revealTl.from(targetSection.value!.querySelectorAll('.seq'), { opacity: 0, duration: 0.5, stagger: 0.5 }, '<');
  return ScrollTrigger.create({
    trigger: targetSection.value!.querySelector('.skills-wrapper'),
    start: '100px bottom',
    end: `center center`,
    animation: revealTl,
    scrub: 0,
    onToggle: (self) => (willChange.value = self.isActive),
  });
}

const targetSection: Ref<HTMLElement | undefined> = ref(undefined);
onMounted(() => {
  const revealAnimationRef = initRevealAnimation(targetSection);
  onUnmounted(() => {
    return revealAnimationRef.kill;
  });
});
</script>

<template>
  <section class="relative">
    <!-- renderBackgroundPattern -->
    <div class="absolute right-0 hidden max-w-xs w-1/5 justify-end -bottom-1/3 md:flex">
      <img src="/pattern-r.svg" loading="lazy" height="700" width="320" alt="pattern" />
    </div>
    <div class="absolute left-0 hidden max-w-xs w-1/12 -bottom-3.5 md:block">
      <img src="/pattern-l.svg" loading="lazy" height="335" width="140" alt="pattern" />
    </div>
    <div
      :id="MENULINKS[2].ref"
      ref="targetSection"
      class="section-container relative mb-24 w-full flex flex-col select-none justify-center py-12"
    >
      <div class="skills-wrapper flex flex-col">
        <!-- renderSectionTitle -->
        <div class="flex flex-col">
          <p class="section-title-sm seq">SKILLS</p>
          <h1 class="section-heading seq mt-2">My Skills</h1>
          <h2 class="seq mt-2 w-full text-2xl md:max-w-2xl">
            I like to take responsibility to craft aesthetic user experience using modern frontend architecture.
          </h2>
        </div>
        <div class="mt-10">
          <renderSkillColumn :skills="SKILLS.frontend" :will-change="willChange" title="FRONTEND DEVELOPMENT" />
        </div>
        <div class="mt-10 flex flex-wrap">
          <div class="mb-6 mr-6">
            <renderSkillColumn :skills="SKILLS.userInterface" :will-change="willChange" title="User Interface, User Experience Design" />
          </div>
          <div>
            <renderSkillColumn :skills="SKILLS.other" :will-change="willChange" title="Other Skills" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
