import { Object3D, Scene, Vector2 } from 'three';
import { getAllChannelsRawData } from './pubnub';
import { Channel, RADIUS } from './channel/channel';
import { MAX_X, MAX_Y } from './coordinates';
import { flow, pipe } from 'fp-ts/lib/function';
import { array, task } from 'fp-ts';
import { Task } from 'fp-ts/lib/Task';

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

const getPositionNotConflictingWith = (otherChannels: Channel[]): Vector2 => {
  let pos: Vector2;
  do {
    pos = getRandomPositionOnScreen(RADIUS * 2, RADIUS);
  } while (
    otherChannels.some(
      ({ position }) => position && position.distanceTo(pos) < 3 * RADIUS
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
    c.assignPosition(getPositionNotConflictingWith(others));
  });
  return channels;
};

export const renderAllChannels = async (scene: Scene) => {
  const channels = await getChannels(scene);
  pipe(
    channels,
    assignChannelsPositions,
    array.map((c) => c.render())
  );
};
