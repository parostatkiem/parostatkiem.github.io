import PubNub from 'pubnub';

const pubnub = new PubNub({
  // publishKey: "myPublishKey",
  //   subscribeKey: 'demo',
  // subscribeKey: 'sub-c-fe4d8295-1af3-4933-bb04-d95844afb003', // event generator
  //   subscribeKey: 'sub-c-d9270297-5a17-4084-9e13-5bf43938f5d4', // Markus' generator

  //local generator
  subscribeKey: 'sub-c-bd96b9b2-7bec-4067-a0f8-a233ff413d84',
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
    { name: 'user' },
    { name: 'app' },
  ];
};

export const getChannelSubscription = (c: string) => {
  return pubnub.channel(c).subscription({ receivePresenceEvents: true });
};
