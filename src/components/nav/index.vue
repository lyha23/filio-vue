<script lang="ts" setup>
import { useUserStore } from '/@/store/modules/user';
import { setLang } from '/@/i18n';

const router = useRoute();
const userStore = useUserStore();

const changeLang = (type) => {
  setLang(type);
};
</script>

<template>
  <nav class="flex items-center justify-center bg-white shadow">
    <div class="h-18 flex items-center justify-between justify-self-center px-6 2xl:w-screen-2xl lg:w-screen-lg xl:w-screen-xl">
      <router-link to="/home">
        <img class="w-30" src="src/assets/images/brand.png" />
      </router-link>
      <div class="list-wrapper">
        <ul class="flex items-center justify-between">
          <div class="btn-wrap">
            <button @click="changeLang('zh-cn')"> {{ $t('language.zh') }} </button>
            <button @click="changeLang('en-us')"> {{ $t('language.en') }} </button>
          </div>
          <router-link to="/home">
            <li :class="router.name === `home` ? `text-sky-500 bg-sky-50` : ``" class="h-18 w-25 text-center align-middle leading-18"
              >首页</li
            >
          </router-link>
          <router-link to="/onlinePrint">
            <li :class="router.name === 'onlinePrint' ? `text-sky-500 bg-sky-50` : ``" class="h-18 w-25 text-center align-middle leading-18"
              >在线打印</li
            >
          </router-link>
          <router-link to="/userMsg/orderPreview">
            <li :class="router.name === `home` ? `text-sky-500 bg-sky-50` : ``" class="h-18 w-25 text-center align-middle leading-18"
              >我的订单</li
            >
          </router-link>
          <router-link to="/about">
            <li :class="router.name === `about` ? `text-sky-500 bg-sky-50` : ``" class="h-18 w-25 text-center align-middle leading-18"
              >关于我们</li
            >
          </router-link>
          <router-link v-show="!userStore.isLogin" to="/login">
            <li :class="router.name === `login` ? `text-sky-500 bg-sky-50` : ``" class="h-18 w-25 text-center align-middle leading-18"
              >登录</li
            >
          </router-link>
          <router-link v-show="userStore.isLogin" to="/user/center">
            <li :class="router.name === `login` ? `text-sky-500 bg-sky-50` : ``" class="h-18 w-25 text-center align-middle leading-18">{{
              userStore.info.username
            }}</li>
          </router-link>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
