<script setup lang="ts">
import 'vant/es/popup/style/index';
// export default {
//   name: "BasicModal",
// };

const props = withDefaults(
  defineProps<{
    show: boolean;
    closeOnClickOverlay?: boolean;
    size?: 'normal' | 'large';
  }>(),
  {
    show: false,
    closeOnClickOverlay: false,
    size: 'large',
  },
);

defineEmits<{
  (event: 'confirm'): void;
  (event: 'update:show', data: boolean): void;
}>();
</script>

<template>
  <Popup
    :show="props.show"
    teleport="body"
    style="overflow-y: auto"
    :close-on-click-overlay="closeOnClickOverlay"
    @close="$emit('update:show', false)"
  >
    <div :class="['modal-content', size]">
      <div class="content">
        <slot>内容</slot>
      </div>
      <div class="btn">
        <div class="btn-confirm" @click="$emit('confirm')">
          {{ $t('btn.confirm') }}
        </div>
        <div class="btn-cancel" @click="$emit('update:show', false)">
          {{ $t('btn.cancel') }}
        </div>
      </div>
    </div>
  </Popup>
</template>

<style scoped lang="scss">
@import './index.scss';
</style>
