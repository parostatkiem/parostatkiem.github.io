import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/Addons.js';
import { MAX_X } from '../coordinates';
import { VisualObject } from './visualObject';

export class Publisher extends VisualObject {
  private _name: string;
  static readonly RADIUS = MAX_X / 150;

  constructor(name: string, scene: THREE.Scene) {
    super(scene);
    this._name = name;
    console.log('creating publisher', name);
  }

  public get name() {
    return this._name;
  }

  public addToScene() {
    if (!this.position) {
      return undefined;
    }

    const geometry = new THREE.SphereGeometry(Publisher.RADIUS, 4, 4);
    const material = new THREE.MeshBasicMaterial({
      color: 0x0055ff,
      wireframe: true,
      wireframeLinewidth: 0.06,
      opacity: 0.6,
      transparent: true,
    });

    const earthDiv = document.createElement('div');
    earthDiv.className = 'label';
    earthDiv.textContent = this._name;
    earthDiv.style.backgroundColor = 'transparent';
    // document.body.appendChild(earthDiv)

    const earthLabel = new CSS2DObject(earthDiv);
    earthLabel.position.set(-Publisher.RADIUS * 2, -Publisher.RADIUS, 0);
    earthLabel.center.set(0, 0);

    this.model = new THREE.Mesh(geometry, material);
    this.model.add(earthLabel);

    console.log('add to scene', this.name);
    super.addToScene();
  }
}
