<template>
  <div class="w-full relative h-full m-0 border-0 p-0"
       ref="container">
    <slot name="progress-bar"
          :progress="progress"
          v-if="progress.isComplete === false">
      <div class="absolute z-2 h-2 w-full bg-[rgba(0, 0, 0, 0.04)]"
           style="">
        <div :style="{
          width: `${loadProgressPercentage}%`,
          height: '100%',
          backgroundColor: '#1890ff',
          transition: 'width .2s',
        }" />
      </div>
    </slot>
    <div v-if="progress.isComplete === false"
         class="absolute z-1 w-full h-full">
      <slot name="poster" />
    </div>
    <canvas ref="canvas"
            class="w-full h-full "></canvas>
  </div>
</template>

<script lang="ts" setup>
import {
  Object3D,
  Vector2,
  Vector3,
  Color,
  Scene,
  Light,
  Raycaster,
  WebGLRenderer,
  PerspectiveCamera,
  AmbientLight,
  PointLight,
  HemisphereLight,
  DirectionalLight,
  LinearEncoding,
  WebGLRendererParameters,
  Loader,
  AxesHelper,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getSize, getCenter } from './utils';
import { defineComponent, PropType } from 'vue';
import { GridHelper } from 'three/src/helpers/GridHelper';
import { Fog } from 'three/src/scenes/Fog';


const DEFAULT_GL_OPTIONS = {
  antialias: true,
  alpha: true,
};


