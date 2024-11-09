import * as THREE from 'three';
import { MAX_X, MAX_Y } from '../coordinates';

const loader = new THREE.TextureLoader()
const applyMapping = (t: THREE.Texture) => {
    // t.wrapS = THREE.RepeatWrapping;
    // t.wrapT = THREE.RepeatWrapping;
    // t.repeat = new THREE.Vector2(1, 1);
    return t
}



const baseTexture = applyMapping(loader.load('/textures/channel/Mossy_Rocky_Ground_vl0gahwo_1K_BaseColor.jpg'))
const displacementTexture = applyMapping(loader.load('/textures/channel/Mossy_Rocky_Ground_vl0gahwo_1K_Displacement.jpg'))
const roughnessTexture = applyMapping(loader.load('/textures/channel/Mossy_Rocky_Ground_vl0gahwo_1K_Roughness.jpg'))
const metalnessTexture = applyMapping(loader.load('/textures/channel/Mossy_Rocky_Ground_vl0gahwo_1K_Gloss.jpg'))
const normalTexture = applyMapping(loader.load('/textures/channel/Mossy_Rocky_Ground_vl0gahwo_1K_Normal.jpg'))
const lightTexture = applyMapping(loader.load('/textures/channel/Mossy_Rocky_Ground_vl0gahwo_1K_AO.jpg'))

export const material = new THREE.MeshStandardMaterial({
    map: baseTexture,
    // displacementMap: displacementTexture,
    // displacementScale: 0.0001,
    // roughnessMap: roughnessTexture,
    // metalnessMap: metalnessTexture,
    // normalMap: normalTexture,
    // lightMap: lightTexture,
    metalness: 0.3,
    aoMapIntensity: 1,
    roughness: 0.1,
});