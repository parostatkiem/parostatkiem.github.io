import { apply, array, option } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';
import { Object3D, Scene } from 'three';
import { Channel, RADIUS } from './channel/channel';
import { getAllChannelsRawData, getUsers, setToken } from './pubnub';
import { VisualObject } from './channel/visualObject';
import { Publisher } from './channel/publisher';
import { Subscription } from 'pubnub';
import { getOrElse } from 'fp-ts/lib/EitherT';

export class SceneManager {
  private static _channels: Channel[] = [];
  private static _publishers: Publisher[] = [];

  private static getChannelsData = async (scene: Scene) => {
    // setToken();
    const a = (await getAllChannelsRawData()).data;

    return a.map((c) => new Channel(c.name ?? '<unknown>', scene));
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

  static registerPublisherConnection(
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

    publisher.registerConnection(channel);
  }

  static renderAllChannels = async (scene: Scene) => {
    this._channels = await this.getChannelsData(scene);

    pipe(this.channels, this.assignChannelsPositions);
    pipe(
      this.channels,
      array.map((c) => c.addToScene())
    );
  };

  static renderAllPublishers = async (scene: Scene) => {
    this._publishers = (await getUsers()).data.map(
      (u) => new Publisher(u.name ?? '', scene)
    );

    pipe(this.publishers, array.map(this.assignPublisherPosition));
    pipe(
      this.publishers,
      array.map((p) => p.addToScene())
    );
  };

  static handleMessageReceived = (message: Subscription.Message) => {
    console.log('got message from', message.publisher, message.channel);
  };
}
