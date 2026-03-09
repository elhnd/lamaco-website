/**
 * Scene Setup
 * ===========
 * Creates and configures the Three.js renderer, scene, camera, lighting,
 * environment map, and shadow-catching ground plane.
 */
import * as THREE from "three";

/**
 * Create a WebGL renderer with shadow mapping and tone mapping.
 * @param {HTMLCanvasElement} canvas
 * @returns {THREE.WebGLRenderer}
 */
export function createRenderer(canvas) {
  const r = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  r.setPixelRatio(Math.min(devicePixelRatio, 2));
  r.setSize(innerWidth, innerHeight);
  r.shadowMap.enabled  = true;
  r.shadowMap.type     = THREE.PCFSoftShadowMap;
  r.toneMapping        = THREE.ACESFilmicToneMapping;
  r.toneMappingExposure = 1.1;
  r.outputColorSpace   = THREE.SRGBColorSpace;
  return r;
}

/**
 * Create scene with hemisphere + directional lights.
 * @returns {{ scene: THREE.Scene, sun: THREE.DirectionalLight }}
 */
export function createScene() {
  const scene = new THREE.Scene();

  /* hemisphere: sky blue top, warm ground bounce */
  const hemi = new THREE.HemisphereLight(0x87ceeb, 0x8b7355, 0.6);
  scene.add(hemi);

  /* main sun with shadows */
  const sun = new THREE.DirectionalLight(0xfff4e0, 1.8);
  sun.position.set(8, 18, 6);
  sun.castShadow            = true;
  sun.shadow.mapSize.width  = 1024;
  sun.shadow.mapSize.height = 1024;
  sun.shadow.camera.near    = 0.5;
  sun.shadow.camera.far     = 60;
  sun.shadow.camera.left    = -30;
  sun.shadow.camera.right   = 30;
  sun.shadow.camera.top     = 30;
  sun.shadow.camera.bottom  = -30;
  sun.shadow.bias            = -0.001;
  sun.shadow.radius          = 3;
  scene.add(sun);

  /* fill light — cool side */
  const fill = new THREE.DirectionalLight(0xc0d8f0, 0.5);
  fill.position.set(-6, 10, -4);
  scene.add(fill);

  /* soft back rim light */
  const rim = new THREE.DirectionalLight(0xffeedd, 0.3);
  rim.position.set(0, 8, -12);
  scene.add(rim);

  /* invisible shadow-catching ground plane */
  const groundGeo = new THREE.PlaneGeometry(120, 120);
  const groundMat = new THREE.ShadowMaterial({ opacity: 0.18 });
  const ground    = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x    = -Math.PI / 2;
  ground.position.y    = -0.01;
  ground.receiveShadow = true;
  scene.add(ground);

  return { scene, sun };
}

/**
 * Create and configure the perspective camera.
 * @returns {THREE.PerspectiveCamera}
 */
export function createCamera() {
  const cam = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 200);
  cam.position.set(0, 22, 8);
  cam.lookAt(0, 0, 0);
  return cam;
}

/**
 * Build a procedural environment map for PBR reflections.
 * @param {THREE.WebGLRenderer} renderer
 * @param {THREE.Scene} scene
 */
export function buildEnvMap(renderer, scene) {
  const pmrem    = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x87ceeb);

  const envGeo = new THREE.SphereGeometry(50, 16, 16);
  const envMat = new THREE.MeshBasicMaterial({ color: 0xd4e6f1, side: THREE.BackSide });
  envScene.add(new THREE.Mesh(envGeo, envMat));
  envScene.add(new THREE.AmbientLight(0xffffff, 1.0));

  const envMap       = pmrem.fromScene(envScene, 0.04).texture;
  scene.environment  = envMap;
  pmrem.dispose();
}
