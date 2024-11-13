import * as THREE from 'three';
import { MAX_X } from '../coordinates';
import { Channel } from './channel';
import { Publisher } from './publisher';
import { VisualObject } from './visualObject';

export class Connection extends VisualObject {
  static readonly RADIUS = MAX_X / 150;
  private _from: Publisher;
  private _to: Channel;

  constructor(from: Publisher, to: Channel, scene: THREE.Scene) {
    super(scene);
    this._from = from;
    this._to = to;
    this.assignPosition(new THREE.Vector3(0, 0, 0)); //todo unused

    this.addToScene();
  }

  public get to() {
    return this._to;
  }

  public get from() {
    return this._from;
  }

  public addToScene() {
    if (!this.from.position || !this.to.position) {
      return; //todo
    }

    const material = new THREE.LineBasicMaterial({
      color: 0xccff00,
      transparent: true,
      opacity: 0.2,
    });
    const points = [this.from.position, this.to.position];

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    this.model = new THREE.Line(geometry, material);

    super.addToScene();
  }
}
