<script lang="ts" setup name="Header">
import Menu from '~/components/common/menu.vue'

const menuVisible = ref(false)

function setmenuVisible(val: boolean) {
  menuVisible.value = val
}
</script>

<template>
  <header class="fixed top-0 z-50 w-full select-none from-gray-900 to-transparent bg-gradient-to-b py-8">
    <div class="section-container flex justify-between">
      <a href="#home" class="link">
        <img src="/logo.svg" alt="Logo - Ayush Singh" width="22" height="22">
      </a>
      <nav :class="`outer-menu ${menuVisible && 'menu-visible'}`">
        <button class="link hamburger relative h-6 w-6 flex items-center justify-center" @click="setmenuVisible(!menuVisible)">
          <div class="relative w-full flex flex-none items-center justify-center bg-white duration-300" />
        </button>
        <Menu :setmenu-visible="setmenuVisible" />
      </nav>
    </div>
  </header>
</template>
