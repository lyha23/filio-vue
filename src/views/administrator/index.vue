<script lang="ts" name="administrator" setup>
import queue from '../components/administrator/queue.vue';
import status from '../components/administrator/status.vue';

const navBgColor = ref('#383434');
</script>

<template>
  <div class="administrator">
    <nav class="nav-wrapper" :style="{ backgroundColor: navBgColor }">
      <div class="path">
        <i class="el-icon-d-arrow-right" style="color: #fff; font-size: 20px"> 首页 <span style="color: #b3b2b2">/</span> 打印机管理 </i>
      </div>
      <div class="wall" />
      <div class="list-wrapper">
        <ul>
          <a href="javascript:;">
            <li>管理员 LittleA<i class="el-icon-arrow-down" style="color: #fff; margin: 0 10px" /></li>
          </a>
          <div class="login">
            <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3751910808,1160227988&fm=26&gp=0.jpg" alt="" />
          </div>
        </ul>
      </div>
    </nav>
    <div class="sidebar">
      <div class="row">
        <div class="logo">
          <img src="../components/nav/images/brand.png" alt />
        </div>
        <div class="span2">
          <ul class="nav nav-pills nav-stacked">
            <li class="active">
              <a href="#">打印机管理</a>
            </li>
            <!-- <li><a href="#">用户账号管理</a></li>
            <li><a href="#">订单管理</a></li>
            <li><a href="#">模型库</a></li>
            <li><a href="#">信息统计</a></li>
            <li><a href="#">管理员账号设置</a></li> -->
          </ul>
        </div>
      </div>
    </div>
    <div class="main">
      <status />
      <queue />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.administrator {
  background-color: #fafafa;
  padding-bottom: 30px;

  .sidebar {
    z-index: 999;

    .logo {
      background-color: #383434;
      flex-basis: 400px;
      text-align: center;
      padding: 10px 0;

      img {
        width: 80%;
      }
    }

    overflow: hidden;
    width: 250px;
    background-color: #fff;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    border-right: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .main {
    padding-top: 100px;
    padding-left: 220px;
  }

  .span2 {
    padding-left: 10px;
  }

  .active > a {
    background-color: #7e8ee3;
  }

  a {
    font-size: 18px;
    color: #000;
  }
}

.nav-wrapper {
  position: fixed;
  display: flex;
  align-items: center;
  height: 70px;
  width: 100%;
  min-width: 1135px;
  z-index: 998;
  background-color: #383434;

  .branch-wrapper {
    flex-basis: 400px;
    text-align: center;

    img {
      width: 250px;
      height: 50px;
    }
  }

  .path {
    float: left;
    margin-left: 260px;
  }

  .wall {
    flex-grow: 1;
  }

  .list-wrapper {
    .login {
      border-radius: 50%;
      height: 45px;
      width: 45px;
      background-color: #fff;
      float: right;
      margin-top: 15px;
      margin-right: 15px;
      overflow: hidden;

      > img {
        height: 45px;
        width: 100%;
      }
    }

    ul {
      padding: 0;
      height: 75px;

      li {
        display: inline-block;
        list-style: none;
        line-height: 75px;
        margin-right: 20px;
        font-size: 20px;
        color: white;
      }
    }
  }
}
</style>
