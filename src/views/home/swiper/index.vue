<script setup lang="ts" name="Swiper">
import { onMounted, reactive, ref } from 'vue';

const config = reactive({
  column: true,
  changeStyle: 2,
  changeTime: 0.5,
  waitTime: 2.5,
  spot: true,
  spotStyle: 1,
  arrow: false,
});

const nowInd = ref(0);
const nowFlag = ref(true);
let myInt = null;

const list = reactive([
  {
    name: '光固化3d打印',
    url: '/@/assets/images/background.jpg',
  },
  {
    name: '熔融沉积(fdm)3d打印',
    url: '/@/assets/images/background.jpg',
  },
  {
    name: '光固化3d打印',
    url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fphoto.tuchong.com%2F1658968%2Ff%2F149475915.jpg&refer=http%3A%2F%2Fphoto.tuchong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663147301&t=1be195b9d22a1307a66fb8e19697fb54',
  },
]);

const autoInt = () => {
  myInt;
  clearInterval(myInt);
  myInt = setInterval(
    () => {
      nowInd.value++;
      if (nowInd.value > list.length - 1) {
        nowFlag.value = false;
        nowInd.value = 0;
        setTimeout(() => {
          nowFlag.value = true;
          nowInd.value++;
        }, 10);
      }
    },
    config.waitTime * 1000 < 1000 ? 1000 : config.waitTime * 1000,
  );
};

const spotActive = (ind) => {
  if (ind === '+') {
    nowInd.value < list.length - 2 ? nowInd.value++ : (nowInd.value = 0);
  } else if (ind === '-') {
    nowInd.value > 0 ? nowInd.value-- : (nowInd.value = list.length - 2);
  } else {
    nowInd.value = ind;
  }
  autoInt();
};

onMounted(() => {
  list.length > 0 ? list.push(list[0]) : '';
  autoInt();
});
</script>

<template>
  <div class="swiper-box m-auto 2xl:w-screen-2xl lg:w-screen-lg xl:w-screen-xl">
    <!-- 轮播区域 -->
    <div :class="[config.column ? 'column-row' : '']" class="swiper">
      <div
        v-for="(item, index) in list"
        :key="index"
        :class="[nowInd === index ? 'focus' : '']"
        class="swiper-item"
        :style="{
          backgroundImage: `url(${item.url})`,
          transition: `all ${nowFlag ? (config.changeTime < config.waitTime ? `${config.changeTime}s` : '0.5s') : '0s'}`,
          transform: config.column ? `translateX(-${100 * nowInd}%)` : `translateY(-${100 * nowInd}%)`,
        }"
      >
        <p class="name">{{ item.name }}</p>
      </div>
    </div>
    <!-- 指示点 -->
    <div v-if="config.spot" class="spot-flex">
      <div
        v-for="ind in list.length - 1"
        :key="ind"
        :class="[nowInd === ind ? 'focus' : '', config.spotStyle ? `spot${config.spotStyle}` : 'spot1']"
        class="spot"
        @click="spotActive(ind)"
      />
    </div>
    <!-- 左右切换 -->
    <img
      v-if="config.arrow"
      src="https://img-blog.csdnimg.cn/ae2239969edd48cc803da677dd791865.png"
      alt=""
      class="icon left"
      @click="spotActive('-')"
    />
    <img
      v-if="config.arrow"
      src="https://img-blog.csdnimg.cn/46d9862a4c3e42819a79ebd2b84d0d73.png"
      alt=""
      class="icon right"
      @click="spotActive('+')"
    />
  </div>
</template>

<style lang="scss" scoped>
.swiper-box {
  white-space: nowrap;

  .swiper {
    @apply overflow-hidden;

    .swiper-item {
      @apply w-full <md: h-70 md:h-80 lg:h-90 xl:h-100 2xl:h-110 block relative;
      display: inline-block;
      background: no-repeat center;
      background-size: cover;
      overflow: hidden;

      .name {
        @apply absolute bg-gray-400 bg-opacity-50 rounded-xl text-white p-2 bottom-3;
        font-family: 'Times New Roman', Times, serif;
        transform: translateX(-100%);
      }
    }

    .focus {
      .title,
      .info,
      .name {
        transform: translateX(20px);
      }

      .name {
        transition: all 0.2s 0.2s;
      }
    }
  }

  .icon {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
  }

  .spot-flex {
    @apply m-auto flex items-center justify-center;

    .spot1 {
      width: 30px;
      height: 8px;
      margin: 0 10px;
      border-radius: 4px;
      background-color: pink;
      transition: all 0.3s;
      cursor: pointer;
    }

    .spot2 {
      width: 6px;
      height: 6px;
      margin: 0 10px;
      border: 2px solid #acd6f3;
      transform: rotate(45deg);
      transition: all 0.6s;
      cursor: pointer;
    }

    .spot3 {
      width: 6px;
      height: 6px;
      margin: 0 10px;
      border-radius: 3px;
      box-shadow: 0px 0px 6px 3px #acd6f3;
      transition: all 0.6s;
      cursor: pointer;
    }

    .focus {
      background-color: skyblue;
    }
  }
}
</style>
