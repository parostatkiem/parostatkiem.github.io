import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/Addons.js';
import { Channel } from './sceneManager';
import { MAX_X } from './coordinates';

export const RADIUS = MAX_X / 100;

export const createChannelVisual = (channelData: Channel) => {
    const geometry = new THREE.SphereGeometry(RADIUS);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });

    const sphere = new THREE.Mesh(geometry, material);
    sphere.receiveShadow = true;
    sphere.castShadow = true;
    sphere.position.x = channelData.position.x;
    sphere.position.y = channelData.position.y;
    sphere.position.z = RADIUS;



    const earthDiv = document.createElement('div');
    earthDiv.className = 'label';
    earthDiv.textContent = channelData.name;
    earthDiv.style.backgroundColor = 'transparent';
    // document.body.appendChild(earthDiv)

    const earthLabel = new CSS2DObject(earthDiv);
    earthLabel.position.set(-RADIUS * 2, -RADIUS, 0);
    earthLabel.center.set(0, 0);
    // earthLabel.scale = 10;
    sphere.add(earthLabel);
    // earthLabel.layers.set(0);

    // sphere.matrixAutoUpdate = false;
    // sphere.updateMatrix();
    // sphere.update
    return sphere;
}
