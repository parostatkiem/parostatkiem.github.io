import PubNub from 'pubnub';

const pubnub = new PubNub({
  // publishKey: "myPublishKey",
  //   subscribeKey: 'demo',
  subscribeKey: 'sub-c-d9270297-5a17-4084-9e13-5bf43938f5d4',
  //   secretKey: 'sec-c-ZDEyNjc0YTctNjFkYS00MGY1LWEwMzQtNDc0Y2JjZDZiMjk0',
  userId: 'traffic-visualizer', // Assuming userId is correctly typed as string
});

export const getAllChannelsRawData = async () => {
  return pubnub.objects.getAllChannelMetadata({
    include: {
      totalCount: true,
    },
  });
};

getAllChannelsRawData();

export const getChannelSubscription = (c: string) => {
  return pubnub.channel(c).subscription({ receivePresenceEvents: true });
};
