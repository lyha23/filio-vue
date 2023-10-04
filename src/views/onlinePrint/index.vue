<script setup lang="ts">
import { ModelStl } from './vue-3d-model/src';

const modelRef = ref({
  info: {
    volume: Number(),
    area: Number(),
  },
});

declare interface MyState {
  printType: String;
  Consumables: String;
  moduleNumber: Number;
  files: Array<File>;
  filesNum: Array<number>;
  fileUrl: string[];
  selectedFileId: Number;
}

const state = reactive<MyState>({
  printType: 'fdm',
  Consumables: 'pla',
  moduleNumber: 1,
  files: new Array<File>(),
  filesNum: new Array<number>(),
  fileUrl: [],
  selectedFileId: 0,
});

function uploadFiles(event) {
  if ('type' in event && event.type === 'change') {
    // 模型文件
    state.files = [...state.files, ...Array.from(event.target.files)];
    const newFileNum = Array.from({ length: event.target.files.length }, (e, a) => {
      return 1;
    });
    // 模型数量
    state.filesNum = [...state.filesNum, ...newFileNum];
    // 模型Url
    const newFileUrl = Array.from(event.target.files).map((val, idx) => {
      return window.URL.createObjectURL(val);
    });
    state.fileUrl = [...state.fileUrl, ...newFileUrl];
  }
  if (state.filesNum.length === Array.from(event.target.files).length) {
    modelRef.value.onResize();
  }
}

function delFile(idx, event) {
  if ('type' in event && event.type === 'click') {
    const confirMsg = confirm('确认删除吗?');
    if (confirMsg === true) {
      state.files.splice(idx, 1);
      state.filesNum.splice(idx, 1);
      state.fileUrl.splice(idx, 1);
    }
  }
}

const status = reactive({
  step: 'upload',
});

function changeNumber(idx, event) {
  if (event === 'up') {
    state.filesNum[idx] += 1;
  } else if (event === 'down') {
    state.filesNum[idx] -= 1;
  } else if ('target' in event && event.type === 'change') {
    state.filesNum[idx] = event.target.value;
  }
  if (state.filesNum[idx] <= 1) {
    state.filesNum[idx] = 1;
  }
}

watch(
  () => state.selectedFileId,
  (oldVal, newVal) => {},
  { deep: true, immediate: true },
);

const selectli = (name) => {
  switch (name) {
    case 'upload':
      status.step = 'upload';
      break;
    case 'pay':
      status.step = 'pay';
      break;
    case 'order':
      status.step = 'order';
      break;
  }
};
</script>

