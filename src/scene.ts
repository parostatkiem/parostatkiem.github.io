import './coordinates'
import * as THREE from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/Addons.js';
import './sceneManager'
import { getChannelsVisual } from './sceneManager';
import { MAX_X, MAX_Y, SCENE_CENTER } from './coordinates';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);
const CAMERA_ZOOM = 2.7;
const camera = new THREE.OrthographicCamera(
    window.innerWidth / - CAMERA_ZOOM,
    window.innerWidth / CAMERA_ZOOM,
    window.innerHeight / CAMERA_ZOOM,
    window.innerHeight / - CAMERA_ZOOM,
    1, 1000);
// const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 100000);
camera.position.set(MAX_X / 2, MAX_Y / 2, MAX_Y * 1.1);
camera.lookAt(SCENE_CENTER);


const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


document.body.appendChild(renderer.domElement);


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
