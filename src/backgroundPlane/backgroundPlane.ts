
import * as THREE from 'three';
import { MAX_X, MAX_Y, SCENE_CENTER } from '../coordinates';
import { baseTexture, displacementTexture, lightTexture, metalnessTexture, normalTexture, roughnessTexture } from './textures';




const geometry = new THREE.PlaneGeometry(MAX_X, MAX_Y);
const material = new THREE.MeshStandardMaterial({
    map: baseTexture,
    displacementMap: displacementTexture,
    // displacementScale: 0.001,
    roughnessMap: roughnessTexture,
    metalnessMap: metalnessTexture,
    normalMap: normalTexture,
    lightMap: lightTexture,
    // metalness: 0.1,
    // // normalScale: new THREE.Vector2(1, 1),
    // // lightMapIntensity: 0.1,
    // aoMapIntensity: 1,
    // roughness: 0.05
});

const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(SCENE_CENTER.x, SCENE_CENTER.y, SCENE_CENTER.z);
// mesh.rotation.x = -1.5;
mesh.receiveShadow = true;



export const backgroundPlane = mesh;