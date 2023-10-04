<script setup></script>

<template>
  <footer class="h-60 w-full bg-slate-200 bg-opacity-50">
    <div class="m-auto 2xl:w-screen-2xl lg:w-screen-lg xl:w-screen-xl">
      <img m-a m-auto block w-28 py-3 src="src/assets/images/brand.png" alt="" />
      <div h-34 flex justify-around border-b-2 border-slate-300>
        <ul class="w-1/5 pl-5">
          <li>新手指南</li>
          <li>打印流程</li>
          <li>注册登录</li>
        </ul>
        <ul class="w-1/5 pl-5">
          <li>常见问题</li>
          <li>上传文件</li>
        </ul>
        <ul class="w-1/5 pl-5">
          <li>资源支持</li>
          <li>3D打印设计指导</li>
          <li>材料指南</li>
          <li>工具下载</li>
        </ul>
        <ul class="w-1/5 pl-5">
          <li>服务支持</li>
          <li>友情练剑</li>
        </ul>
        <ul class="w-1/5 pl-5">
          <li>联系方式</li>
          <li>15900733604</li>
        </ul>
      </div>
      <div flex justify-between>
        <div class=""
          >2023 <span class="text-blue-400">{{ $t('brand') }}</span></div
        >
        <div class="w-60 flex justify-between">
          <span>{{ $t('brand') }}</span>
          <span>关于我们</span>
          <span>用户协议</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  ul {
    li {
      @apply p-0.5 cursor-pointer text-blue-400;
      &:first-child {
        @apply text-xl font-medium text-dark-400;
      }
    }
  }
}
</style>
