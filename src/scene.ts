import './coordinates'
import * as THREE from 'three';
import { color } from 'three/webgpu';
import { createChannelVisual } from './channel';
import { CSS2DRenderer } from 'three/examples/jsm/Addons.js';
import './sceneManager'
import { getChannelsVisual } from './sceneManager';
import { MAX_X, MAX_Y } from './coordinates';



console.log(window.innerWidth, window.innerHeight, MAX_X, MAX_Y)

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);
const camera = new THREE.OrthographicCamera(0, MAX_X, 0, MAX_Y, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);


scene.add(...getChannelsVisual());

renderer.render(scene, camera);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
document.body.appendChild(labelRenderer.domElement);

// camera.layers.toggle(0);

labelRenderer.render(scene, camera);
