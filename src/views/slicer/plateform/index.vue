<script lang="ts" setup>
import * as Three from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { VTKLoader } from 'three/examples/jsm/loaders/VTKLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
const THREE = Object.create(Three);
THREE.EffectComposer = EffectComposer;
THREE.RenderPass = RenderPass;
THREE.OutlinePass = OutlinePass;
THREE.OrbitControls = OrbitControls;
THREE.TransformControls = TransformControls;
THREE.VTKLoader = VTKLoader;
THREE.OBJLoader = OBJLoader;

const webgl: Ref<HTMLElement | undefined> = ref(undefined);
const { proxy } = getCurrentInstance()!;

onMounted(() => {
  const height = webgl.value!.clientHeight;
  const width = webgl.value!.clientWidth;

  let renderer;
  initThree();
  function initThree() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xffffff, 1);
    proxy.$refs.webgl.append(renderer.domElement);
  }

  let camera;
  initCamera();
  function initCamera() {
    camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 10000000);
    camera.position.x = 0;
    camera.position.y = 20;
    camera.position.z = 1500;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt({
      x: 0,
      y: 0,
      z: 0,
    });
  }
  let scene;
  initScene();
  function initScene() {
    scene = new THREE.Scene();
  }
  let light;
  initLight();
  function initLight() {
    light = new THREE.AmbientLight(0xff0000, 0.9);
    light.position.set(100, 100, 200);
    scene.add(light);
  }

  let boxMesh,
    objMesh = undefined;
  const pivot = undefined;
  let axis1, axis2, axis3;
  initObject();
  function initObject() {
    const manager = new THREE.LoadingManager();
    const loader = new THREE.OBJLoader(manager);
    loader.load('src/views/slicer/model.obj', placeObj);

    function placeObj(object) {
      //scene.add( object );
      const objMesh = object;
      const pivot = new THREE.Group();
      const box = new THREE.Box3().setFromObject(objMesh);
      pivot.add(objMesh);
      // box.center(objMesh.position);
      objMesh.position.multiplyScalar(-1);
      scene.add(pivot);
      // box.center(pivot.position);
      // 辅助坐标
      axis1 = new THREE.AxesHelper(100);
      axis1.position.copy(pivot.position);
      scene.add(axis1);

      axis2 = new THREE.AxesHelper(100);
      axis2.position.copy(objMesh.position);
      scene.add(axis2);
    }
  }

  const helper = new THREE.GridHelper(500, 50);
  helper.position.set(0, -600, 0);
  scene.fog = new THREE.Fog(0xffffff, 0, 9000);
  scene.add(helper);

  const AxesHelper = new THREE.AxesHelper(1000);
  AxesHelper.position.set(-500, -600, -500);
  scene.add(AxesHelper);
  const axisHelper2 = new THREE.AxesHelper(1000);
  axisHelper2.position.set(500, -600, -500);
  axisHelper2.rotation.y = -70.6855;
  scene.add(axisHelper2);

  const axisHelper3 = new THREE.AxesHelper(1000);
  axisHelper3.position.set(-500, -600, 500);
  axisHelper3.rotation.y = 70.6855;
  scene.add(axisHelper3);

  const axisHelper4 = new THREE.AxesHelper(1000);
  axisHelper4.position.set(500, -600, 500);
  axisHelper4.rotation.y = 141.371;
  scene.add(axisHelper4);

  const axisHelper5 = new THREE.AxesHelper(1000);
  axisHelper5.position.set(-500, 800, -500);
  axisHelper5.rotation.z = -70.6855;
  scene.add(axisHelper5);

  const axisHelper6 = new THREE.AxesHelper(1000);
  axisHelper6.position.set(500, 800, -500);
  axisHelper6.rotation.y = -70.6855;
  axisHelper6.rotation.z = -70.6855;
  scene.add(axisHelper6);

  const axisHelper7 = new THREE.AxesHelper(1000);
  axisHelper7.position.set(500, 800, 500);
  axisHelper7.rotation.y = -141.371;
  axisHelper7.rotation.z = -70.6855;
  scene.add(axisHelper7);

  const axisHelper8 = new THREE.AxesHelper(1000);
  axisHelper8.position.set(-500, 800, 500);
  axisHelper8.rotation.y = 70.6855;
  axisHelper8.rotation.z = -70.6855;
  scene.add(axisHelper8);

  const mouse = new THREE.Vector2();
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
  camera.add(directionalLight);

  const orbit = new THREE.OrbitControls(camera, webgl.value);
  orbit.addEventListener('change', onViewChanged);
  orbit.screenSpacePanning = true;
  // 使动画循环使用时阻尼或自转 意思是否有惯性
  orbit.enableDamping = true;
  //动态阻尼系数 就是鼠标拖拽旋转灵敏度
  orbit.dampingFactor = 0.25;
  //是否可以缩放
  orbit.enableZoom = true;
  //是否自动旋转
  orbit.autoRotate = false;
  //设置相机距离原点的最远距离
  orbit.minDistance = 200;
  //设置相机距离原点的最远距离
  orbit.maxDistance = 1300;
  //是否开启右键拖拽
  orbit.enablePan = true;

  function onViewChanged(event) {
    render();
    // stage.onViewChanged(camera);

    // const az = mine.orbit.getAzimuthalAngle() / Math.PI * 180;
    // const po = mine.orbit.getPolarAngle() / Math.PI * 180;
    // window.navCube.update(po - 80, 180 - az, 0);
  }
  // var composer
  // composer = new THREE.EffectComposer(renderer);
  // composer.setSize(width, height);
  // var renderPass = new THREE.RenderPass(scene, camera);
  // composer.addPass(renderPass);

  // var outlinePass = new THREE.OutlinePass(new THREE.Vector2(width, height), scene, camera);
  // composer.addPass(outlinePass);
  // outlinePass.edgeStrength = 5;
  // outlinePass.edgeThickness = 2;
  // outlinePass.edgeGlow = 0.5;

  function render() {
    requestAnimationFrame(render);
    // cube.rotation.x += 0.1;
    // cube.rotation.y += 0.1;
    renderer.render(scene, camera);
  }
  render();
});
</script>

<template>
  <div ref="webgl" class="h-100 w-100" />
</template>
