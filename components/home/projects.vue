<script setup lang="ts" name="ProjectsSection">
import { Linear, gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import ProjectTile from '../common/project-tile.vue'
import { type IDesktop, MENULINKS, NO_MOTION_PREFERENCE_QUERY, PROJECTS } from '~/store/constants'

const props = defineProps<IDesktop>()
const targetSectionRef: Ref<HTMLElement | undefined> = ref(undefined)
const sectionTitleElementRef: Ref<HTMLElement | undefined> = ref(undefined)

const willChange = ref(false)
const horizontalAnimationEnabled = ref(false)

function initRevealAnimation(targetSectionRef: Ref<HTMLElement | undefined>): [GSAPTimeline, ScrollTrigger] {
  const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } })
  revealTl.from(targetSectionRef.value!.querySelectorAll('.seq'), { opacity: 0, duration: 0.5, stagger: 0.5 }, '<')

  const scrollTrigger = ScrollTrigger.create({
    trigger: targetSectionRef.value,
    start: 'top bottom',
    end: 'bottom bottom',
    scrub: 0,
    animation: revealTl,
  })

  return [revealTl, scrollTrigger]
}

function initProjectsAnimation(
  targetSectionRef: Ref<HTMLElement | undefined>,
  sectionTitleElementRef: Ref<HTMLElement | undefined>,
): [GSAPTimeline, ScrollTrigger] {
  const timeline = gsap.timeline({ defaults: { ease: Linear.easeNone } })
  const sidePadding = document.body.clientWidth - targetSectionRef.value!.querySelector('.inner-container')!.clientWidth
  const elementWidth = sidePadding + targetSectionRef.value!.querySelector('.project-wrapper')!.clientWidth
  targetSectionRef.value!.style.width = `${elementWidth}px`
  const width = window.innerWidth - elementWidth
  const duration = `${(elementWidth / window.innerHeight) * 100}%`
  timeline.to(targetSectionRef.value!, { x: width }).to(sectionTitleElementRef.value!, { x: -width }, '<')

  const scrollTrigger = ScrollTrigger.create({
    trigger: targetSectionRef.value,
    start: 'top top',
    end: duration,
    scrub: 0,
    pin: true,
    animation: timeline,
    pinSpacing: 'margin',
    onToggle: self => (willChange.value = self.isActive),
  })
  return [timeline, scrollTrigger]
}

onMounted(() => {
  let projectsScrollTrigger: ScrollTrigger | undefined
  let projectsTimeline: GSAPTimeline | undefined
  const { matches } = window.matchMedia(NO_MOTION_PREFERENCE_QUERY)
  horizontalAnimationEnabled.value = props.isDesktop && matches
  if (props.isDesktop && matches) {
    [projectsTimeline, projectsScrollTrigger] = initProjectsAnimation(targetSectionRef, sectionTitleElementRef)
  }
  else {
    const projectWrapper = targetSectionRef.value!.querySelector('.project-wrapper') as HTMLDivElement
    const parentPadding = window.getComputedStyle(targetSectionRef.value!).getPropertyValue('padding-left')

    targetSectionRef.value!.style.setProperty('width', '100%')
    projectWrapper.classList.add('overflow-x-auto')
    projectWrapper.style.setProperty('width', `calc(100vw)`)
    projectWrapper.style.setProperty('padding', `0 ${parentPadding}`)
    projectWrapper.style.setProperty('transform', `translateX(-${parentPadding})`)
  }
  const [revealTimeline, revealScrollTrigger] = initRevealAnimation(targetSectionRef)

  onUnmounted(() => {
    projectsScrollTrigger && projectsScrollTrigger.kill()
    projectsTimeline && projectsTimeline.kill()
    revealScrollTrigger && revealScrollTrigger.kill()
    revealTimeline && revealTimeline.progress(1)
  })
})

const { ref: projectsSectionRef } = MENULINKS[1]
</script>

<template>
  <section
    :id="projectsSectionRef"
    ref="targetSectionRef"
    :class="`${isDesktop && 'min-h-scree'} w-full relative select-none section-container flex-col flex  py-18 justify-center`"
  >
    <!-- <ProjectT /> -->
    <div ref="sectionTitleElementRef" :class="`flex flex-col inner-container  ${willChange && 'will-change-transform'}`">
      <p class="seq section-title-sm">
        PROJECTS
      </p>
      <h1 class="seq section-heading mt-2">
        My Works
      </h1>
      <h2 class="seq mt-2 max-w-sm w-full text-2xl md:max-w-3xl">
        I have contributed in over 20+ projects ranging from Frontend development, UI/UX design, Open Source, and Motion Graphics
      </h2>
    </div>
    <div class="seq gaodu project-wrapper grid auto-cols-max grid-flow-col w-fit snap-x snap-mandatory scroll-pl-6 gap-6 md:gap-10">
      <ProjectTile v-for="(item, _) in PROJECTS" :key="item.name" :project="item" :animation-enabled="horizontalAnimationEnabled" />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.gaodu {
  @apply mt-6;
}
@media screen and (min-height: 651px) {
  .gaodu {
    @apply mt-12;
  }
}
</style>
