import * as THREE from 'three';

export const MAX_X = 1000;
export const MAX_Y = (MAX_X * window.innerHeight) / window.innerWidth;
export const MAX_Z = MAX_X;

export const SCENE_CENTER = new THREE.Vector3(MAX_X / 2, MAX_Y / 2, 0);

export const OBJECT_PLACEMENT_MARGIN = MAX_X / 100;

function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
export const getRandomPositionOnScreen = (
  objectSize: number,
  objectMargin: number
): THREE.Vector3 =>
  new THREE.Vector3(
    getRandomArbitrary(
      objectSize + objectMargin,
      MAX_X - objectSize - objectMargin
    ),
    getRandomArbitrary(
      objectSize + objectMargin,
      MAX_Y - objectSize - objectMargin
    ),
    getRandomArbitrary(
      objectSize + objectMargin,
      MAX_Z - objectSize - objectMargin
    )
  );
