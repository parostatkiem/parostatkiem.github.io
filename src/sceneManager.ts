import { array, option } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import { Object3D, Scene } from 'three';
import { Channel, RADIUS } from './channel/channel';
import { Publisher } from './channel/publisher';
import { VisualObject } from './channel/visualObject';
import { getAllChannelsRawData } from './pubnub';

export class SceneManager {
  private static _channels: Channel[] = [];
  private static _publishers: Publisher[] = [];

  private static getChannelsData = async (scene: Scene) => {
    const rawData = (await getAllChannelsRawData()).data;
    return rawData.map((c) => new Channel(c.name ?? '<unknown>', scene));
  };

  private static assignChannelsPositions = (channels: Channel[]) => {
    channels.forEach((c, _, others) => {
      c.assignPosition(
        VisualObject.getPositionNotConflictingWith(others, RADIUS * 2)
      );
    });
  };

  private static assignPublisherPosition = (p: Publisher) => {
    p.assignPosition(
      VisualObject.getPositionNotConflictingWith(
        [...this.channels, ...this.publishers],
        RADIUS * 2
      )
    );
  };

  private static addNewPublisher(name: string, parent: Object3D) {
    //todo fp-ts
    const p = new Publisher(name, parent);
    this._publishers.push(p);
    this.assignPublisherPosition(p);
    p.addToScene();
    return p;
  }

  static get channels() {
    return this._channels;
  }

  static get publishers() {
    return this._publishers;
  }

  static handleMessageReceived(
    publisherName: string,
    channel: Channel,
    publisherParent: Object3D
  ) {
    const publisher = pipe(
      this.publishers,
      array.findFirst((p) => p.name === publisherName),
      option.getOrElse(() =>
        this.addNewPublisher(publisherName, publisherParent)
      )
    );

    const connection = publisher.registerConnection(channel);
    connection?.displayMessage();
  }

  static renderAllChannels = async (scene: Scene) => {
    this._channels = await this.getChannelsData(scene);

    pipe(this.channels, this.assignChannelsPositions);
    pipe(
      this.channels,
      array.map((c) => c.addToScene())
    );
  };
}
