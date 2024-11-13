import * as THREE from 'three';
import { MAX_X } from '../coordinates';
import { Channel } from './channel';
import { Publisher } from './publisher';
import { VisualObject } from './visualObject';

const MESSAGE_ANIMATION_STEPS = 100;
const MESSAGE_ANIMATION_INTERVAL = 8;

const createMessageVisual = () => {
  const RADIUS = MAX_X / 200;
  const geometry = new THREE.SphereGeometry(RADIUS, 4, 4);
  const material = new THREE.MeshBasicMaterial({
    color: 0xccff00,
    wireframe: true,
    wireframeLinewidth: 0.1,
    opacity: 0.6,
    transparent: true,
  });

  const model = new THREE.Mesh(geometry, material);
  return model;
};

export class Connection extends VisualObject {
  static readonly RADIUS = MAX_X / 150;
  private _from: Publisher;
  private _to: Channel;

  constructor(from: Publisher, to: Channel, parent: THREE.Object3D) {
    super(parent);
    this._from = from;
    this._to = to;
    console.log('creating connection');
    this.assignPosition(new THREE.Vector3(0, 0, 0)); //todo unused

    this.addToScene();
  }

  public get to() {
    return this._to;
  }

  public get from() {
    return this._from;
  }

  public displayMessage() {
    if (!this.to.position) {
      return; //todo
    }

    const model = createMessageVisual();

    const from = new THREE.Vector3(0, 0, 0);
    const to = model.worldToLocal(this.to.position);

    model.position.set(to.x, to.y, to.z);
    this.parent.add(model);
    let n = 1;

    const interval = setInterval(() => {
      if (n + 1 === MESSAGE_ANIMATION_STEPS) {
        clearInterval(interval);
        this.parent.remove(model);
        return;
      }
      if (n === 1) {
        this.parent.add(model);
      }

      model.position.lerpVectors(from, to, n / MESSAGE_ANIMATION_STEPS);

      n++;
    }, MESSAGE_ANIMATION_INTERVAL);
  }

  public addToScene() {
    if (!this.from.position || !this.to.position) {
      console.error('adding to scene failed');
      return; //todo
    }

    const material = new THREE.LineBasicMaterial({
      color: 0xccff00,
      transparent: true,
      opacity: 0.25,
    });
    const points = [
      new THREE.Vector3(0, 0, 0),
      this.parent.worldToLocal(this.to.position),
    ];

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    this.model = new THREE.Line(geometry, material);

    let n = 1;

    const interval = setInterval(() => {
      if (n + 1 === MESSAGE_ANIMATION_STEPS) {
        clearInterval(interval);
        return;
      }

      if (this.model) {
        this.model.scale.set(
          n / MESSAGE_ANIMATION_STEPS,
          n / MESSAGE_ANIMATION_STEPS,
          n / MESSAGE_ANIMATION_STEPS
        );
      }

      if (n === 1) {
        super.addToParent();
      }

      n++;
    }, MESSAGE_ANIMATION_INTERVAL);
  }
}
