import { array } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import { Scene } from 'three';
import { Channel, RADIUS } from './channel/channel';
import { getAllChannelsRawData } from './pubnub';
import { VisualObject } from './channel/visualObject';

const getChannels = async (scene: Scene) =>
  (await getAllChannelsRawData()).data.map(
    (c) => new Channel(c.name ?? '<unknown>', scene)
  );

const assignChannelsPositions = (channels: Channel[]) => {
  channels.forEach((c, _, others) => {
    c.assignPosition(
      VisualObject.getPositionNotConflictingWith(others, RADIUS * 2)
    );
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
