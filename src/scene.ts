import * as THREE from 'three';
import './coordinates';
import { CSS2DRenderer, OrbitControls } from 'three/examples/jsm/Addons.js';

import { MAX_X, MAX_Y, MAX_Z, SCENE_CENTER } from './coordinates';
import './sceneManager';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { SceneManager } from './sceneManager';
import { getSubscriptionToAllChannels, setToken } from './pubnub';
import { VisualObject } from './channel/visualObject';
import { Channel, RADIUS } from './channel/channel';
import CameraControls from 'camera-controls';

CameraControls.install({ THREE: THREE });
const clock = new THREE.Clock();
// const SCENE_MANAGER=

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

const CAMERA_ZOOM = MAX_Y * 0.0006;
const camera = new THREE.OrthographicCamera(
  window.innerWidth * -CAMERA_ZOOM,
  window.innerWidth * CAMERA_ZOOM,
  window.innerHeight * CAMERA_ZOOM,
  window.innerHeight * -CAMERA_ZOOM,
  1,
  100000
);

// const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 100000);
camera.position.set(0, 0, MAX_Z * 2);
// camera.position.set(0, 0, 0);

// camera.lookAt(SCENE_CENTER);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

document.body.appendChild(renderer.domElement);

// const d1 = new Channel('BL', scene);
// d1.assignPosition(new THREE.Vector3(0, 0, RADIUS));
// d1.addToScene();

// const d2 = new Channel('TR', scene);
// d2.position.set(MAX_X, MAX_Y, RADIUS);
// d2.addToScene();

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshBasicMaterial({
    color: 0xaaff00,
  })
);
mesh.position.set(0, 0, 0);
scene.add(mesh);

const mesh2 = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshBasicMaterial({
    color: 0x00aaff,
  })
);
mesh2.position.set(MAX_X, MAX_Y, MAX_Z);
scene.add(mesh2);

// const gridHelper = new THREE.GridHelper(MAX_X, 10);
// gridHelper.position.y = -1;
// scene.add(gridHelper);

SceneManager.renderAllChannels(scene);
// SceneManager.renderAllPublishers(scene);

// function a() {
//   const s = getSubscriptionToAllChannels();
//   s.onMessage = SceneManager.handleMessageReceived;
//   s.subscribe();
// }

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
document.body.appendChild(labelRenderer.domElement);

const cameraControls = new CameraControls(camera, labelRenderer.domElement);

// cameraControls.moveTo(SCENE_CENTER.x, SCENE_CENTER.y, MAX_Z * 2, false);
cameraControls.setOrbitPoint(SCENE_CENTER.x, SCENE_CENTER.y, SCENE_CENTER.z);
cameraControls.truck(MAX_X / 2, -MAX_Y / 2);

// cameraControls.rotate(0, 90);
// cameraControls.rotatePolarTo(90);

// cameraControls.zoomTo(0.2);

// cameraControls.saveState();
//controls.update() must be called after any manual changes to the camera's transform
// camera.position.set(0, 200, 100);
// camera.lookAt(0, 200, 100);
// controls.update();

// camera.layers.toggle(0);
const stats = new Stats();
// document.body.appendChild(stats.dom);

function animate() {
  const delta = clock.getDelta();
  cameraControls.update(delta);
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  stats.update();
}

// setTimeout(a, 100);
