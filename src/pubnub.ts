import PubNub from 'pubnub';

const pubnub = new PubNub({
  // publishKey: "myPublishKey",
  subscribeKey: 'demo',
  //   subscribeKey: 'sub-c-a82f38b7-b8b1-4226-9bd4-abae3e698854',
  //   secretKey: 'sec-c-ZDEyNjc0YTctNjFkYS00MGY1LWEwMzQtNDc0Y2JjZDZiMjk0',
  userId: 'traffic-visualizer', // Assuming userId is correctly typed as string
});

export const setToken = () =>
  pubnub.setToken(
    'qEF2AkF0GmczE15DdHRsGQFoQ3Jlc6VEY2hhbqJwdmVoaWNsZS4qLXBucHJlcwFpdmVoaWNsZS4qAUNncnCgQ3NwY6BDdXNyoER1dWlkoENwYXSlRGNoYW6idF5zaW1fW0EtWmEtejAtOV17Nn0kA3dedmVoaWNsZS5bQS1aYS16MC05LV0rJANDZ3JwoENzcGOgQ3VzcqBEdXVpZKBEbWV0YaBEdXVpZHgkYzJhY2ZmZGQtZDc0MC00NWRhLWE5ZDUtOTg3Njc4MjllMGNlQ3NpZ1gg-PMSwIiea9UZ4TB_YQSw_EVzD82nC-TXIRGdzqEabXk%3D-ClS4='
  );

export const getAllChannelsRawData = async () => {
  //   setToken();
  return pubnub.objects.getAllChannelMetadata({
    // include: any,
    // filter: string,
    // sort: any,
    // limit: number,
    // page: any
    include: {
      totalCount: true,
    },
  });
};

export const getChannelSubscription = (c: string) => {
  //   setToken();
  return pubnub.channel(c).subscription({ receivePresenceEvents: true });
};

// export const getChannelSubscriptionSet = (names: string[]) =>
//   pubnub.subscriptionSet({
//     channels: names,
//   });

export const getUsers = () => {
  //   setToken();
  return pubnub.objects.getAllUUIDMetadata({
    include: {
      totalCount: true,
    },
    // filter: string,
    // sort: any,
    // limit: number,
    // page: any,
  });
};
