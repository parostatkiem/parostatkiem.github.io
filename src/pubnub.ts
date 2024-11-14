import PubNub from 'pubnub';

const pubnub = new PubNub({
  // publishKey: "myPublishKey",
  //   subscribeKey: 'demo',
  subscribeKey: 'sub-c-fe4d8295-1af3-4933-bb04-d95844afb003', // event generator
  //   subscribeKey: 'sub-c-d9270297-5a17-4084-9e13-5bf43938f5d4', // Markus' generator
  //   secretKey: 'sec-c-ZDEyNjc0YTctNjFkYS00MGY1LWEwMzQtNDc0Y2JjZDZiMjk0',
  userId: 'traffic-visualizer', // Assuming userId is correctly typed as string
});

export const getAllChannelsRawData = async (): Promise<
  Array<{
    name?: string | null;
  }>
> => {
  return [
    ...(
      await pubnub.objects.getAllChannelMetadata({
        include: {
          totalCount: true,
        },
      })
    ).data,
    { name: 'users' },
    { name: 'app' },
  ];
};

export const getChannelSubscription = (c: string) => {
  return pubnub.channel(c).subscription({ receivePresenceEvents: true });
};
