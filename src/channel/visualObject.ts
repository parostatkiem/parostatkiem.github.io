import * as THREE from 'three';
import { MAX_X } from '../coordinates';
import { RADIUS } from './channel';

export class VisualObject {
  public scene: THREE.Scene;
  private _position: THREE.Vector2 | undefined;
  public model: THREE.Object3D | undefined;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
  }

  private update() {
    if (!this.position || !this.model) {
      return;
    }
    this.model.position.x = this.position.x;
    this.model.position.y = this.position.y;
  }

  public addToScene() {
    if (!this.position || !this.model) {
      return;
    }

    this.update();
    this.model.position.z = RADIUS + RADIUS;

    this.scene.add(this.model);
  }

  public assignPosition(pos: THREE.Vector2) {
    this._position = pos;
  }

  public get position() {
    return this._position;
  }
}
