# filio-vue

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[Live Demo](https://www.ayushsingh.co.in)

The origin program is [here](https://github.com/ayush013/folio.git), which is powered by React. And I have got to praise the project's owner for his great work. What he had done presents a wonderful UI/UX. 

The simple blog-front project contains slideshow, text gradient, dynamic SVG, timeline, and so on.

All of there are almost the best practices.
>初始的项目在这里, 是用React驱动的. 不得不说, 这个印度🇮🇳老哥真🐂🍺, 视觉效果简直惊为天人. 这个前端项目包含幻灯片播放, 文字渐变, 动态SVG, 时间轴. 并且基本上都是最佳实践.

So I recode this program by Vue.js in order to use it in my other's program in the future.
> 所以, 我用Vue.js重写了它, 以便于在更多的项目中使用它的轮子.

This one is based on vue3 + vite + unocss + sass + viewport adapt + axios

> 基于 vue3 + vite + unocss + sass + viewport 适配方案 + axios 封装.

if it helps you, you can star me.
> 如果对你有帮助送我一颗珍贵的小星星（づ￣ 3 ￣）づ ╭❤ 

## How to run on local?  如何运行?

First, run the development server: 
>首先安装该安装的package
```bash
npm install
# or
yarn
```
Second, run the development server: 
>第二步, 运行

```bash
npm run dev
# or
yarn dev
```

## How to reconstruct?  如何重构?
|React | Vue|
|:-:|-|
|useRef | ref|
|useEffect | onMounted/onUnmounted|
| {} | v-bind|
| jsx parameter| defineProps |
|MutableRefObject|Ref<HeepElement>|
