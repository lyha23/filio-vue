<script lang="ts" setup name="BasicLayoutPage">
import { useRouter } from 'vue-router';

const tabItem = [
  { key: 'home', icon: 'Home' },
  { key: 'about', icon: 'Horizontal' },
  { key: 'administrator', icon: 'My' },
  { key: 'onlinePrint', icon: 'Location' },
];

const router = useRouter();
const activeTab = ref(0);
const tabbarVisible = ref(true);
const showBorder = ref(false);

watch(
  () => router,
  () => {
    const judgeRoute = tabItem.some((item) => item.key === router.currentRoute.value.path.replace('/', ''));
    activeTab.value = tabItem.findIndex((item) => item.key === router.currentRoute.value.path.replace('/', ''));
    tabbarVisible.value = judgeRoute;
    showBorder.value = judgeRoute;
  },
  { deep: true, immediate: true },
);

const goBack = () => {
  router.go(-1);
};
</script>

<template>
  <!-- <div class="main-page -z-20"> -->
  <!-- <navinfo class="fixed z-10 w-full bg-white"/> -->
  <!-- <body class="page w-full "> -->
  <RouterView v-if="$route.meta.keepAlive" v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.path" />
    </keep-alive>
  </RouterView>
  <RouterView v-if="!$route.meta.keepAlive" :key="$route.path" />
  <!-- </body> -->
  <!-- <footinfo /> -->
  <!-- </div> -->
</template>

<style lang="scss">
// .page {
//   min-height: calc(100vh - 240px);
// }

// .main-page {
// height: calc(100vh - 100px);
// background-image: url(/@/assets/images/bg.png);
// }
@import './styles/globals.scss';

#app {
  width: 100%;
  font-family: 'Google Sans', Avenir, ui-sans-serif, 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto',
    '"Helvetica Neue"', 'Arial', '"Noto Sans"', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji',
    Helvetica, Arial, sans-serif;
}
</style>
