import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/Addons.js';
import { MAX_X } from '../coordinates';
import { Subscription } from 'pubnub';
import { getChannelSubscription } from '../pubnub';
import { VisualObject } from './visualObject';
import { SceneManager } from '../sceneManager';

export const RADIUS = MAX_X / 100;

export class Channel extends VisualObject {
  private name: string;
  private subscription: Subscription;

  constructor(name: string, scene: THREE.Object3D) {
    super(scene);

    const handleMessageReceived = (message: Subscription.Message) => {
      console.log('got message from', message.publisher, message.channel);
      SceneManager.handleMessageReceived(
        message.publisher ?? '<unknown>',
        this,
        scene
      );
    };
    this.name = name;
    this.subscription = getChannelSubscription(this.name);
    // this.subscription.onMessage = this.handleMessageReceived;
    this.subscription.addListener({
      message: handleMessageReceived,
      signal: handleMessageReceived,
    });
    console.log('createing subscriptiopn to ', this.name);
    this.subscription.subscribe();
  }

  public addToScene() {
    if (!this.position) {
      return undefined;
    }

    const geometry = new THREE.SphereGeometry(RADIUS, 4, 4);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
      wireframeLinewidth: 0.1,
      opacity: 0.5,
      transparent: true,
    });

    const earthDiv = document.createElement('div');
    earthDiv.className = 'label';
    earthDiv.textContent = this.name;
    earthDiv.style.backgroundColor = 'transparent';
    document.body.appendChild(earthDiv);

    const earthLabel = new CSS2DObject(earthDiv);
    earthLabel.position.set(-RADIUS * 2, -RADIUS, 0);
    earthLabel.center.set(0, 0);

    this.model = new THREE.Mesh(geometry, material);
    this.model.position.set(this.position.x, this.position.y, this.position.z);
    this.model.add(earthLabel);
    super.addToParent();
  }
}
