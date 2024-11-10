import PubNub from 'pubnub';

const pubnub = new PubNub({
  // publishKey: "myPublishKey",
  subscribeKey: 'demo',
  userId: 'traffic-visualizer', // Assuming userId is correctly typed as string
});

export const getAllChannelsRawData = async () =>
  pubnub.objects.getAllChannelMetadata({
    // include: any,
    // filter: string,
    // sort: any,
    // limit: number,
    // page: any
  });
