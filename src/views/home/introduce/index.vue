<script lang="ts" setup name="introduce"></script>

<template>
  <section class="explain-wrapper">
    <p>随时随地打印，拒绝等待</p>
    <div class="img">
      <img src="src/assets/images/city.png" alt srcset />
    </div>
    <div class="text">
      <p>打印机多点投放</p>
      <p>将覆盖多个城市的学校、创客空间</p>
      <p>享受最便捷的打印服务</p>
      <p>目前已打算在佛山、广州、深圳等城市进行试点铺开，未来将走进更多的城市进行推广。</p>
    </div>
  </section>
  <section class="desc-wrapper">
    <p>一个连接全世界的交流社区</p>
    <div class="desc">
      <p>Printers汇聚了全世界爱好3D打印的用户，在这里你可以与别人分享你的模型设计、技术开发或者心得体会，留下你学习的点点滴滴</p>
    </div>
    <ul class="explain-wrapper">
      <li>
        <p>100个</p>
        <span>国家</span>
      </li>
      <li>
        <p>500小时</p>
        <span>视频教程</span>
      </li>
      <li>
        <p>3000个</p>
        <span>模型</span>
      </li>
    </ul>
  </section>
</template>

<style lang="scss" scoped>
.explain-wrapper {
  width: 100%;
  text-align: center;

  p {
    height: 120px;
    line-height: 120px;
    text-align: center;
    font-size: 30px;
  }

  div {
    display: inline-block;
    width: 500px;
    height: 300px;

    &.img {
      width: 600px;

      img {
        width: 600px;
        height: 300px;
        vertical-align: bottom;
      }
    }

    &.text {
      vertical-align: top;
      box-sizing: border-box;
      padding: 60px 0 0 20px;

      p {
        width: 600px;
        height: 40px;
        text-align: left;
        line-height: 30px;
        font-size: 30px;

        &:last-child {
          width: 500px;
          font-size: 18px;
        }
      }
    }
  }
}

.desc-wrapper {
  width: 100%;
  min-width: 1135px;
  height: 500px;
  background: url('src/assets/images/content2.png') no-repeat center;
  background-size: contain;
  margin: 30px 0 50px 0;

  p {
    text-align: center;
    font-size: 30px;
  }

  .desc {
    width: 100%;
    margin-top: 50px;
    padding: 30px 0;
    background-color: #ffffffd7;

    p {
      width: 630px;
      margin: 0 auto;
    }
  }

  .explain-wrapper {
    padding: 0;
    margin-top: 60px;
    text-align: center;

    li {
      list-style: none;
      display: inline-block;
      width: 250px;
      height: 250px;
      text-align: center;

      p {
        font-size: 40px;
      }

      span {
        font-size: 25px;
      }
    }
  }
}
</style>
