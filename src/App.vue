<script lang="ts" setup name="BasicLayoutPage"></script>

<template>
  <RouterView v-if="$route.meta.keepAlive" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.path" />
    </keep-alive>
  </RouterView>
  <RouterView v-if="!$route.meta.keepAlive" :key="$route.path" />
</template>

<style lang="scss">
@import './styles/globals.scss';

#app {
  width: 100%;
  font-family: 'Google Sans', Avenir, ui-sans-serif, 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto',
    '"Helvetica Neue"', 'Arial', '"Noto Sans"', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji',
    Helvetica, Arial, sans-serif;
}
</style>
