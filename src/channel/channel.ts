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

  constructor(name: string, scene: THREE.Scene) {
    super(scene);

    const handleMessageReceived = (message: Subscription.Message) => {
      console.log('got message from', message.publisher, message.channel);
      SceneManager.registerPublisherConnection(
        message.publisher ?? '<unknown>',
        message.channel,
        this.scene
      );
    };
    this.name = name;
    this.subscription = getChannelSubscription(this.name);
    // this.subscription.onMessage = this.handleMessageReceived;
    this.subscription.addListener({
      message: handleMessageReceived,
    });
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
      opacity: 0.4,
      transparent: true,
    });

    const earthDiv = document.createElement('div');
    earthDiv.className = 'label';
    earthDiv.textContent = this.name;
    earthDiv.style.backgroundColor = 'transparent';
    // document.body.appendChild(earthDiv)

    const earthLabel = new CSS2DObject(earthDiv);
    earthLabel.position.set(-RADIUS * 2, -RADIUS, 0);
    earthLabel.center.set(0, 0);

    this.model = new THREE.Mesh(geometry, material);
    this.model.add(earthLabel);
    super.addToScene();
  }
}
