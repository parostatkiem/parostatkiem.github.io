import * as THREE from 'three';
import './coordinates';
import { CSS2DRenderer } from 'three/examples/jsm/Addons.js';

import { MAX_X, MAX_Y, SCENE_CENTER } from './coordinates';
import './sceneManager';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { SceneManager } from './sceneManager';
import { getSubscriptionToAllChannels, setToken } from './pubnub';
import { VisualObject } from './channel/visualObject';
import { Channel, RADIUS } from './channel/channel';

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
camera.position.set(MAX_X / 2, MAX_Y / 2, MAX_Y * 3);
camera.lookAt(SCENE_CENTER);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

document.body.appendChild(renderer.domElement);

const d1 = new Channel('BL', scene);
d1.assignPosition(new THREE.Vector3(0, 0, RADIUS));
d1.addToScene();

const d2 = new Channel('TR', scene);
d1.assignPosition(new THREE.Vector3(MAX_X, MAX_Y, RADIUS));
d1.addToScene();

SceneManager.renderAllChannels(scene);
// SceneManager.renderAllPublishers(scene);

function a() {
  const s = getSubscriptionToAllChannels();
  s.onMessage = SceneManager.handleMessageReceived;
  s.subscribe();
}

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
document.body.appendChild(labelRenderer.domElement);

// camera.layers.toggle(0);
const stats = new Stats();
document.body.appendChild(stats.dom);

function animate() {
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
  stats.update();
}

setTimeout(a, 100);
