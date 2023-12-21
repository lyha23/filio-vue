<script lang="ts" setup name="Menu">
import { MENULINKS } from '~/store/constants'

declare interface Myprops {
  setmenuVisible: Function
}

defineProps<Myprops>()
</script>

<template>
  <section
    class="menu pointer-events-none invisible fixed left-0 top-0 h-full w-full flex items-center justify-center overflow-hidden"
    style="visibility: 'hidden'"
  >
    <div class="flex flex-none items-center justify-center overflow-hidden">
      <div class="max-h-screen flex flex-none items-center justify-center overflow-y-auto text-center opacity-0">
        <ul class="m-0 block max-h-screen list-none px-0 py-4" role="menu">
          <li v-for="el in MENULINKS" :key="el.name" class="m-6 block p-0 text-2xl" role="menuitem">
            <a
              class="link relative inline text-5xl font-bold duration-300 hover:no-underline"
              :href="`#${el.ref}`"
              @click="setmenuVisible(false)"
            >
              {{ el.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
