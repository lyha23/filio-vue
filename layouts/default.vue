<script lang="ts" setup name="BasicLayoutPage">
import 'virtual:uno.css'
</script>

<template>
  <slot />
</template>

<style lang="scss">
@import '~/assets/styles/globals.scss';
@import '/font/iconfont.css';
#__nuxt {
  width: 100%;
  font-family: 'Google Sans', Avenir, ui-sans-serif, 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto',
    '"Helvetica Neue"', 'Arial', '"Noto Sans"', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji',
    Helvetica, Arial, sans-serif;
}
</style>
