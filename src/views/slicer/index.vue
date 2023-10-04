<script lang="ts" setup>
import slicePlateForm from './plateform/index.vue';

const fileRef = ref(null);

const { proxy } = getCurrentInstance();

function upload_() {
  //弹出选择本地文件
  proxy.$refs.fileRef.dispatchEvent(new MouseEvent('click'));
}
function fileChange(e) {
  console.log(e);
  //获取流文件
  console.log(e.target.files);
  //获取文件名
  console.log(e.target.files[0].name);
}
</script>

<template>
  <button class="bg-gray-300 p-2" @click="upload_">替换文件</button>
  <input v-show="true" ref="fileRef" type="file" @change="fileChange($event)" />上传文件
  <slicePlateForm />
</template>

<style lang="scss"></style>
