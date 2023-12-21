<script lang="ts">
import styles from './Button.module.scss';

declare interface MyProps {
  type: ButtonTypes;
  onClick?: () => void;
  name: string;
  href: string;
  classes?: string;
  otherProps?: Record<string, string>;
}
enum ButtonTypes {
  PRIMARY = 'primary',
  OUTLINE = 'outline',
  WHITE = 'white',
}

export { ButtonTypes };
</script>

<script lang="ts" setup name="Button ">
defineProps<MyProps>();
const buttonClasses = 'py-2 px-7 font-medium rounded text-base md:text-xl tracking-wide link duration-300 flex items-center';

function getButtonTypeStyles(type: ButtonTypes) {
  return type === ButtonTypes.PRIMARY ? styles.primary : type === ButtonTypes.WHITE ? styles.white : styles.outline;
}
</script>

<template>
  <a :href="href" v-bind="otherProps" :class="`${getButtonTypeStyles(type)} ${buttonClasses} ${classes}`" @click="onClick">
    {{ name }}
  </a>
</template>
