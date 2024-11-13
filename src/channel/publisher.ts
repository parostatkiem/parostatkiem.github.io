import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/Addons.js';
import { MAX_X } from '../coordinates';
import { Channel } from './channel';
import { Connection } from './connection';
import { VisualObject } from './visualObject';

export class Publisher extends VisualObject {
  private _name: string;
  static readonly RADIUS = MAX_X / 150;
  private connections: Connection[] = [];

  constructor(name: string, parent: THREE.Object3D) {
    super(parent);
    this._name = name;
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
    this.model.position.set(this.position.x, this.position.y, this.position.z);

    // console.log('add to scene', this.name);
    super.addToParent();
  }

  public registerConnection(to: Channel) {
    const isExisting = this.connections.find((c) => c.to === to);

    if (!isExisting && this.model) {
      this.connections = [
        ...this.connections,
        new Connection(this, to, this.model),
      ];
    }
  }

  public getConnectionTo(to: Channel) {
    return this.connections.find((c) => c.to === to);
  }
}
