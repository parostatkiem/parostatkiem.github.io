import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/Addons.js';


export const createChannel = () => {
    const geometry = new THREE.SphereGeometry(0.3);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const sphere = new THREE.Mesh(geometry, material);


    const earthDiv = document.createElement('div');
    earthDiv.className = 'label';
    earthDiv.textContent = 'Earth';
    earthDiv.style.backgroundColor = 'transparent';
    // document.body.appendChild(earthDiv)

    const earthLabel = new CSS2DObject(earthDiv);
    earthLabel.position.set(-0.3, -1.5 * .3, 0);
    earthLabel.center.set(0, 0);
    sphere.add(earthLabel);
    earthLabel.layers.set(0);
    return sphere;
}
