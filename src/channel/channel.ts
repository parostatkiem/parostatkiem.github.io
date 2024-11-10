import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/Addons.js';
import { MAX_X } from '../coordinates';

export const RADIUS = MAX_X / 100;

export class Channel {
  private name: string;
  private scene: THREE.Scene;
  private _position: THREE.Vector2 | undefined;

  constructor(name: string, scene: THREE.Scene) {
    this.name = name;
    this.scene = scene;
  }

  public render() {
    if (!this.position) {
      return undefined;
    }

    const geometry = new THREE.SphereGeometry(RADIUS, 4, 4);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
      wireframeLinewidth: 0.1,
      opacity: 0.4,
      transparent: true,
    });
    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.x = this.position.x;
    sphere.position.y = this.position.y;
    sphere.position.z = RADIUS + RADIUS;

    const earthDiv = document.createElement('div');
    earthDiv.className = 'label';
    earthDiv.textContent = this.name;
    earthDiv.style.backgroundColor = 'transparent';
    // document.body.appendChild(earthDiv)

    const earthLabel = new CSS2DObject(earthDiv);
    earthLabel.position.set(-RADIUS * 2, -RADIUS, 0);
    earthLabel.center.set(0, 0);
    sphere.add(earthLabel);

    this.scene.add(sphere);
  }

  public assignPosition(pos: THREE.Vector2) {
    this._position = pos;
  }

  public get position() {
    return this._position;
  }
}