const props = reactive({
  src: {
    type: String,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  position: {
    type: Object,
    default: () => {
      return { x: 0, y: 0, z: 0 };
    },
  },
  rotation: {
    type: Object,
    default: () => {
      return { x: 0, y: 0, z: 0 };
    },
  },
  scale: {
    type: Object,
    default: () => {
      return { x: 1, y: 1, z: 1 };
    },
  },
  lights: {
    type: Array as PropType<{
      type: string;
      [key: string]: any;
    }[]>,
    default: () => {
      return [];
    },
  },
  cameraPosition: {
    type: Object,
    default: () => {
      return { x: 0, y: 0, z: 0 };
    },
  },
  cameraRotation: {
    type: Object,
    default: () => {
      return { x: 0, y: 0, z: 0 };
    },
  },
  cameraUp: {
    type: Object,
  },
  cameraLookAt: {
    type: Object,
  },
  backgroundColor: {
    default: 0xffffff,
  },
  backgroundAlpha: {
    type: Number,
    default: 1,
  },
  controlsOptions: {
    type: Object,
  },
  crossOrigin: {
    type: String,
    default: 'anonymous',
  },
  requestHeader: {
    type: Object,
    default: () => { },
  },
  outputEncoding: {
    type: Number,
    default: LinearEncoding,
  },
  glOptions: {
    type: Object,
  },
})

const container = ref()
const canvas = ref()

const result = {
  object: null as null | Object3D,
  raycaster: new Raycaster(),
  mouse: new Vector2(),
  camera: new PerspectiveCamera(60, 1, 0.01, 100000),
  scene: new Scene(),
  wrapper: new Object3D(),
  renderer: null as null | WebGLRenderer,
  controls: null as null | OrbitControls,
  allLights: [] as Light[],
  clock: typeof performance === 'undefined' ? Date : performance,
  reqId: null as null | number, // requestAnimationFrame id,
  loader: null as any as Loader,  // 会被具体实现的组件覆盖
}

// 确保这些对象不被转为 vue reactive 对象，避免 three 渲染出错
Object.assign(this, result);


const size = reactive({
  width: props.width,
  height: props.height,
})
const progress = reactive({
  isComplete: false,
  lengthComputable: false,
  loaded: 0,
} as {
  startedAt?: number;
  endedAt?: number;
  isComplete: boolean;
  lengthComputable: boolean
  loaded: number;
  total: number;
})

// 为了保留类型信息，仍然返回 result 的 type
// return reactiveState as (typeof result & typeof reactiveState);
// },

const loadProgressPercentage = computed(() => {
  if (progress.isComplete) return 100;
  if (progress.lengthComputable) {
    // lengthComputable 为 false 时，total 无直接参考意义，但是这里仍然使用它 * 3来作为估计值
    // 因为 gzip 压缩后的长度大约为三分之一
    return Math.min(0.92, progress.loaded / (progress.total * 3)) * 100;
  }
  return Math.min(1, progress.loaded / progress.total) * 100;
}

let { proxy } = getCurrentInstance()

var renderer, controls;

onMounted(() => {
  // 设置大小
  if (props.width === undefined || props.height === undefined) {
    size.width = (container.value as HTMLDivElement).offsetWidth,
      size.height = (container.value as HTMLDivElement).offsetHeight,
    };


  const options: WebGLRendererParameters = Object.assign(
    {},
    DEFAULT_GL_OPTIONS,
    this.glOptions,
    {
      canvas: canvas.value as HTMLCanvasElement,
    }
  );

  renderer = new WebGLRenderer(options);
  renderer.shadowMap.enabled = true;
  renderer.outputEncoding = this.outputEncoding;

  controls = new OrbitControls(this.camera, (container.value as HTMLDivElement));
  // this.controls.type = 'orbit';

  let axesHelper = new AxesHelper(100)
  scene.add(axesHelper);
  scene.add(this.wrapper);

  var helper = new GridHelper(250, 50);
  helper.position.set(0, -150, 0);
  scene.fog = new Fog(0xffffff, 0, 9000);
  scene.add(helper);

  axesHelper = new AxesHelper(250);
  axesHelper.position.set(-125, -150, -125);
  scene.add(axesHelper);
  var axisHelper2 = new AxesHelper(250);
  axisHelper2.position.set(125, -150, -125);
  axisHelper2.rotation.y = -70.6855;
  scene.add(axisHelper2);

  var axisHelper3 = new AxesHelper(250);
  axisHelper3.position.set(-125, -150, 125);
  axisHelper3.rotation.y = 70.6855;
  scene.add(axisHelper3);

  var axisHelper4 = new AxesHelper(250);
  axisHelper4.position.set(125, -150, 125);
  axisHelper4.rotation.y = 141.371;
  scene.add(axisHelper4);

  var axisHelper5 = new AxesHelper(250);
  axisHelper5.position.set(-125, 150, -125);
  axisHelper5.rotation.z = -70.6855;
  scene.add(axisHelper5);

  var axisHelper6 = new AxesHelper(250);
  axisHelper6.position.set(125, 150, -125);
  axisHelper6.rotation.y = -70.6855;
  axisHelper6.rotation.z = -70.6855;
  scene.add(axisHelper6);

  var axisHelper7 = new AxesHelper(250);
  axisHelper7.position.set(125, 150, 125);
  axisHelper7.rotation.y = -141.371;
  axisHelper7.rotation.z = -70.6855;
  scene.add(axisHelper7);

  var axisHelper8 = new AxesHelper(250);
  axisHelper8.position.set(-125, 150, 125);
  axisHelper8.rotation.y = 70.6855;
  axisHelper8.rotation.z = -70.6855;
  scene.add(axisHelper8);
  load();
  update();


  const element = container.value as HTMLDivElement;

  element.addEventListener('mousedown', onMouseDown, false);
  element.addEventListener('mousemove', onMouseMove, false);
  element.addEventListener('mouseup', onMouseUp, false);
  element.addEventListener('click', onClick, false);
  element.addEventListener('dblclick', onDblclick, false);

  window.addEventListener('resize', onResize, false);

  animate();
})



onBeforeUnmount(() {
  cancelAnimationFrame(this.reqId!);
  renderer!.dispose();
  if (controls) {
    this.controls.dispose();
  }

  const element = container.value as HTMLDivElement;
  element.removeEventListener('mousedown', this.onMouseDown, false);
  element.removeEventListener('mousemove', this.onMouseMove, false);
  element.removeEventListener('mouseup', this.onMouseUp, false);
  element.removeEventListener('click', this.onClick, false);
  element.removeEventListener('dblclick', this.onDblclick, false);
  window.removeEventListener('resize', this.onResize, false);
})

watch(props.src, (newVal, oldVal) => {
  load()
})

watch(rotation, (newVal, oldVal) => {
  if (!object) return;
  object.rotation.set(newVal.x, newVal.y, newVal.z);
}, { deep: true, immediate: true })

watch(position, (newVal, oldVal) => {
  if (!object) return;
  object.position.set(newVal.x, newVal.y, newVal.z);
})

watch: {
  : {
    deep: true,
      handler(val) {

    },
  },
  scale: {
    deep: true,
      handler(val) {
      if (!this.object) return;
      this.object.scale.set(val.x, val.y, val.z);
    },
  },
  lights: {
    deep: true,
      handler() {
      this.updateLights();
    },
  },
  size: {
    deep: true,
      handler() {
      this.updateCamera();
      this.updateRenderer();
    },
  },
  controlsOptions: {
    deep: true,
      handler() {
      this.updateControls();
    },
  },
  backgroundAlpha() {
    this.updateRenderer();
  },
  backgroundColor() {
    this.updateRenderer();
  },
},
methods: {
  onResize() {
    if (this.width === undefined || this.height === undefined) {
      this.$nextTick(() => {
        this.size = {
          width: (container.value as HTMLDivElement).offsetWidth,
          height: (container.value as HTMLDivElement).offsetHeight,
        };
      });
    }
  },
  onMouseDown(event: MouseEvent) {
    if (!this.$attrs.onMousedown) return;

    const intersected = this.pick(event.clientX, event.clientY);
    this.$emit('mousedown', event, intersected);
  },
  onMouseMove(event: MouseEvent) {
    // console.log(this.$attrs)
    if (!this.$attrs.onMousemove) return;

    const intersected = this.pick(event.clientX, event.clientY);
    this.$emit('mousemove', event, intersected);
  },
  onMouseUp(event: MouseEvent) {
    if (!this.$attrs.onMouseup) return;

    const intersected = this.pick(event.clientX, event.clientY);
    this.$emit('mouseup', event, intersected);
  },
  onClick(event: MouseEvent) {
    if (!this.$attrs.onClick) return;

    const intersected = this.pick(event.clientX, event.clientY);
    this.$emit('click', event, intersected);
  },
  onDblclick(event: MouseEvent) {
    if (!this.$attrs.onDblclick) return;

    const intersected = this.pick(event.clientX, event.clientY);
    this.$emit('dblclick', event, intersected);
  },
  pick(x: number, y: number) {
    if (!this.object) return null;
    if (!container.value) return;

    const rect = (container.value as HTMLDivElement).getBoundingClientRect();

    x -= rect.left;
    y -= rect.top;

    this.mouse.x = (x / this.size.width!) * 2 - 1;
    this.mouse.y = -(y / this.size.height!) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObject(this.object, true);

    return (intersects && intersects.length) > 0 ? intersects[0] : null;
  },
  update() {
    this.updateRenderer();
    this.updateCamera();
    this.updateLights();
    this.updateControls();
  },
  updateModel() {
    const { object } = this;

    if (!object) return;

    const { position } = this;
    const { rotation } = this;
    const { scale } = this;

    object.position.set(position.x, position.y, position.z);
    object.rotation.set(rotation.x, rotation.y, rotation.z);
    object.scale.set(scale.x, scale.y, scale.z);
  },
  updateRenderer() {
    const { renderer } = this;

    renderer!.setSize(this.size.width!, this.size.height!);
    renderer!.setPixelRatio(window.devicePixelRatio || 1);
    renderer!.setClearColor(new Color(this.backgroundColor).getHex());
    renderer!.setClearAlpha(this.backgroundAlpha);
  },
  updateCamera() {
    const { camera } = this;
    const { object } = this;

    camera.aspect = this.size.width! / this.size.height!;
    camera.updateProjectionMatrix();

    if (!this.cameraLookAt || !this.cameraUp) {
      if (!object) return;

      const distance = getSize(object).length();

      camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);
      camera.rotation.set(this.cameraRotation.x, this.cameraRotation.y, this.cameraRotation.z);

      if (this.cameraPosition.x === 0 && this.cameraPosition.y === 0 && this.cameraPosition.z === 0) {
        camera.position.z = distance;
      }

      camera.lookAt(new Vector3());
    } else {
      camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);
      camera.rotation.set(this.cameraRotation.x, this.cameraRotation.y, this.cameraRotation.z);
      camera.up.set(this.cameraUp.x, this.cameraUp.y, this.cameraUp.z);

      camera.lookAt(new Vector3(this.cameraLookAt.x, this.cameraLookAt.y, this.cameraLookAt.z));
    }
  },
  updateLights() {
    this.scene.remove(...this.allLights);

    this.allLights = [];

    this.lights.forEach((item) => {
      if (!item.type) return;

      const type = item.type.toLowerCase();

      let light: null | Light = null;

      if (type === 'ambient' || type === 'ambientlight') {
        const color = item.color === 0x000000 ? item.color : item.color || 0x404040;
        const intensity = item.intensity === 0 ? item.intensity : item.intensity || 1;

        light = new AmbientLight(color, intensity);
      } else if (type === 'point' || type === 'pointlight') {
        const color = item.color === 0x000000 ? item.color : item.color || 0xffffff;
        const intensity = item.intensity === 0 ? item.intensity : item.intensity || 1;
        const distance = item.distance || 0;
        const decay = item.decay === 0 ? item.decay : item.decay || 1;

        light = new PointLight(color, intensity, distance, decay);

        if (item.position) {
          light.position.copy(item.position);
        }
      } else if (type === 'directional' || type === 'directionallight') {
        const color = item.color === 0x000000 ? item.color : item.color || 0xffffff;
        const intensity = item.intensity === 0 ? item.intensity : item.intensity || 1;

        light = new DirectionalLight(color, intensity);

        if (item.position) {
          light.position.copy(item.position);
        }

        if (item.target) {
          (light as DirectionalLight).target.copy(item.target);
        }
      } else if (type === 'hemisphere' || type === 'hemispherelight') {
        const skyColor = item.skyColor === 0x000000 ? item.skyColor : item.skyColor || 0xffffff;
        const groundColor = item.groundColor === 0x000000 ? item.groundColor : item.groundColor || 0xffffff;
        const intensity = item.intensity === 0 ? item.intensity : item.intensity || 1;

        light = new HemisphereLight(skyColor, groundColor, intensity);

        if (item.position) {
          light.position.copy(item.position);
        }
      }

      if (light) {
        this.allLights.push(light);
        this.scene.add(light);
      }
    });
  },
  updateControls() {
    if (this.controlsOptions) {
      Object.assign(this.controls!, this.controlsOptions);
    }
  },
  reportProgress(type: 'start' | 'end' | 'progress', data ?: {
    lengthComputable: boolean;
    loaded: number;
    total: number;
  }) {
    if (type === 'start') {
      this.progress.isComplete = false;
      this.progress.startedAt = Date.now();
      this.progress.loaded = 0;
      this.progress.total = 0;
    } else if (type === 'end') {
      this.progress.isComplete = true;
      this.progress.endedAt = Date.now();
    } else {
      this.progress.lengthComputable = data?.lengthComputable ?? false;
      this.progress.loaded = data?.loaded ?? 0;
      this.progress.total = data?.total ?? 0;
    }
  },
  load() {
    if (!this.src) return;

    if (this.object) {
      this.wrapper.remove(this.object);
    }

    this.loader.setRequestHeader(this.requestHeader);

    this.reportProgress('start');

    (this.loader as any).load(this.src, (...args: any) => {
      this.reportProgress('end');

      const object = (this.getObject as any)(...args);

      this.process(object);

      this.addObject(object);

      this.$emit('load');
    }, (event: ProgressEvent) => {
      this.reportProgress('progress', event);
      this.$emit('progress', event);
    }, (event: ErrorEvent) => {
      this.reportProgress('end');
      this.$emit('error', event);
    });
  },
  process(object: Object3D) {
    return object;
  },
  getObject(object: Object3D) {
    return object;
  },
  addObject(object: Object3D) {
    this.object = object;
    console.debug(this.object);
    this.wrapper.add(object);

    this.updateCamera();
    this.updateModel();

    const center = getCenter(object);

    // correct position
    this.wrapper.position.copy(center.negate());
  },
  animate() {
    this.reqId = requestAnimationFrame(this.animate);
    this.render();
  },
  render() {
    this.renderer!.render(this.scene, this.camera);
  },
},
});

</script>