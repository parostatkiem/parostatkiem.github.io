import * as THREE from 'three';
import {
  getRandomPositionOnScreen,
  OBJECT_PLACEMENT_MARGIN,
} from '../coordinates';
import { RADIUS } from './channel';

export class VisualObject {
  private _position: THREE.Vector3 | undefined;
  public model: THREE.Object3D | undefined;
  public parent: THREE.Object3D;

  constructor(parent: THREE.Object3D) {
    this.parent = parent;
  }

  private update() {
    if (!this.position || !this.model) {
      return;
    }
    this.model.position.x = this.position.x;
    this.model.position.y = this.position.y;
  }

  public addToParent() {
    if (!this.position || !this.model) {
      return;
    }

    this.update();
    this.model.position.z = RADIUS + RADIUS; // todo 3d maybe?

    this.parent.add(this.model);
  }

  public assignPosition(pos: THREE.Vector3) {
    this._position = pos;
  }

  public get position() {
    return this._position;
  }

  static getPositionNotConflictingWith = (
    otherObjects: VisualObject[],
    objectSize: number
  ): THREE.Vector3 => {
    let pos: THREE.Vector3;
    do {
      pos = getRandomPositionOnScreen(objectSize, OBJECT_PLACEMENT_MARGIN);
    } while (
      otherObjects.some(
        ({ position }) =>
          position &&
          position.distanceTo(pos) < objectSize + OBJECT_PLACEMENT_MARGIN
      )
    );

    return pos;
  };
}
