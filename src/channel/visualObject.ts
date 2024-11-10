import * as THREE from 'three';
import {
  getRandomPositionOnScreen,
  OBJECT_PLACEMENT_MARGIN,
} from '../coordinates';
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
    this.model.position.z = RADIUS + RADIUS; // todo 3d maybe?

    this.scene.add(this.model);
  }

  public assignPosition(pos: THREE.Vector2) {
    this._position = pos;
  }

  public get position() {
    return this._position;
  }

  static getPositionNotConflictingWith = (
    otherObjects: VisualObject[],
    objectSize: number
  ): THREE.Vector2 => {
    let pos: THREE.Vector2;
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
