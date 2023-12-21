<script lang="ts" setup name="CollaborationSection">
import { Linear, gsap } from 'gsap'
import { useEffect, useState } from 'vue-hooks-api'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { NO_MOTION_PREFERENCE_QUERY, isSmallScreen } from '~/store/constants'

const COLLABORATION_STYLE = {
  SLIDING_TEXT: 'opacity-20 text-5xl md:text-7xl font-bold whitespace-nowrap',
  SECTION: 'w-full relative select-none tall:py-36 py-48 section-container flex flex-col',
  TITLE: 'mt-6 md:mt-8 font-medium text-4xl md:text-5xl text-center',
}

const quoteRef: Ref<HTMLElement | undefined> = ref(undefined)
const targetSection: Ref<HTMLElement | undefined> = ref(undefined)

const [willChange, setwillChange] = useState(false)

function initTextGradientAnimation(targetSection: Ref<HTMLElement | undefined>): ScrollTrigger {
  const timeline = gsap.timeline({ defaults: { ease: Linear.easeNone } })
  timeline.from(quoteRef.value!, { opacity: 0, duration: 2 }).to(quoteRef.value!.querySelector('.text-strong'), {
    backgroundPositionX: '100%',
    duration: 1,
  })

  return ScrollTrigger.create({
    trigger: targetSection.value!,
    start: 'center bottom',
    end: 'center center',
    scrub: 0,
    animation: timeline,
    onToggle: self => setwillChange(self.isActive),
  })
}

function initSlidingTextAnimation(targetSection: Ref<HTMLElement | undefined>) {
  const slidingTl = gsap.timeline({ defaults: { ease: Linear.easeNone } })

  slidingTl
    .to(targetSection.value!.querySelector('.ui-left'), {
      xPercent: isSmallScreen() ? -500 : -150,
    })
    .from(targetSection.value!.querySelector('.ui-right'), { xPercent: isSmallScreen() ? -500 : -150 }, '<')

  return ScrollTrigger.create({
    trigger: targetSection.value!,
    start: 'top bottom',
    end: 'bottom top',
    scrub: 0,
    animation: slidingTl,
  })
}

useEffect(() => {
  const textBgAnimation = initTextGradientAnimation(targetSection)
  let slidingAnimation: ScrollTrigger | undefined

  const { matches } = window.matchMedia(NO_MOTION_PREFERENCE_QUERY)

  if (matches)
    slidingAnimation = initSlidingTextAnimation(targetSection)

  return () => {
    textBgAnimation.kill()
    slidingAnimation?.kill()
  }
}, [quoteRef, targetSection])
</script>

<template>
  <section ref="targetSection" :class="COLLABORATION_STYLE.SECTION">
    <p :class="`ui-left ${COLLABORATION_STYLE.SLIDING_TEXT}`">
      {{
        Array.from({ length: 5 })
          .fill(' User Interface Design User Experience Design ')
          .reduce((str, el) => str.concat(el), '')
      }}
    </p>
    <h1 ref="quoteRef" :class="`${COLLABORATION_STYLE.TITLE} ${willChange && 'will-change-opacity'}`">
      Interested in <span class="text-strong font-bold">Collaboration</span>?
    </h1>

    <p :class="`mt-6 md:mt-8 ui-right ${COLLABORATION_STYLE.SLIDING_TEXT}`">
      {{
        Array.from({ length: 5 })
          .fill(' Frontend Development Motion Graphics ')
          .reduce((str, el) => str.concat(el), '')
      }}
    </p>
  </section>
</template>
