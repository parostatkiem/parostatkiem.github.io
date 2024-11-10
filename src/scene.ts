import * as THREE from 'three';
import './coordinates';
import { CSS2DRenderer } from 'three/examples/jsm/Addons.js';

import { MAX_X, MAX_Y, SCENE_CENTER } from './coordinates';
import './sceneManager';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { SceneManager } from './sceneManager';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);
const CAMERA_ZOOM = 2.7;
const camera = new THREE.OrthographicCamera(
  window.innerWidth / -CAMERA_ZOOM,
  window.innerWidth / CAMERA_ZOOM,
  window.innerHeight / CAMERA_ZOOM,
  window.innerHeight / -CAMERA_ZOOM,
  1,
  1000
);
// const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 100000);
camera.position.set(MAX_X / 2, MAX_Y / 2, MAX_Y * 1.1);
camera.lookAt(SCENE_CENTER);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);

document.body.appendChild(renderer.domElement);

// scene.add(createChannelVisual({ name: "BL", position: new THREE.Vector2(0, 0) }))
// scene.add(createChannelVisual({ name: "TR", position: new THREE.Vector2(MAX_X, MAX_Y) }))
SceneManager.renderAllChannels(scene);

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
