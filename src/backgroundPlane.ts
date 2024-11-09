
import * as THREE from 'three';
import { MAX_X, MAX_Y, SCENE_CENTER } from './coordinates';

const texture = new THREE.TextureLoader()
const applyMapping = (t: THREE.Texture) => {
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    t.repeat = new THREE.Vector2(2, MAX_Y / MAX_X * 2);
    return t
}



const baseTexture = applyMapping(texture.load('/textures/background/Stained_Ceramic_Tiles_vhqncb3_4K_BaseColor.jpg'))
const displacementTexture = applyMapping(texture.load('/textures/background/Stained_Ceramic_Tiles_vhqncb3_4K_Displacement.jpg'))
const roughnessTexture = applyMapping(texture.load('/textures/background/Stained_Ceramic_Tiles_vhqncb3_4K_Roughness.jpg'))
const metalnessTexture = applyMapping(texture.load('/textures/background/Stained_Ceramic_Tiles_vhqncb3_4K_Gloss.jpg'))
const normalTexture = applyMapping(texture.load('/textures/background/Stained_Ceramic_Tiles_vhqncb3_4K_Normal.jpg'))
const lightTexture = applyMapping(texture.load('/textures/background/Stained_Ceramic_Tiles_vhqncb3_4K_AO.jpg'))





const geometry = new THREE.PlaneGeometry(MAX_X, MAX_Y);
const material = new THREE.MeshStandardMaterial({
    map: baseTexture,
    // displacementMap: displacementTexture,
    // // displacementScale: 0.0001,
    roughnessMap: roughnessTexture,
    metalnessMap: metalnessTexture,
    normalMap: normalTexture,
    lightMap: lightTexture
});

const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(SCENE_CENTER.x, SCENE_CENTER.y, SCENE_CENTER.z);
// mesh.rotation.x = -1.5;
mesh.receiveShadow = true;



export const backgroundPlane = mesh;