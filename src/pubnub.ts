import PubNub from 'pubnub';



const pubnub = new PubNub({
    // publishKey: "myPublishKey",
    subscribeKey: "demo",
    userId: "myUniqueUserId", // Assuming userId is correctly typed as string
});

export const getAllChannels = async () => pubnub.objects.getAllChannelMetadata({
    // include: any,
    // filter: string,
    // sort: any,
    // limit: number,
    // page: any
})
