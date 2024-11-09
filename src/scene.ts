import './coordinates'
import * as THREE from 'three';
import { color, PI } from 'three/webgpu';
import { createChannelVisual } from './channel';
import { CSS2DRenderer } from 'three/examples/jsm/Addons.js';
import './sceneManager'
import { getChannelsVisual } from './sceneManager';
import { MAX_X, MAX_Y, SCENE_CENTER } from './coordinates';
import { backgroundPlane } from './backgroundPlane';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);
// const camera = new THREE.OrthographicCamera(0, MAX_X, 0, MAX_Y, 0.1, 100000);
const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.01, 10000);
camera.position.set(MAX_X / 2, MAX_Y / 2, MAX_Y * 7);
camera.lookAt(SCENE_CENTER);


const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

scene.add(backgroundPlane);



// lights
const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(0, 10, 4500);
// dirLight.lookAt(SCENE_CENTER)
dirLight.shadow.mapSize.set(4096, 4096);
// dirLight.penumbra = 0.5;
dirLight.castShadow = true;
scene.add(dirLight)

// scene.add(createChannelVisual({ name: "BL", position: new THREE.Vector2(0, 0) }))
// scene.add(createChannelVisual({ name: "TR", position: new THREE.Vector2(MAX_X, MAX_Y) }))
scene.add(...getChannelsVisual());

renderer.render(scene, camera);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
document.body.appendChild(labelRenderer.domElement);

// camera.layers.toggle(0);

labelRenderer.render(scene, camera);
