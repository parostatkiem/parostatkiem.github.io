import * as THREE from 'three';
import {
  getRandomPositionOnScreen,
  OBJECT_PLACEMENT_MARGIN,
} from '../coordinates';

export class VisualObject {
  private _position: THREE.Vector3 | undefined;
  public model: THREE.Object3D | undefined;
  public parent: THREE.Object3D;

  constructor(parent: THREE.Object3D) {
    this.parent = parent;
  }

  public addToParent() {
    if (!this.position || !this.model) {
      return;
    }
    this.parent.add(this.model);
  }

  public assignPosition(pos: THREE.Vector3) {
    this._position = pos;
    this.model?.position.set(pos.x, pos.y, pos.z);
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
