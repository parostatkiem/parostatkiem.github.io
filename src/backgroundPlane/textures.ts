import * as THREE from 'three';
import { MAX_X, MAX_Y } from '../coordinates';

const texture = new THREE.TextureLoader()
const applyMapping = (t: THREE.Texture) => {
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    t.repeat = new THREE.Vector2(2, MAX_Y / MAX_X * 3);
    return t
}



export const baseTexture = applyMapping(texture.load('/textures/background/Flaked_Paint_Wall_vhqgdhh_4K_BaseColor.jpg'))
export const displacementTexture = applyMapping(texture.load('/textures/background/Flaked_Paint_Wall_vhqgdhh_4K_Displacement.jpg'))
export const roughnessTexture = applyMapping(texture.load('/textures/background/Flaked_Paint_Wall_vhqgdhh_4K_Roughness.jpg'))
export const metalnessTexture = applyMapping(texture.load('/textures/background/Flaked_Paint_Wall_vhqgdhh_4K_Gloss.jpg'))
export const normalTexture = applyMapping(texture.load('/textures/background/Flaked_Paint_Wall_vhqgdhh_4K_Normal.jpg'))
export const lightTexture = applyMapping(texture.load('/textures/background/Flaked_Paint_Wall_vhqgdhh_4K_AO.jpg'))


