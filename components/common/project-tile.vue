<script lang="ts" setup name="ProjectTile">
import VanillaTilt from 'vanilla-tilt'
import styles from './ProjectTile.module.scss'
import type { IProject } from '~/store/constants'

const props = defineProps<MyProp>()

const projectCard: Ref<HTMLElement | undefined> = ref(undefined)

interface MyProp {
  project: IProject
  animationEnabled: boolean
}
const {
  name,
  tech,
  image,
  blurImage,
  description,
  gradient: [stop1, stop2],
} = props.project

onMounted(() => {
  VanillaTilt.init(projectCard.value!, {
    'max': 5,
    'speed': 400,
    'glare': true,
    'max-glare': 0.2,
    'gyroscope': false,
  })
})
</script>

<template>
  <a
    :href="project.url"
    target="_blank"
    rel="noreferrer"
    class="link snap-start overflow-hidden rounded-3xl"
    :style="`maxWidth:${
      animationEnabled ? 'calc(100vw - 2rem)' : 'calc(100vw - 4rem)'
    }, flex: '1 0 auto',WebkitMaskImage: '-webkit-radial-gradient(white, black)'`"
  >
    <div
      ref="projectCard"
      :class="`${styles.ProjectTile} rounded-3xl relative p-6 flex-col flex justify-between max-w-full`"
      :style="`background: linear-gradient(90deg, ${stop1} 0%, ${stop2} 100%)`"
    >
      <img src="/project-bg.svg" alt="Project" layout="fill" class="absolute left-0 top-0 h-full w-full opacity-20">
      <!-- renderProjectImage -->
      <img placeholder="blur" :blurDataURL="blurImage" :src="image" :alt="name" layout="fill" :class="`${styles.ProjectImg} z-0`">
      <!-- renderTopBottomGradient -->
      <div class="absolute left-0 top-0 h-20 w-full" :style="`background: linear-gradient(180deg, ${stop1} 0%, rgba(0,0,0,0) 100%)`" />
      <div class="absolute bottom-0 left-0 h-32 w-full" :style="`background: linear-gradient(0deg, ${stop1} 10%, rgba(0,0,0,0) 100%)`" />
      <!-- renderProjectName -->
      <h1 class="z-10 pl-2 text-2xl sm:text-3xl" style="transform: translateZ(3rem)">
        {{ name }}
      </h1>
      <!-- 科技图标 -->
      <div :class="`${styles.techIcons} hidden absolute left-24 top-0 h-full w-1/2 items-center sm:flex`">
        <div class="flex flex-col pb-8">
          <div v-for="(item, index) in tech" :key="item" :class="`${index % 2 === 0 && 'ml-16'} mb-4`">
            <img :src="`/projects/tech/${item}.svg`" :alt="item" height="45" objectFit="contain" width="45">
          </div>
        </div>
      </div>
      <!-- 描述 -->
      <h2 class="z-10 text-lg font-medium tracking-wide" style="transform: translateZ(0.8rem)">
        {{ description }}
      </h2>
    </div>
    <!-- 描述 -->
  </a>
</template>
