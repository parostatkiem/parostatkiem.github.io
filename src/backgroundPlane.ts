
import * as THREE from 'three';
import { MAX_X, MAX_Y, SCENE_CENTER } from './coordinates';

const texture = new THREE.TextureLoader()

const baseTexture = texture.load('/textures/background/Stained_Ceramic_Tiles_vhqncb3_4K_BaseColor.jpg')
// const displacementTexture = new THREE.TextureLoader().load('/textures/background/Stained_Ceramic_Tiles_vhqncb3_4K_Displacement.jpg');
baseTexture.wrapS = THREE.RepeatWrapping;
baseTexture.wrapT = THREE.RepeatWrapping;
baseTexture.repeat = new THREE.Vector2(3, MAX_Y / MAX_X * 4)


const geometry = new THREE.PlaneGeometry(MAX_X, MAX_Y);
const material = new THREE.MeshStandardMaterial({ map: baseTexture, });

const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(SCENE_CENTER.x, SCENE_CENTER.y, SCENE_CENTER.z);
// mesh.rotation.y = - Math.PI / 2;
mesh.receiveShadow = true;



export const backgroundPlane = mesh;