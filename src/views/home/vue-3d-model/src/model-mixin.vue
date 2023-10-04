<script lang="ts">
import {
  AmbientLight,
  AxesHelper,
  Color,
  DirectionalLight,
  HemisphereLight,
  type Light,
  LinearEncoding,
  type Loader,
  Object3D,
  PerspectiveCamera,
  PointLight,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
  type WebGLRendererParameters,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { type PropType, defineComponent } from 'vue';
import { GridHelper } from 'three/src/helpers/GridHelper';
import { Fog } from 'three/src/scenes/Fog';
import { getCenter, getSize } from './utils';
import { getArea, getVolume } from './get_model_info';

const DEFAULT_GL_OPTIONS = {
  antialias: true,
  alpha: true,
};

export default defineComponent({
  props: {
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
      type: Array as PropType<
        {
          type: string;
          [key: string]: any;
        }[]
      >,
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
      default: () => {},
    },
    outputEncoding: {
      type: Number,
      default: LinearEncoding,
    },
    glOptions: {
      type: Object,
    },
    fileName: {
      type: String,
      default: '',
    },
  },
  data() {
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
      loader: null as any as Loader, // 会被具体实现的组件覆盖
      info: {
        volume: Number(),
        area: Number(),
        size: {
          x: Number(),
          y: Number(),
          z: Number(),
        },
      },
    };

    // 确保这些对象不被转为 vue reactive 对象，避免 three 渲染出错
    Object.assign(this, result);

    const reactiveState = {
      size: {
        width: this.width,
        height: this.height,
      },
      progress: {
        isComplete: false,
        lengthComputable: false,
        loaded: 0,
      } as {
        startedAt?: number;
        endedAt?: number;
        isComplete: boolean;
        lengthComputable: boolean;
        loaded: number;
        total: number;
      },
    };

    // 为了保留类型信息，仍然返回 result 的 type
    return reactiveState as typeof result & typeof reactiveState;
  },
  computed: {
    loadProgressPercentage() {
      if (this.progress.isComplete) return 100;
      if (this.progress.lengthComputable) {
        // lengthComputable 为 false 时，total 无直接参考意义，但是这里仍然使用它 * 3来作为估计值
        // 因为 gzip 压缩后的长度大约为三分之一
        return Math.min(0.92, this.progress.loaded / (this.progress.total * 3)) * 100;
      }

      return Math.min(1, this.progress.loaded / this.progress.total) * 100;
    },
  },
  watch: {
    src() {
      this.load();
    },
    rotation: {
      deep: true,
      handler(val) {
        if (!this.object) return;
        this.object.rotation.set(val.x, val.y, val.z);
      },
    },
    position: {
      deep: true,
      handler(val) {
        if (!this.object) return;
        this.object.position.set(val.x, val.y, val.z);
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
  mounted() {
    // 设置大小
    if (this.width === undefined || this.height === undefined) {
      this.size = {
        width: (this.$refs.container as HTMLDivElement).offsetWidth,
        height: (this.$refs.container as HTMLDivElement).offsetHeight,
      };
    }

    const options: WebGLRendererParameters = Object.assign({}, DEFAULT_GL_OPTIONS, this.glOptions, {
      canvas: this.$refs.canvas as HTMLCanvasElement,
    });

    this.renderer = new WebGLRenderer(options);
    this.renderer.shadowMap.enabled = true;
    this.renderer.outputEncoding = this.outputEncoding;

    this.controls = new OrbitControls(this.camera, this.$refs.container as HTMLDivElement);
    // this.controls.type = 'orbit';

    let axesHelper = new AxesHelper(100);
    this.scene.add(axesHelper);
    this.scene.add(this.wrapper);

    const helper = new GridHelper(250, 50);
    helper.position.set(0, -150, 0);
    this.scene.fog = new Fog(0xffffff, 0, 9000);
    this.scene.add(helper);

    axesHelper = new AxesHelper(250);
    axesHelper.position.set(-125, -150, -125);
    this.scene.add(axesHelper);
    const axisHelper2 = new AxesHelper(250);
    axisHelper2.position.set(125, -150, -125);
    axisHelper2.rotation.y = -70.6855;
    this.scene.add(axisHelper2);

    const axisHelper3 = new AxesHelper(250);
    axisHelper3.position.set(-125, -150, 125);
    axisHelper3.rotation.y = 70.6855;
    this.scene.add(axisHelper3);

    const axisHelper4 = new AxesHelper(250);
    axisHelper4.position.set(125, -150, 125);
    axisHelper4.rotation.y = 141.371;
    this.scene.add(axisHelper4);

    const axisHelper5 = new AxesHelper(250);
    axisHelper5.position.set(-125, 150, -125);
    axisHelper5.rotation.z = -70.6855;
    this.scene.add(axisHelper5);

    const axisHelper6 = new AxesHelper(250);
    axisHelper6.position.set(125, 150, -125);
    axisHelper6.rotation.y = -70.6855;
    axisHelper6.rotation.z = -70.6855;
    this.scene.add(axisHelper6);

    const axisHelper7 = new AxesHelper(250);
    axisHelper7.position.set(125, 150, 125);
    axisHelper7.rotation.y = -141.371;
    axisHelper7.rotation.z = -70.6855;
    this.scene.add(axisHelper7);

    const axisHelper8 = new AxesHelper(250);
    axisHelper8.position.set(-125, 150, 125);
    axisHelper8.rotation.y = 70.6855;
    axisHelper8.rotation.z = -70.6855;
    this.scene.add(axisHelper8);
    this.load();
    this.update();

    const element = this.$refs.container as HTMLDivElement;

    element.addEventListener('mousedown', this.onMouseDown, false);
    element.addEventListener('mousemove', this.onMouseMove, false);
    element.addEventListener('mouseup', this.onMouseUp, false);
    element.addEventListener('click', this.onClick, false);
    element.addEventListener('dblclick', this.onDblclick, false);
    window.addEventListener('resize', this.onResize, false);
    this.animate();
  },
  beforeUnmount() {
    cancelAnimationFrame(this.reqId!);

    this.renderer!.dispose();

    if (this.controls) {
      this.controls.dispose();
    }

    const element = this.$refs.container as HTMLDivElement;

    element.removeEventListener('mousedown', this.onMouseDown, false);
    element.removeEventListener('mousemove', this.onMouseMove, false);
    element.removeEventListener('mouseup', this.onMouseUp, false);
    element.removeEventListener('click', this.onClick, false);
    element.removeEventListener('dblclick', this.onDblclick, false);

    window.removeEventListener('resize', this.onResize, false);
  },
  methods: {
    onResize() {
      if (this.width === undefined || this.height === undefined) {
        this.$nextTick(() => {
          this.size = {
            width: (this.$refs.container as HTMLDivElement).offsetWidth,
            height: (this.$refs.container as HTMLDivElement).offsetHeight,
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
      if (!this.$refs.container) return;

      const rect = (this.$refs.container as HTMLDivElement).getBoundingClientRect();

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
    reportProgress(
      type: 'start' | 'end' | 'progress',
      data?: {
        lengthComputable: boolean;
        loaded: number;
        total: number;
      },
    ) {
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

      (this.loader as any).load(
        this.src,
        (...args: any) => {
          this.reportProgress('end');
          this.info.volume = getVolume(args[0]);
          this.info.area = getArea(args[0]);
          const object = (this.getObject as any)(...args);
          this.info.size = getSize(object);

          this.process(object);
          this.addObject(object);
          this.$emit('load');
        },
        (event: ProgressEvent) => {
          this.reportProgress('progress', event);
          this.$emit('progress', event);
        },
        (event: ErrorEvent) => {
          this.reportProgress('end');
          this.$emit('error', event);
        },
      );
    },
    process(object: Object3D) {
      return object;
    },
    getObject(object: Object3D) {
      return object;
    },
    addObject(object: Object3D) {
      this.object = object;
      // console.debug(this.object);
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

<template>
  <div ref="container" class="relative m-0 h-full w-full border-0 p-0">
    <slot v-if="progress.isComplete === false" name="progress-bar" :progress="progress">
      <div class="0, 0, 0.04)] bg-[rgba(0, absolute z-2 h-2 w-full" style="">
        <div
          :style="{
            width: `${loadProgressPercentage}%`,
            height: '100%',
            backgroundColor: '#1890ff',
            transition: 'width .2s',
          }"
        />
      </div>
    </slot>
    <div v-if="progress.isComplete === false" class="absolute z-1 h-full w-full">
      <slot name="poster" />
    </div>
    <canvas ref="canvas" class="h-full w-full" />
    <div class="border-t-3 bg-white p-3">
      <p class="border-b-3 text-xl">模型信息</p>
      <p>名称:{{ fileName }}</p>
      <p>体积:{{ (info.volume / 1000).toFixed(2) }} cm<sup>3</sup> </p>
      <p>表面积:{{ (info.area / 1000).toFixed(2) }} cm<sup>2</sup></p>
      <p>
        尺寸:{{ (info.size.x / 1).toFixed(2) }} &times; {{ (info.size.y / 1).toFixed(2) }} &times; {{ (info.size.z / 1).toFixed(2) }} cm
      </p>
    </div>
  </div>
</template>