<template>
  <main class="mt-3 block">
    <nav class="m-auto mb-3 w-screen-lg">
      <ul w-screen-lg>
        <li class="active"> <span text="sm">Step 1</span> 上传、估价 </li>
        <li><span text="sm">Step 2</span> 付款</li>
        <li><span text="sm">Step 3</span> 等待打印完成</li>
        <li>完成</li>
      </ul>
    </nav>
    <section ref="dropRef" class="mb-10 flex justify-center">
      <fieldset v-show="state.files.length === 0" class="h-120 w-screen-md border-none">
        <input id="file_upload" class="hidden" type="file" name="file_upload" accept=".stl,.3mf" multiple @change="uploadFiles" />
        <label
          for="file_upload"
          w="full"
          h="full"
          bg="sky-50"
          border="~ 2 slate-400 dashed"
          flex="~ col"
          text="slate-400 "
          class="cursor-pointer items-center justify-center rounded-md hover:border-blue-600 hover:text-blue-600"
        >
          <span class="iconfont icon-upload text-5xl" />
          <span class="text-base text-black">拖拽模型到此或点击上传</span>
          <p class="rounded-e-md bg-sky-400 p-1 text-white">上传模型</p>
        </label>
      </fieldset>
      <div v-show="state.files.length > 0" class="h-120 w-screen-md shadow-sm">
        <model-stl ref="modelRef" :src="state.fileUrl[state.selectedFileId]" :file-name="state.files[state.selectedFileId]?.name" />
      </div>
      <div class="">
        <section class="w-80 bg-white py-2 text-base">
          <div class="flex items-center justify-center">
            <label class="w-20 w-70 cursor-pointer rounded-md bg-sky-400 p-1 text-center text-light-50 hover:bg-sky-500" for="file_upload">
              <span class="iconfont icon-upload" />上传模型</label
            >
            <input id="file_upload" class="hidden" type="file" name="file_upload" accept=".stl,.3mf" multiple @change="uploadFiles" />
          </div>
          <div class="mb-2 flex-none">
            <fieldset>
              <div class="my-2 border-y border-r text-center text-base">
                <p v-if="state.files.length === 0" class="py-2">还没有文件</p>
                <div v-else class="text-left">
                  <div
                    v-for="(item, idx) in state.files"
                    :key="idx"
                    class="flex items-center justify-between"
                    :class="[state.selectedFileId === idx ? 'bg-sky-50' : '']"
                  >
                    <p
                      class="w-36 cursor-pointer truncate border-b py-2 pl-3 transition-all duration-300 hover:bg-light-500 hover:pl-0 hover:font-medium"
                      @click="state.selectedFileId = idx"
                    >
                      {{ item.name }}</p
                    >
                    <fieldset class="block w-30 flex items-center justify-between">
                      <div class="btn-group" role="group" aria-label="...">
                        <button class="btn" @click="changeNumber(idx, 'down')">-</button>
                        <input v-model="state.filesNum[idx]" type="number" @change="changeNumber(idx, $event)" />
                        <button class="btn" @click="changeNumber(idx, 'up')">+</button>
                      </div>
                      <button type="button" class="text-gray-600 hover:text-sky-600" @click="delFile(idx, $event)">
                        <span class="iconfont icon-shanchu text-xl" />
                      </button>
                    </fieldset>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="inputItem">
            <p class="w-1/2 self-end pl-4 text-base text-slate-600"> 打印类型: </p>
            <fieldset>
              <div class="choiceItem">
                <input id="fdm" v-model="state.printType" class="hidden" type="radio" value="fdm" name="printType" checked />
                <label class="choice" :class="state.printType === 'fdm' ? 'selected' : ''" for="fdm">FDM</label>
              </div>
              <div class="choiceItem">
                <input id="sla" v-model="state.printType" class="hidden" type="radio" value="sla" name="printType" />
                <label class="choice" :class="state.printType === 'sla' ? 'selected' : ''" for="sla">光固化</label>
              </div>
            </fieldset>
          </div>
          <div class="inputItem">
            <p class="w-1/2 self-end pl-4 text-base text-slate-600">耗材:</p>
            <fieldset class="w-full flex items-center">
              <div class="choiceItem">
                <input id="pla" v-model="state.Consumables" class="hidden" type="radio" value="pla" name="Consumables" />
                <label class="choice" :class="state.Consumables === 'pla' ? 'selected' : ''" for="pla">PLA</label>
              </div>
              <div class="choiceItem">
                <input id="abs" v-model="state.Consumables" class="hidden" type="radio" value="abs" name="Consumables" />
                <label class="choice" :class="state.Consumables === 'abs' ? 'selected' : ''" for="abs">ABS</label>
              </div>
            </fieldset>
          </div>
        </section>
        <section class="mt-3 w-80 bg-white p-4">
          <div> 合计 </div>
          <div v-for="(item, idx) in state.files" :key="idx" class="flex items-end justify-between pt-2">
            <p>{{ item.name }}</p>
            <p class="text-end">&times;{{ state.filesNum[idx] }}</p>
          </div>
          <div class="outItem w-full flex justify-between">
            <p class="w-1/2 self-end text-base text-slate-600">总价:</p>
            <span class="text-3xl text-red-500">0 <span class="text-xl">元</span> </span>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.selected {
  @apply bg-sky-50 text-sky-500;
}

fieldset {
  @apply border-none;
}

.inputItem {
  @apply flex mb-2;

  fieldset {
    @apply w-full items-center flex;

    .choiceItem {
      @apply mr-2;
    }

    .choice {
      @apply cursor-pointer p-1 hover: text-sky-500;
    }
  }
}

.btn-group {
  @apply flex items-center block;

  .btn {
    margin-left: -1px;
    @apply border text-light-50 w-6 leading-6 bg-blue-400 text-center align-middle hover: bg-blue-600;
  }

  input {
    @apply align-middle m-auto w-10 h-8 border-transparent;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  .btn:first-child {
    @apply rounded-l-lg ml-0;
  }

  .btn:last-child {
    @apply rounded-r-lg ml-0;
  }
}

nav li {
  @apply leading-10 bg-sky-100 inline-block text-sky-600 relative w-1/4 transition-all duration-300 hover:pl-12 cursor-pointer hover:font-medium;
}

nav li.active::after {
  @apply block absolute border-l-sky-100;
  content: '';
  display: block;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
  border-left: 20px solid;
  position: absolute;
  right: -20px;
  top: 0;
  z-index: 10;
}

nav li.active::before {
  content: '';
  display: block;
  border-top: 20px solid #dceefe;
  border-bottom: 20px solid #dceefe;
  border-left: 20px solid #fff;
  position: absolute;
  left: 0px;
  top: 0;
}

nav li:first-child {
  @apply rounded-l-xl;

  &::before {
    @apply hidden;
  }
}

nav li:last-child {
  @apply rounded-r-xl;

  &::after {
    @apply hidden;
  }
}

nav li.active {
  background: #1e9fff;
  color: #fff;
}

nav li.active:after {
  border-left-color: #1e9fff;
}
</style>
