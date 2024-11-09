import './coordinates'
import * as THREE from 'three';
import { color, PI } from 'three/webgpu';
import { createChannelVisual } from './channel';
import { CSS2DRenderer } from 'three/examples/jsm/Addons.js';
import './sceneManager'
import { getChannelsVisual } from './sceneManager';
import { MAX_X, MAX_Y } from './coordinates';



console.log(window.innerWidth, window.innerHeight, MAX_X, MAX_Y)

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);
// const camera = new THREE.OrthographicCamera(0, MAX_X, 0, MAX_Y, 0.1, 100000);
const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.01, 10000);
camera.position.set(MAX_X / 2, MAX_Y / 2, MAX_Y * 7);
camera.lookAt(MAX_X / 2, MAX_Y / 2, 0);


const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


// renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.PlaneGeometry(MAX_X, MAX_Y);
const material = new THREE.MeshLambertMaterial({ color: 0xff00aa, wireframe: true });

const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(MAX_X / 2, MAX_Y / 2, 0);
// mesh.rotation.y = - Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);

const axesHelper = new THREE.AxesHelper(10);
axesHelper.position.set(MAX_X / 2, MAX_Y / 2, 10);
// scene.add(axesHelper);


// lights
const dirLight = new THREE.DirectionalLight(0xffffff, 3);
dirLight.position.set(0, 10, 45);
// dirLight.shadow.mapSize.set(4096, 4096);
// dirLight.penumbra = 0.5;
dirLight.castShadow = true;

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
