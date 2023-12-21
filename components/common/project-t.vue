<script setup lang="ts">
import { onMounted } from 'vue';
import VanillaTilt from 'vanilla-tilt';

onMounted(() => {
  VanillaTilt.init(document.querySelector('.box-item'), {
    max: 50,
    speed: 400,
  });

  //It also supports NodeList
  VanillaTilt.init(document.querySelectorAll('.box-item'));
});
</script>

<template>
  <div>
    <div class="box">
      <div class="box-item">
        <img src="/public/logo.svg" />
        <h4>测试</h4>
        <p>111</p>
      </div>
      <div class="box-item">
        <img src="/public/logo.svg" />
        <h4>测试</h4>
        <p>111</p>
      </div>
      <div class="box-item">
        <img src="/public/logo.svg" />
        <h4>测试</h4>
        <p>111</p>
      </div>
      <div class="box-item">
        <img src="/public/logo.svg" />
        <h4>测试</h4>
        <p>111</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
  width: 180%;
  height: 400px;
  display: flex;
  margin: 100px auto;
}
.box-item {
  width: 20%;
  height: 100%;
  margin-right: 20px;
  background-color: #171b22;
  border: 1px solid #31363d;
  border-radius: 10px;
  text-align: center;
  transform-style: preserve-3d;
  transform: perspective(1000px);
}
.box-item img {
  width: 80%;
  margin-top: -40px;
  transform: translateZ(30px);
}
.box-item h4 {
  color: #e6ecf2;
  margin-top: 20px;
  transform: translateZ(30px);
}
.box-item p {
  margin: 35px;
  font-size: 12px;
  color: #7f859c;
  text-align: left;
  transform: translateZ(30px);
}
</style>
