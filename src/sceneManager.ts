import { array } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import { Scene, Vector2 } from 'three';
import { Channel, RADIUS } from './channel/channel';
import { VisualObject } from './channel/visualObject';
import { MAX_X, MAX_Y } from './coordinates';
import { getAllChannelsRawData } from './pubnub';

const MARGIN = RADIUS;
function getRandomArbitrary(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
const getRandomPositionOnScreen = (
  objectSize: number,
  objectMargin: number
): Vector2 =>
  new Vector2(
    getRandomArbitrary(
      objectSize + objectMargin,
      MAX_X - objectSize - objectMargin
    ),
    getRandomArbitrary(
      objectSize + objectMargin,
      MAX_Y - objectSize - objectMargin
    )
  );

const getPositionNotConflictingWith = (
  otherObjects: VisualObject[],
  objectSize: number
): Vector2 => {
  let pos: Vector2;
  do {
    pos = getRandomPositionOnScreen(objectSize, MARGIN);
  } while (
    otherObjects.some(
      ({ position }) =>
        position && position.distanceTo(pos) < objectSize + MARGIN
    )
  );

  return pos;
};

const getChannels = async (scene: Scene) =>
  (await getAllChannelsRawData()).data.map(
    (c) => new Channel(c.name ?? '<unknown>', scene)
  );

const assignChannelsPositions = (channels: Channel[]) => {
  channels.forEach((c, _, others) => {
    c.assignPosition(getPositionNotConflictingWith(others, RADIUS * 2));
  });
  return channels;
};

export const renderAllChannels = async (scene: Scene) => {
  const channels = await getChannels(scene);
  pipe(
    channels,
    assignChannelsPositions,
    array.map((c) => c.addToScene())
  );
};
