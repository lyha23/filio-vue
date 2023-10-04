<script lang="ts" setup name="LoginPage">
import router from '/@/router';
import { reactive, ref } from 'vue';
import { useUserStore } from '/@/store/modules/user';
import useAxiosApi from '/@/utils/useAxiosApi';

const userStore = useUserStore();
const formData = reactive({
  name: 'sdasd',
  pwd: 'asdasd',
});
const ruleForm = ref<any>(null);
async function submit() {
  const userInfo = await useAxiosApi(`/user/login`, {
    method: 'POST',
    data: { username: formData.name, password: formData.pwd },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  if (userInfo?.data.code === 200) {
    userStore.setToken(`bearer ${userInfo.data.access_token}`);
    userStore.refreshMyInfo();
    router.push({ path: '/home' });
  }
}
</script>

<template>
  <div class="h-full flex items-center justify-between">
    <img class="w-1/2" src="src/assets/images/zhonglou.jpg" alt="" />
    <div class="m-0 w-1/2">
      <h1 class="text-xl">登录</h1>
      <form ref="ruleForm" class="flex flex-col" autocomplete="on">
        <input v-model="formData.name" placeholder="请输入用户名" type="text" />
        <input v-model="formData.pwd" placeholder="请输入密码" type="password" />
        <input type="button" value="登录" @click="submit" />
        <router-link to="/resign">注册</router-link>
      </form>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
