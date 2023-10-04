<script lang="ts" setup name="renderSkillColumn">
declare interface MyProp {
  skills: string[];
  willChange: Boolean;
  title: string;
}
defineProps<MyProp>();
</script>

<template>
  <h3 class="section-title-sm seq mb-4">{{ title }}</h3>
  <div :class="`${willChange && 'will-change-opacity'} seq flex flex-wrap`">
    <img v-for="(skill, idx) in skills" :key="idx" :src="`/skills/${skill}.svg`" :alt="skill" width="76" height="76" class="skill" />
  </div>
</template>
