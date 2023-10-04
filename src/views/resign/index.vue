<script lang="ts" setup name="Resign">
import { reactive, ref } from 'vue';
import { useUserStore } from '/@/store/modules/user';
import useAxiosApi from '/@/utils/useAxiosApi';

const status = reactive({
  hasuser: false,
});

const userStore = useUserStore();
const formData = reactive({
  name: 'sdasd',
  pwd: 'asdasd',
});
const ruleForm = ref<any>(null);

async function checkUserName() {
  const userInfo = await useAxiosApi(`/user/checkname`, {
    method: 'POST',
    data: { username: formData.name },
    headers: { 'Content-Type': 'application/json' },
  });
  // console.log('[ userInfo ] >', userInfo)
  status.hasuser = userInfo?.data.code === 200;
}

async function resign() {
  const userInfo = await useAxiosApi(`/user/resign`, {
    method: 'POST',
    data: { username: formData.name, password: formData.pwd },
    headers: { 'Content-Type': 'application/json' },
  });
  if (userInfo?.data.code === 400) {
    console.debug('已经注册了');
  }
  // if (userInfo) {
  //     router.push({ path: '/home' });
  // }
}
</script>

<template>
  <div class="h-full flex items-center justify-between">
    <img class="w-1/2" src="src/assets/images/zhonglou.jpg" alt="" />
    <div class="m-0 w-1/2">
      <h1 class="text-xl">注册</h1>
      <form ref="ruleForm" class="flex flex-col" autocomplete="on">
        <input v-model="formData.name" placeholder="请输入用户名" type="text" @change="checkUserName" />
        <span v-show="formData.name.length > 3" class="">{{ status.hasuser ? `有` : `无` }}</span>
        <input v-model="formData.pwd" placeholder="请输入密码" type="password" />
        <input type="button" value="注册" @click="resign" />
        <router-link to="/login">返回登录</router-link>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
