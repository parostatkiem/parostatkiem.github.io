import { array } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import { Scene } from 'three';
import { Channel, RADIUS } from './channel/channel';
import { getAllChannelsRawData } from './pubnub';
import { VisualObject } from './channel/visualObject';

export class SceneManager {
  private static _channels: Channel[];

  private static getChannelsData = async (scene: Scene) =>
    (await getAllChannelsRawData()).data.map(
      (c) => new Channel(c.name ?? '<unknown>', scene)
    );

  private static assignChannelsPositions = (channels: Channel[]) => {
    channels.forEach((c, _, others) => {
      c.assignPosition(
        VisualObject.getPositionNotConflictingWith(others, RADIUS * 2)
      );
    });
    return channels;
  };

  static get channels() {
    return this._channels;
  }

  static renderAllChannels = async (scene: Scene) => {
    this._channels = await this.getChannelsData(scene);
    pipe(
      this.channels,
      this.assignChannelsPositions,
      array.map((c) => c.addToScene())
    );
  };
}
