<script setup name="LandingHero" lang="ts">
import { Linear, gsap } from 'gsap'
import Typed from 'typed.js'
import { useEffect } from 'vue-hooks-api'
import Button, { ButtonTypes } from '../common/button.vue'
import HeroImage from './hero-image'
import { MENULINKS, SOCIAL_LINKS, TYPED_STRINGS } from '~/store/constants'

const HERO_STYLES = {
  SECTION: 'w-full flex md:items-center py-8 section-container min-h-screen relative mb-24',
  CONTENT: 'font-medium flex flex-col pt-32 md:pt-0 select-none',
  SOCIAL_LINK: 'link hover:opacity-80 duration-300 md:mr-4 mr-2',
  BG_WRAPPER: 'absolute hero-bg right-0 md:bottom-0 bottom-8 md:w-3/4 w-full scale-125 sm:scale-100 flex items-end',
  TYPED_SPAN: 'text-xl sm:text-2xl md:text-4xl seq',
}

const typedSpanElement: Ref<HTMLElement | undefined> = ref(undefined)
const targetSection: Ref<HTMLElement | undefined> = ref(undefined)

function initTypeAnimation(typedSpanElement: Ref<HTMLElement | undefined>): Typed {
  return new Typed(typedSpanElement.value, {
    strings: TYPED_STRINGS,
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 8000,
    loop: true,
  })
}

function initRevealAnimation(targetSection: Ref<HTMLElement | undefined>): GSAPTimeline {
  const revealTl = gsap.timeline({ defaults: { ease: Linear.easeNone } })
  revealTl
    .to(targetSection.value!, { opacity: 1, duration: 2 })
    .from(targetSection.value!.querySelectorAll('.seq'), { opacity: 0, duration: 0.5, stagger: 0.5 }, '<')
  return revealTl
}
onMounted(() => {
  useEffect(() => {
    const typed = initTypeAnimation(typedSpanElement)
    initRevealAnimation(targetSection)
    return typed.destroy
  }, [typedSpanElement, targetSection])
})

const { ref: heroSectionRef } = MENULINKS[0]
</script>

<template>
  <div>
    <section :id="heroSectionRef" ref="targetSection" :class="HERO_STYLES.SECTION" style="opacity: 100">
      <div :class="HERO_STYLES.CONTENT">
        <div class="mb-2 md:mb-4">
          <h2 class="seq text-4xl">
            Hello 👋🏻
          </h2>
          <h1 class="seq text-3xl">
            I am Ayush Singh
          </h1>
        </div>
        <p class="mb-4">
          <span ref="typedSpanElement" :class="HERO_STYLES.TYPED_SPAN" />
        </p>
        <div class="seq mb-5 flex">
          <a
            v-for="(item, key) in SOCIAL_LINKS"
            :key="item"
            :href="SOCIAL_LINKS[item]"
            :class="HERO_STYLES.SOCIAL_LINK"
            rel="noreferrer"
            target="_blank"
          >
            <img :src="`/social/${key}.svg`" :alt="key" width="40" height="40">
          </a>
        </div>
        <div class="seq flex">
          <Button classes="mr-3" :type="ButtonTypes.OUTLINE" name="Resume" target="_blank" rel="noreferrer" href="/Ayush_Resume.pdf" />
          <Button
            classes="ml-3"
            :type="ButtonTypes.PRIMARY"
            name="Let's Talk"
            :href="SOCIAL_LINKS.topmate"
            target="_blank"
            rel="noreferrer"
          />
        </div>
      </div>
      <div :class="HERO_STYLES.BG_WRAPPER" style="maxheight: '650px'">
        <HeroImage />
      </div>
    </section>
  </div>
</template>
